package com.infostudio.ba.repository;

import com.infostudio.ba.domain.EmEmpAccomplishments;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EmEmpAccomplishments entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmEmpAccomplishmentsRepository extends JpaRepository<EmEmpAccomplishments, Long> {

}
