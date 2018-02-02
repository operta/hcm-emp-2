package com.infostudio.ba.repository;

import com.infostudio.ba.domain.EmEmpOrgWorkPlaces;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EmEmpOrgWorkPlaces entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmEmpOrgWorkPlacesRepository extends JpaRepository<EmEmpOrgWorkPlaces, Long> {
    EmEmpOrgWorkPlaces findTopByIdEmployeeIdOrderByDateFromDesc(Long id);

}
