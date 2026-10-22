package com.mohitsharma.portfolio.contact;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/**
 * A message sent through the contact form.
 */
@Entity
public class ContactMessage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	private String email;

	private String message;

	private Instant createdAt;

	private boolean emailSent;

	protected ContactMessage() {
	}

	ContactMessage(String name, String email, String message, Instant createdAt) {
		this.name = name;
		this.email = email;
		this.message = message;
		this.createdAt = createdAt;
	}

	public Long getId() {
		return this.id;
	}

	public String getName() {
		return this.name;
	}

	public String getEmail() {
		return this.email;
	}

	public String getMessage() {
		return this.message;
	}

	public Instant getCreatedAt() {
		return this.createdAt;
	}

	public boolean isEmailSent() {
		return this.emailSent;
	}

	void markEmailSent() {
		this.emailSent = true;
	}

}
