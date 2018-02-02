package com.infostudio.ba.repository;

import com.infostudio.ba.domain.RgQualifications;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RgQualifications entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RgQualificationsRepository extends JpaRepository<RgQualifications, Long> {

}
