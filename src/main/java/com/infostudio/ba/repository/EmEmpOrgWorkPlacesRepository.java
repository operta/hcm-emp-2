package com.infostudio.ba.repository;

import com.infostudio.ba.domain.EmEmpOrgWorkPlaces;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the EmEmpOrgWorkPlaces entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmEmpOrgWorkPlacesRepository extends JpaRepository<EmEmpOrgWorkPlaces, Long> {
    EmEmpOrgWorkPlaces findTopByIdEmployeeIdOrderByDateFromDesc(Long id);
    List<EmEmpOrgWorkPlaces> findByIdOrgWorkPlaceIdWorkPlaceId (Long id);
    List<EmEmpOrgWorkPlaces> findByIdOrgWorkPlaceIdOrganizationId (Long id);
}
