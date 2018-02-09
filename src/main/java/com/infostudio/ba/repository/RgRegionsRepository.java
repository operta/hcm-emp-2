package com.infostudio.ba.repository;

import com.infostudio.ba.domain.RgRegions;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the RgRegions entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RgRegionsRepository extends JpaRepository<RgRegions, Long> {
    List<RgRegions> findByIdTypeId(Long id);

}
