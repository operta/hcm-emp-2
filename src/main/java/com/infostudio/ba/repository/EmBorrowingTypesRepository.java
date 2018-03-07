package com.infostudio.ba.repository;

import com.infostudio.ba.domain.EmBorrowingTypes;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EmBorrowingTypes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmBorrowingTypesRepository extends JpaRepository<EmBorrowingTypes, Long> {

}
