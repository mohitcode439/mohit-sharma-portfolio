package com.mohitsharma.portfolio;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.nullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Boots the whole application against H2 with the real Flyway migrations.
 */
@SpringBootTest
@AutoConfigureMockMvc
class PortfolioApiIntegrationTests {

	@Autowired
	private MockMvc mvc;

	@Autowired
	private JdbcTemplate jdbc;

	@BeforeEach
	void clearMessages() {
		this.jdbc.update("delete from contact_message");
	}

	@Test
	void portfolioReturnsSeededContentInDisplayOrder() throws Exception {
		this.mvc.perform(get("/api/v1/portfolio"))
			.andExpect(status().isOk())
			.andExpect(header().string("Cache-Control", containsString("max-age=300")))
			.andExpect(jsonPath("$.profile.name").value("Mohit Sharma"))
			.andExpect(jsonPath("$.profile.about.length()").value(2))
			.andExpect(jsonPath("$.links[0].label").value("GitHub"))
			.andExpect(jsonPath("$.experience[0].company").value("Infosys Limited"))
			.andExpect(jsonPath("$.experience[0].start").value("2025-10"))
			.andExpect(jsonPath("$.experience[0].end").value(nullValue()))
			.andExpect(jsonPath("$.experience[0].highlights.length()").value(5))
			.andExpect(jsonPath("$.skills.length()").value(6))
			.andExpect(jsonPath("$.skills[0].category").value("Languages"))
			.andExpect(jsonPath("$.skills[0].items[0]").value("Java"))
			.andExpect(jsonPath("$.projects[0].liveUrl").value("https://mohitcode439.netlify.app/"))
			.andExpect(jsonPath("$.projects[1].imageUrl").value(nullValue()))
			.andExpect(jsonPath("$.education[0].cgpa").value("8.22/10"))
			.andExpect(jsonPath("$.achievements.length()").value(2))
			.andExpect(jsonPath("$.profile.email").value("isharma.ms@gmail.com"));
	}

	@Test
	void validContactMessageIsStored() throws Exception {
		this.mvc.perform(post("/api/v1/contact").contentType(MediaType.APPLICATION_JSON).content("""
				{"name": "Asha", "email": "asha@example.com", "message": "Let's talk about a role."}
				"""))
			.andExpect(status().isAccepted())
			.andExpect(jsonPath("$.message").exists());

		assertThat(this.jdbc.queryForList("select name, email_sent from contact_message"))
			.singleElement()
			.satisfies((row) -> {
				assertThat(row.get("name")).isEqualTo("Asha");
				// No mail server is configured in tests, so no notification is sent
				assertThat(row.get("email_sent")).isEqualTo(false);
			});
	}

	@Test
	void invalidContactMessageReturnsFieldErrors() throws Exception {
		this.mvc.perform(post("/api/v1/contact").contentType(MediaType.APPLICATION_JSON).content("""
				{"name": "", "email": "not-an-email", "message": "Hi"}
				"""))
			.andExpect(status().isBadRequest())
			.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PROBLEM_JSON))
			.andExpect(jsonPath("$.errors.name").exists())
			.andExpect(jsonPath("$.errors.email").exists())
			.andExpect(jsonPath("$.errors.message").doesNotExist());

		assertThat(this.jdbc.queryForObject("select count(*) from contact_message", Integer.class)).isZero();
	}

	@Test
	void honeypotSubmissionLooksAcceptedButIsDropped() throws Exception {
		this.mvc.perform(post("/api/v1/contact").contentType(MediaType.APPLICATION_JSON).content("""
				{"name": "Bot", "email": "bot@example.com", "message": "Buy now", "website": "https://spam.example"}
				"""))
			.andExpect(status().isAccepted());

		assertThat(this.jdbc.queryForObject("select count(*) from contact_message", Integer.class)).isZero();
	}

	@Test
	void corsAllowsOnlyConfiguredOrigins() throws Exception {
		this.mvc
			.perform(options("/api/v1/portfolio").header("Origin", "http://localhost:5173")
				.header("Access-Control-Request-Method", "GET"))
			.andExpect(status().isOk())
			.andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:5173"));

		this.mvc
			.perform(options("/api/v1/portfolio").header("Origin", "https://evil.example")
				.header("Access-Control-Request-Method", "GET"))
			.andExpect(status().isForbidden());
	}

	@Test
	void healthEndpointReportsUp() throws Exception {
		this.mvc.perform(get("/actuator/health")).andExpect(status().isOk()).andExpect(jsonPath("$.status").value("UP"));
	}

	@Test
	void openApiDocumentDescribesTheEndpoints() throws Exception {
		this.mvc.perform(get("/v3/api-docs"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.paths['/api/v1/portfolio'].get").exists())
			.andExpect(jsonPath("$.paths['/api/v1/contact'].post").exists());
	}

}
