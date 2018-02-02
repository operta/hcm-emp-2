package com.infostudio.ba.repository;

import com.infostudio.ba.domain.EmEmpDocuments;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EmEmpDocuments entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmEmpDocumentsRepository extends JpaRepository<EmEmpDocuments, Long> {

}
