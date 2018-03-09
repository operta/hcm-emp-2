package com.infostudio.ba.repository;

import com.infostudio.ba.domain.OgWorkPlaceSkills;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the OgWorkPlaceSkills entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OgWorkPlaceSkillsRepository extends JpaRepository<OgWorkPlaceSkills, Long> {
    List<OgWorkPlaceSkills> findByIdWorkPlaceId(Long id);
}
