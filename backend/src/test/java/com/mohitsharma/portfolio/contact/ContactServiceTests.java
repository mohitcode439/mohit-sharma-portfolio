package com.mohitsharma.portfolio.contact;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.mohitsharma.portfolio.config.PortfolioProperties;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.BDDMockito.willThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verifyNoInteractions;

@ExtendWith(MockitoExtension.class)
class ContactServiceTests {

	private static final Instant NOW = Instant.parse("2026-01-15T10:00:00Z");

	@Mock
	private ContactMessageRepository repository;

	@Mock
	private ObjectProvider<JavaMailSender> mailSenderProvider;

	@Mock
	private JavaMailSender mailSender;

	@Test
	void storesTrimmedMessageAndEmailsTheOwner() {
		given(this.repository.save(any())).willAnswer((invocation) -> invocation.getArgument(0));
		given(this.mailSenderProvider.getIfAvailable()).willReturn(this.mailSender);

		service("owner@example.com").submit(new ContactRequest("  Asha ", " asha@example.com ", " Hello! ", null));

		ArgumentCaptor<SimpleMailMessage> mail = ArgumentCaptor.forClass(SimpleMailMessage.class);
		then(this.mailSender).should().send(mail.capture());
		assertThat(mail.getValue().getTo()).containsExactly("owner@example.com");
		assertThat(mail.getValue().getReplyTo()).isEqualTo("asha@example.com");
		assertThat(mail.getValue().getSubject()).isEqualTo("Portfolio contact from Asha");
		assertThat(mail.getValue().getText()).contains("Hello!");

		ArgumentCaptor<ContactMessage> saved = ArgumentCaptor.forClass(ContactMessage.class);
		then(this.repository).should(times(2)).save(saved.capture());
		ContactMessage message = saved.getValue();
		assertThat(message.getName()).isEqualTo("Asha");
		assertThat(message.getEmail()).isEqualTo("asha@example.com");
		assertThat(message.getMessage()).isEqualTo("Hello!");
		assertThat(message.getCreatedAt()).isEqualTo(NOW);
		assertThat(message.isEmailSent()).isTrue();
	}

	@Test
	void keepsTheMessageWhenEmailFails() {
		given(this.repository.save(any())).willAnswer((invocation) -> invocation.getArgument(0));
		given(this.mailSenderProvider.getIfAvailable()).willReturn(this.mailSender);
		willThrow(new MailSendException("SMTP down")).given(this.mailSender).send(any(SimpleMailMessage.class));

		service("owner@example.com").submit(new ContactRequest("Asha", "asha@example.com", "Hello!", null));

		ArgumentCaptor<ContactMessage> saved = ArgumentCaptor.forClass(ContactMessage.class);
		then(this.repository).should().save(saved.capture());
		assertThat(saved.getValue().isEmailSent()).isFalse();
	}

	@Test
	void skipsEmailWhenNoMailServerIsConfigured() {
		given(this.repository.save(any())).willAnswer((invocation) -> invocation.getArgument(0));
		given(this.mailSenderProvider.getIfAvailable()).willReturn(null);

		service("owner@example.com").submit(new ContactRequest("Asha", "asha@example.com", "Hello!", null));

		then(this.repository).should().save(any());
	}

	@Test
	void dropsHoneypotSubmissionsSilently() {
		service("owner@example.com")
			.submit(new ContactRequest("Bot", "bot@example.com", "Buy now", "https://spam.example"));

		verifyNoInteractions(this.repository, this.mailSenderProvider);
	}

	private ContactService service(String notifyEmail) {
		PortfolioProperties properties = new PortfolioProperties(new PortfolioProperties.Cors(List.of()),
				new PortfolioProperties.Contact(notifyEmail, "noreply@example.com"));
		return new ContactService(this.repository, this.mailSenderProvider, properties,
				Clock.fixed(NOW, ZoneOffset.UTC));
	}

}
