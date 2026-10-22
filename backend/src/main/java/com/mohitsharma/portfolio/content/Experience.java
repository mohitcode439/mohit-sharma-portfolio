package com.mohitsharma.portfolio.content;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OrderColumn;
import org.hibernate.annotations.Immutable;

/**
 * A job, with its highlights in display order.
 */
@Entity
@Immutable
public class Experience {

	@Id
	private Long id;

	private String company;

	private String title;

	private String location;

	private LocalDate startDate;

	/** {@code null} while the role is current. */
	private LocalDate endDate;

	private int sortOrder;

	@ElementCollection
	@CollectionTable(name = "experience_highlight", joinColumns = @JoinColumn(name = "experience_id"))
	@OrderColumn(name = "sort_order")
	@Column(name = "content")
	private List<String> highlights = new ArrayList<>();

	protected Experience() {
	}

	public String getCompany() {
		return this.company;
	}

	public String getTitle() {
		return this.title;
	}

	public String getLocation() {
		return this.location;
	}

	public LocalDate getStartDate() {
		return this.startDate;
	}

	public LocalDate getEndDate() {
		return this.endDate;
	}

	public List<String> getHighlights() {
		return this.highlights;
	}

}
