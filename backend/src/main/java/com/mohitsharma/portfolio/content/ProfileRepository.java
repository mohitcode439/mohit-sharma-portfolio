package com.mohitsharma.portfolio.content;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

interface ProfileRepository extends JpaRepository<Profile, Long> {

	Optional<Profile> findFirstByOrderByIdAsc();

}
