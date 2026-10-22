package com.mohitsharma.portfolio.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * Body of {@code POST /api/v1/contact}.
 *
 * @param website honeypot: hidden in the form, so only bots fill it in
 */
public record ContactRequest(
		@NotBlank @Size(max = 100) @Pattern(regexp = "[^\\r\\n]*", message = "must be a single line") String name,
		@NotBlank @Email @Size(max = 254) String email, @NotBlank @Size(max = 5000) String message,
		String website) {

	boolean isLikelySpam() {
		return this.website != null && !this.website.isBlank();
	}

}
