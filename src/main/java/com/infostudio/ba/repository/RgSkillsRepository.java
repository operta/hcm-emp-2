package com.infostudio.ba.repository;

import com.infostudio.ba.domain.RgSkills;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RgSkills entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RgSkillsRepository extends JpaRepository<RgSkills, Long> {

}
