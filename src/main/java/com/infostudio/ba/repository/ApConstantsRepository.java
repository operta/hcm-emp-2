package com.infostudio.ba.repository;

import com.infostudio.ba.domain.ApConstants;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ApConstants entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApConstantsRepository extends JpaRepository<ApConstants, Long> {
    ApConstants findByKeyIgnoreCase(String key);
}
