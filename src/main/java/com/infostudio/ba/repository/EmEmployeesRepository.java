package com.infostudio.ba.repository;

import com.infostudio.ba.domain.EmEmployees;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EmEmployees entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmEmployeesRepository extends JpaRepository<EmEmployees, Long> {
    EmEmployees findByIdUserId(Long id);
}
