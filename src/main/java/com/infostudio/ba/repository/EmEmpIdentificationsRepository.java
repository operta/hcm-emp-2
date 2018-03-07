package com.infostudio.ba.repository;

import com.infostudio.ba.domain.EmEmpIdentifications;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the EmEmpIdentifications entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmEmpIdentificationsRepository extends JpaRepository<EmEmpIdentifications, Long> {
    List<EmEmpIdentifications> findByIdEmployee_Id(Long id);
}
