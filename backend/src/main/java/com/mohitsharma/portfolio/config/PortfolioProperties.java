package com.mohitsharma.portfolio.config;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Application settings under the {@code portfolio} prefix.
 *
 * @param cors browser origins allowed to call the API
 * @param contact where contact-form notifications go
 */
@ConfigurationProperties("portfolio")
public record PortfolioProperties(Cors cors, Contact contact) {

	/**
	 * @param allowedOrigins exact origins, e.g. {@code https://example.netlify.app}
	 */
	public record Cors(List<String> allowedOrigins) {
	}

	/**
	 * @param notifyEmail address that receives a notification per message; blank disables email
	 * @param fromEmail sender address; blank uses the mail server's default
	 */
	public record Contact(String notifyEmail, String fromEmail) {
	}

}
