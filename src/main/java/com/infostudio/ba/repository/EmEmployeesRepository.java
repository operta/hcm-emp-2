package com.infostudio.ba.repository;

import com.infostudio.ba.domain.EmEmployees;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;


/**
 * Spring Data JPA repository for the EmEmployees entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmEmployeesRepository extends JpaRepository<EmEmployees, Long> {
    EmEmployees findByIdUserId(Long id);
    List<EmEmployees> findByHireDateBetween(LocalDate fromDate, LocalDate toDate);
    List<EmEmployees> findByHireDateGreaterThanEqual(LocalDate fromDate);
    List<EmEmployees> findByHireDateLessThanEqual(LocalDate toDate);
    List<EmEmployees> findByIdQualificationId(Long id);
    List<EmEmployees> findByNameContainingIgnoreCase(String value);
    List<EmEmployees> findBySurnameContainingIgnoreCase(String value);
}
