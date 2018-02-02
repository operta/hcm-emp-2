package com.infostudio.ba.repository;

import com.infostudio.ba.domain.OgWorkPlaces;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the OgWorkPlaces entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OgWorkPlacesRepository extends JpaRepository<OgWorkPlaces, Long> {

}
