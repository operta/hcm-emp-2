package com.infostudio.ba.repository;

import com.infostudio.ba.domain.EmEmpRewards;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the EmEmpRewards entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmEmpRewardsRepository extends JpaRepository<EmEmpRewards, Long> {
    List<EmEmpRewards> findByIdEmployee_Id(Long id);
}
