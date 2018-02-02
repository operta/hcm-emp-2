package com.infostudio.ba.repository;

import com.infostudio.ba.domain.AtAccomplishmentTypes;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AtAccomplishmentTypes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AtAccomplishmentTypesRepository extends JpaRepository<AtAccomplishmentTypes, Long> {

}
