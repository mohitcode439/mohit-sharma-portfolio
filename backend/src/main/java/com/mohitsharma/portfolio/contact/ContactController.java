package com.mohitsharma.portfolio.contact;

import java.util.Map;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/contact")
@Tag(name = "Contact", description = "Contact form")
class ContactController {

	private final ContactService contactService;

	ContactController(ContactService contactService) {
		this.contactService = contactService;
	}

	@PostMapping
	@ResponseStatus(HttpStatus.ACCEPTED)
	@Operation(summary = "Send a message", description = "Validates and stores the message, then notifies the owner.")
	Map<String, String> submit(@Valid @RequestBody ContactRequest request) {
		this.contactService.submit(request);
		return Map.of("message", "Thanks for reaching out! I'll get back to you soon.");
	}

}
