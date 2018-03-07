package com.infostudio.ba.repository;

import com.infostudio.ba.domain.EmRewardTypes;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EmRewardTypes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmRewardTypesRepository extends JpaRepository<EmRewardTypes, Long> {

}
