package com.mohitsharma.portfolio.config;

import java.time.Clock;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Single source of "now", so tests can use a fixed clock.
 */
@Configuration(proxyBeanMethods = false)
class ClockConfig {

	@Bean
	Clock clock() {
		return Clock.systemUTC();
	}

}
