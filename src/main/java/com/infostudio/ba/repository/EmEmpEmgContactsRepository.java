package com.infostudio.ba.repository;

import com.infostudio.ba.domain.EmEmpEmgContacts;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the EmEmpEmgContacts entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmEmpEmgContactsRepository extends JpaRepository<EmEmpEmgContacts, Long> {
    List<EmEmpEmgContacts> findByIdEmployeeId(Long id);
}
