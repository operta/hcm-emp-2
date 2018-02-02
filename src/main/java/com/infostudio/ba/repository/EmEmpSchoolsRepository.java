package com.infostudio.ba.repository;

import com.infostudio.ba.domain.EmEmpSchools;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EmEmpSchools entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmEmpSchoolsRepository extends JpaRepository<EmEmpSchools, Long> {

}
