package com.infostudio.ba.repository;

import com.infostudio.ba.domain.OgOrganizations;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the OgOrganizations entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OgOrganizationsRepository extends JpaRepository<OgOrganizations, Long> {

}
