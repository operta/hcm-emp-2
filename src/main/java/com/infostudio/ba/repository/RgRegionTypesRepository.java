package com.infostudio.ba.repository;

import com.infostudio.ba.domain.RgRegionTypes;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RgRegionTypes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RgRegionTypesRepository extends JpaRepository<RgRegionTypes, Long> {

}
