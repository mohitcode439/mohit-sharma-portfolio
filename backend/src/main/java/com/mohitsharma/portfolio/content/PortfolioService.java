package com.mohitsharma.portfolio.content;

import java.util.List;
import java.util.function.Function;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Assembles the portfolio content from the database.
 */
@Service
public class PortfolioService {

	private static final Sort DISPLAY_ORDER = Sort.by("sortOrder");

	private final ProfileRepository profiles;

	private final SocialLinkRepository links;

	private final ExperienceRepository experience;

	private final SkillCategoryRepository skills;

	private final ProjectRepository projects;

	private final EducationRepository education;

	private final AchievementRepository achievements;

	PortfolioService(ProfileRepository profiles, SocialLinkRepository links, ExperienceRepository experience,
			SkillCategoryRepository skills, ProjectRepository projects, EducationRepository education,
			AchievementRepository achievements) {
		this.profiles = profiles;
		this.links = links;
		this.experience = experience;
		this.skills = skills;
		this.projects = projects;
		this.education = education;
		this.achievements = achievements;
	}

	@Transactional(readOnly = true)
	public PortfolioResponse getPortfolio() {
		Profile profile = this.profiles.findFirstByOrderByIdAsc()
			.orElseThrow(() -> new IllegalStateException("No profile row: check the database migrations"));
		return new PortfolioResponse(PortfolioResponse.ProfileDto.from(profile),
				inOrder(this.links, PortfolioResponse.LinkDto::from),
				inOrder(this.experience, PortfolioResponse.ExperienceDto::from),
				inOrder(this.skills, PortfolioResponse.SkillGroupDto::from),
				inOrder(this.projects, PortfolioResponse.ProjectDto::from),
				inOrder(this.education, PortfolioResponse.EducationDto::from),
				inOrder(this.achievements, Achievement::getContent));
	}

	private static <E, D> List<D> inOrder(JpaRepository<E, Long> repository, Function<E, D> mapper) {
		return repository.findAll(DISPLAY_ORDER).stream().map(mapper).toList();
	}

}
