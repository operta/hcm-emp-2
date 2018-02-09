package com.infostudio.ba.repository;

import com.infostudio.ba.domain.EmEmpBankAccounts;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the EmEmpBankAccounts entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmEmpBankAccountsRepository extends JpaRepository<EmEmpBankAccounts, Long> {
    EmEmpBankAccounts findByIdEmployeeId (Long id);
}
