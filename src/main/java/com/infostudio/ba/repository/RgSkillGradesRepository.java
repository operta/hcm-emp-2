package com.infostudio.ba.repository;

import com.infostudio.ba.domain.RgSkillGrades;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RgSkillGrades entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RgSkillGradesRepository extends JpaRepository<RgSkillGrades, Long> {

}
