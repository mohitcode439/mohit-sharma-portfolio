package com.mohitsharma.portfolio.content;

import java.time.Duration;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/portfolio")
@Tag(name = "Portfolio", description = "Portfolio content")
class PortfolioController {

	private final PortfolioService portfolioService;

	PortfolioController(PortfolioService portfolioService) {
		this.portfolioService = portfolioService;
	}

	@GetMapping
	@Operation(summary = "Get all portfolio content",
			description = "Profile, links, experience, skills, projects, education and achievements, in display order.")
	ResponseEntity<PortfolioResponse> getPortfolio() {
		// Content only changes on deploy, so browsers and CDNs may reuse it for a few minutes
		return ResponseEntity.ok()
			.cacheControl(CacheControl.maxAge(Duration.ofMinutes(5)).cachePublic())
			.body(this.portfolioService.getPortfolio());
	}

}
