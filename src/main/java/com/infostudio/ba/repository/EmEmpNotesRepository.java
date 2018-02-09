package com.infostudio.ba.repository;

import com.infostudio.ba.domain.EmEmpNotes;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the EmEmpNotes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmEmpNotesRepository extends JpaRepository<EmEmpNotes, Long> {
    List<EmEmpNotes> findByIdEmployeeId (Long id);
}
