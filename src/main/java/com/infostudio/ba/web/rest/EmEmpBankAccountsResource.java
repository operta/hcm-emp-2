package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.EmEmpBankAccounts;

import com.infostudio.ba.repository.EmEmpBankAccountsRepository;
import com.infostudio.ba.web.rest.errors.BadRequestAlertException;
import com.infostudio.ba.web.rest.util.HeaderUtil;
import com.infostudio.ba.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing EmEmpBankAccounts.
 */
@RestController
@RequestMapping("/api")
public class EmEmpBankAccountsResource {

    private final Logger log = LoggerFactory.getLogger(EmEmpBankAccountsResource.class);

    private static final String ENTITY_NAME = "emEmpBankAccounts";

    private final EmEmpBankAccountsRepository emEmpBankAccountsRepository;

    public EmEmpBankAccountsResource(EmEmpBankAccountsRepository emEmpBankAccountsRepository) {
        this.emEmpBankAccountsRepository = emEmpBankAccountsRepository;
    }

    /**
     * POST  /em-emp-bank-accounts : Create a new emEmpBankAccounts.
     *
     * @param emEmpBankAccounts the emEmpBankAccounts to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emEmpBankAccounts, or with status 400 (Bad Request) if the emEmpBankAccounts has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/em-emp-bank-accounts")
    @Timed
    public ResponseEntity<EmEmpBankAccounts> createEmEmpBankAccounts(@Valid @RequestBody EmEmpBankAccounts emEmpBankAccounts) throws URISyntaxException {
        log.debug("REST request to save EmEmpBankAccounts : {}", emEmpBankAccounts);
        if (emEmpBankAccounts.getId() != null) {
            throw new BadRequestAlertException("A new emEmpBankAccounts cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmEmpBankAccounts result = emEmpBankAccountsRepository.save(emEmpBankAccounts);
        return ResponseEntity.created(new URI("/api/em-emp-bank-accounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /em-emp-bank-accounts : Updates an existing emEmpBankAccounts.
     *
     * @param emEmpBankAccounts the emEmpBankAccounts to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emEmpBankAccounts,
     * or with status 400 (Bad Request) if the emEmpBankAccounts is not valid,
     * or with status 500 (Internal Server Error) if the emEmpBankAccounts couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/em-emp-bank-accounts")
    @Timed
    public ResponseEntity<EmEmpBankAccounts> updateEmEmpBankAccounts(@Valid @RequestBody EmEmpBankAccounts emEmpBankAccounts) throws URISyntaxException {
        log.debug("REST request to update EmEmpBankAccounts : {}", emEmpBankAccounts);
        if (emEmpBankAccounts.getId() == null) {
            return createEmEmpBankAccounts(emEmpBankAccounts);
        }
        EmEmpBankAccounts result = emEmpBankAccountsRepository.save(emEmpBankAccounts);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emEmpBankAccounts.getId().toString()))
            .body(result);
    }

    /**
     * GET  /em-emp-bank-accounts : get all the emEmpBankAccounts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of emEmpBankAccounts in body
     */
    @GetMapping("/em-emp-bank-accounts")
    @Timed
    public ResponseEntity<List<EmEmpBankAccounts>> getAllEmEmpBankAccounts(Pageable pageable) {
        log.debug("REST request to get a page of EmEmpBankAccounts");
        Page<EmEmpBankAccounts> page = emEmpBankAccountsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/em-emp-bank-accounts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /em-emp-bank-accounts/:id : get the "id" emEmpBankAccounts.
     *
     * @param id the id of the emEmpBankAccounts to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emEmpBankAccounts, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-bank-accounts/{id}")
    @Timed
    public ResponseEntity<EmEmpBankAccounts> getEmEmpBankAccounts(@PathVariable Long id) {
        log.debug("REST request to get EmEmpBankAccounts : {}", id);
        EmEmpBankAccounts emEmpBankAccounts = emEmpBankAccountsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmpBankAccounts));
    }

    /**
     * DELETE  /em-emp-bank-accounts/:id : delete the "id" emEmpBankAccounts.
     *
     * @param id the id of the emEmpBankAccounts to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/em-emp-bank-accounts/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmEmpBankAccounts(@PathVariable Long id) {
        log.debug("REST request to delete EmEmpBankAccounts : {}", id);
        emEmpBankAccountsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
