package com.infostudio.ba.repository;

import com.infostudio.ba.domain.EmContractTypes;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EmContractTypes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmContractTypesRepository extends JpaRepository<EmContractTypes, Long> {

}
