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
 * A showcased project. Image and links are optional.
 */
@Entity
@Immutable
public class Project {

	@Id
	private Long id;

	private String name;

	private String description;

	private String imageUrl;

	private String liveUrl;

	private String githubUrl;

	private int sortOrder;

	@ElementCollection
	@CollectionTable(name = "project_tech", joinColumns = @JoinColumn(name = "project_id"))
	@OrderColumn(name = "sort_order")
	@Column(name = "name")
	private List<String> techStack = new ArrayList<>();

	protected Project() {
	}

	public String getName() {
		return this.name;
	}

	public String getDescription() {
		return this.description;
	}

	public String getImageUrl() {
		return this.imageUrl;
	}

	public String getLiveUrl() {
		return this.liveUrl;
	}

	public String getGithubUrl() {
		return this.githubUrl;
	}

	public List<String> getTechStack() {
		return this.techStack;
	}

}
