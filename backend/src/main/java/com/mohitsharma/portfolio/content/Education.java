package com.mohitsharma.portfolio.content;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.hibernate.annotations.Immutable;

/**
 * A degree. Minor and CGPA are optional.
 */
@Entity
@Immutable
public class Education {

	@Id
	private Long id;

	private String institution;

	private String degree;

	private String minor;

	private int startYear;

	private int endYear;

	private String cgpa;

	private int sortOrder;

	protected Education() {
	}

	public String getInstitution() {
		return this.institution;
	}

	public String getDegree() {
		return this.degree;
	}

	public String getMinor() {
		return this.minor;
	}

	public int getStartYear() {
		return this.startYear;
	}

	public int getEndYear() {
		return this.endYear;
	}

	public String getCgpa() {
		return this.cgpa;
	}

}
