package com.infostudio.ba.repository;

import com.infostudio.ba.domain.EmEmpBorrowings;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the EmEmpBorrowings entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmEmpBorrowingsRepository extends JpaRepository<EmEmpBorrowings, Long> {
    List<EmEmpBorrowings> findByIdEmployee_IdOrderByDateFromDesc(Long id);
}
