package com.mohitsharma.portfolio.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Lets the frontend (a different origin) call the API from the browser.
 */
@Configuration
class CorsConfig implements WebMvcConfigurer {

	private final PortfolioProperties properties;

	CorsConfig(PortfolioProperties properties) {
		this.properties = properties;
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/api/**")
			.allowedOrigins(properties.cors().allowedOrigins().toArray(String[]::new))
			.allowedMethods("GET", "POST")
			.maxAge(3600);
	}

}
