package com.infostudio.ba.repository;

import com.infostudio.ba.domain.EmEmpFamilies;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the EmEmpFamilies entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmEmpFamiliesRepository extends JpaRepository<EmEmpFamilies, Long> {
    List<EmEmpFamilies> findByIdEmployee_Id(Long id);
}
