package com.infostudio.ba.repository;

import com.infostudio.ba.domain.LeLegalEntities;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the LeLegalEntities entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LeLegalEntitiesRepository extends JpaRepository<LeLegalEntities, Long> {

}
