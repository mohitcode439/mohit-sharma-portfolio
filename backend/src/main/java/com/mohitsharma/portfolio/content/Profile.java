package com.mohitsharma.portfolio.content;

import java.util.Arrays;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.hibernate.annotations.Immutable;

/**
 * The single row describing the portfolio owner.
 */
@Entity
@Immutable
public class Profile {

	@Id
	private Long id;

	private String fullName;

	private String headline;

	private String tagline;

	private String currentPosition;

	private String location;

	private String email;

	private String avatarUrl;

	/** Paragraphs separated by a blank line. */
	private String about;

	protected Profile() {
	}

	public String getFullName() {
		return this.fullName;
	}

	public String getHeadline() {
		return this.headline;
	}

	public String getTagline() {
		return this.tagline;
	}

	public String getCurrentPosition() {
		return this.currentPosition;
	}

	public String getLocation() {
		return this.location;
	}

	public String getEmail() {
		return this.email;
	}

	public String getAvatarUrl() {
		return this.avatarUrl;
	}

	public List<String> getAboutParagraphs() {
		return Arrays.stream(this.about.split("\\R\\s*\\R")).map(String::strip).filter(p -> !p.isEmpty()).toList();
	}

}
