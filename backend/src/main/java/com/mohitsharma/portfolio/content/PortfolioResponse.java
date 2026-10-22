package com.mohitsharma.portfolio.content;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

/**
 * Everything the frontend needs to render the portfolio, in display order.
 */
public record PortfolioResponse(ProfileDto profile, List<LinkDto> links, List<ExperienceDto> experience,
		List<SkillGroupDto> skills, List<ProjectDto> projects, List<EducationDto> education,
		List<String> achievements) {

	public record ProfileDto(String name, String headline, String tagline, String currentRole, String location,
			String email, String avatarUrl, List<String> about) {

		static ProfileDto from(Profile profile) {
			return new ProfileDto(profile.getFullName(), profile.getHeadline(), profile.getTagline(),
					profile.getCurrentPosition(), profile.getLocation(), profile.getEmail(), profile.getAvatarUrl(),
					profile.getAboutParagraphs());
		}

	}

	public record LinkDto(String label, String url) {

		static LinkDto from(SocialLink link) {
			return new LinkDto(link.getLabel(), link.getUrl());
		}

	}

	/**
	 * @param start first month, e.g. {@code 2025-10}
	 * @param end last month, or {@code null} while the role is current
	 */
	public record ExperienceDto(String company, String title, String location, String start, String end,
			List<String> highlights) {

		static ExperienceDto from(Experience experience) {
			return new ExperienceDto(experience.getCompany(), experience.getTitle(), experience.getLocation(),
					toMonth(experience.getStartDate()), toMonth(experience.getEndDate()),
					List.copyOf(experience.getHighlights()));
		}

		private static String toMonth(LocalDate date) {
			return (date != null) ? YearMonth.from(date).toString() : null;
		}

	}

	public record SkillGroupDto(String category, List<String> items) {

		static SkillGroupDto from(SkillCategory category) {
			return new SkillGroupDto(category.getName(), List.copyOf(category.getSkills()));
		}

	}

	public record ProjectDto(String name, String description, List<String> stack, String imageUrl, String liveUrl,
			String githubUrl) {

		static ProjectDto from(Project project) {
			return new ProjectDto(project.getName(), project.getDescription(), List.copyOf(project.getTechStack()),
					project.getImageUrl(), project.getLiveUrl(), project.getGithubUrl());
		}

	}

	public record EducationDto(String institution, String degree, String minor, int startYear, int endYear,
			String cgpa) {

		static EducationDto from(Education education) {
			return new EducationDto(education.getInstitution(), education.getDegree(), education.getMinor(),
					education.getStartYear(), education.getEndYear(), education.getCgpa());
		}

	}

}
