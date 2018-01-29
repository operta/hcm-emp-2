package com.infostudio.ba.repository;

import com.infostudio.ba.domain.OgOrgTypes;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the OgOrgTypes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OgOrgTypesRepository extends JpaRepository<OgOrgTypes, Long> {

}
