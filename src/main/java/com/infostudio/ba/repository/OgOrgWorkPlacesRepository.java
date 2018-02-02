package com.infostudio.ba.repository;

import com.infostudio.ba.domain.OgOrgWorkPlaces;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the OgOrgWorkPlaces entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OgOrgWorkPlacesRepository extends JpaRepository<OgOrgWorkPlaces, Long> {

}
