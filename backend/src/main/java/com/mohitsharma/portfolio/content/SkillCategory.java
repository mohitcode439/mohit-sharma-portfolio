package com.mohitsharma.portfolio.content;

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
 * A group of skills, e.g. "Backend" with Spring Boot, REST APIs, ...
 */
@Entity
@Immutable
public class SkillCategory {

	@Id
	private Long id;

	private String name;

	private int sortOrder;

	@ElementCollection
	@CollectionTable(name = "skill", joinColumns = @JoinColumn(name = "category_id"))
	@OrderColumn(name = "sort_order")
	@Column(name = "name")
	private List<String> skills = new ArrayList<>();

	protected SkillCategory() {
	}

	public String getName() {
		return this.name;
	}

	public List<String> getSkills() {
		return this.skills;
	}

}
