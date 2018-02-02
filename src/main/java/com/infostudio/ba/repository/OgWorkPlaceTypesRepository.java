package com.infostudio.ba.repository;

import com.infostudio.ba.domain.OgWorkPlaceTypes;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the OgWorkPlaceTypes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OgWorkPlaceTypesRepository extends JpaRepository<OgWorkPlaceTypes, Long> {

}
