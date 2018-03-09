package com.infostudio.ba.repository;

import com.infostudio.ba.domain.RgContactTypes;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RgContactTypes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RgContactTypesRepository extends JpaRepository<RgContactTypes, Long> {

}
