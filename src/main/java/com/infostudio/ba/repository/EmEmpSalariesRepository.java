package com.infostudio.ba.repository;

import com.infostudio.ba.domain.EmEmpSalaries;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the EmEmpSalaries entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmEmpSalariesRepository extends JpaRepository<EmEmpSalaries, Long> {
    List<EmEmpSalaries> findAllByIdEmployee_IdOrderByDateFromDesc(Long id);

}
