package com.mohitsharma.portfolio.content;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.hibernate.annotations.Immutable;

/**
 * An achievement or certification, shown as one line.
 */
@Entity
@Immutable
public class Achievement {

	@Id
	private Long id;

	private String content;

	private int sortOrder;

	protected Achievement() {
	}

	public String getContent() {
		return this.content;
	}

}
