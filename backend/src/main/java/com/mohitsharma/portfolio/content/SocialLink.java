package com.mohitsharma.portfolio.content;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.hibernate.annotations.Immutable;

/**
 * A public profile link such as GitHub or LinkedIn.
 */
@Entity
@Immutable
public class SocialLink {

	@Id
	private Long id;

	private String label;

	private String url;

	private int sortOrder;

	protected SocialLink() {
	}

	public String getLabel() {
		return this.label;
	}

	public String getUrl() {
		return this.url;
	}

}
