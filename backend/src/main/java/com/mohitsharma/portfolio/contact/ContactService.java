package com.mohitsharma.portfolio.contact;

import java.time.Clock;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mohitsharma.portfolio.config.PortfolioProperties;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

/**
 * Stores contact messages and, when mail is configured, emails a notification.
 */
@Service
public class ContactService {

	private static final Logger logger = LoggerFactory.getLogger(ContactService.class);

	private final ContactMessageRepository repository;

	private final ObjectProvider<JavaMailSender> mailSender;

	private final PortfolioProperties.Contact settings;

	private final Clock clock;

	ContactService(ContactMessageRepository repository, ObjectProvider<JavaMailSender> mailSender,
			PortfolioProperties properties, Clock clock) {
		this.repository = repository;
		this.mailSender = mailSender;
		this.settings = properties.contact();
		this.clock = clock;
	}

	public void submit(ContactRequest request) {
		if (request.isLikelySpam()) {
			// Answer like a normal submission so bots get no signal
			logger.info("Dropped a contact message that filled the honeypot field");
			return;
		}
		// Save first: the message must survive even if the email notification fails
		ContactMessage message = this.repository.save(new ContactMessage(request.name().strip(),
				request.email().strip(), request.message().strip(), this.clock.instant()));
		if (sendNotification(message)) {
			message.markEmailSent();
			this.repository.save(message);
		}
	}

	private boolean sendNotification(ContactMessage message) {
		JavaMailSender sender = this.mailSender.getIfAvailable();
		if (sender == null || !StringUtils.hasText(this.settings.notifyEmail())) {
			return false;
		}
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo(this.settings.notifyEmail());
		if (StringUtils.hasText(this.settings.fromEmail())) {
			mail.setFrom(this.settings.fromEmail());
		}
		mail.setReplyTo(message.getEmail());
		mail.setSubject("Portfolio contact from " + message.getName());
		mail.setText("Name: %s%nEmail: %s%n%n%s".formatted(message.getName(), message.getEmail(),
				message.getMessage()));
		try {
			sender.send(mail);
			return true;
		}
		catch (MailException ex) {
			logger.warn("Could not email contact message {}; it is still saved", message.getId(), ex);
			return false;
		}
	}

}
