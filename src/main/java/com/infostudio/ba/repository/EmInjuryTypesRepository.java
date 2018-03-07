package com.infostudio.ba.repository;

import com.infostudio.ba.domain.EmInjuryTypes;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EmInjuryTypes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmInjuryTypesRepository extends JpaRepository<EmInjuryTypes, Long> {

}
