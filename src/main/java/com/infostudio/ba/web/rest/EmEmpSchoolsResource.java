package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.EmEmpSchools;

import com.infostudio.ba.repository.EmEmpSchoolsRepository;
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

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing EmEmpSchools.
 */
@RestController
@RequestMapping("/api")
public class EmEmpSchoolsResource {

    private final Logger log = LoggerFactory.getLogger(EmEmpSchoolsResource.class);

    private static final String ENTITY_NAME = "emEmpSchools";

    private final EmEmpSchoolsRepository emEmpSchoolsRepository;

    public EmEmpSchoolsResource(EmEmpSchoolsRepository emEmpSchoolsRepository) {
        this.emEmpSchoolsRepository = emEmpSchoolsRepository;
    }

    /**
     * POST  /em-emp-schools : Create a new emEmpSchools.
     *
     * @param emEmpSchools the emEmpSchools to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emEmpSchools, or with status 400 (Bad Request) if the emEmpSchools has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/em-emp-schools")
    @Timed
    public ResponseEntity<EmEmpSchools> createEmEmpSchools(@RequestBody EmEmpSchools emEmpSchools) throws URISyntaxException {
        log.debug("REST request to save EmEmpSchools : {}", emEmpSchools);
        if (emEmpSchools.getId() != null) {
            throw new BadRequestAlertException("A new emEmpSchools cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmEmpSchools result = emEmpSchoolsRepository.save(emEmpSchools);
        return ResponseEntity.created(new URI("/api/em-emp-schools/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /em-emp-schools : Updates an existing emEmpSchools.
     *
     * @param emEmpSchools the emEmpSchools to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emEmpSchools,
     * or with status 400 (Bad Request) if the emEmpSchools is not valid,
     * or with status 500 (Internal Server Error) if the emEmpSchools couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/em-emp-schools")
    @Timed
    public ResponseEntity<EmEmpSchools> updateEmEmpSchools(@RequestBody EmEmpSchools emEmpSchools) throws URISyntaxException {
        log.debug("REST request to update EmEmpSchools : {}", emEmpSchools);
        if (emEmpSchools.getId() == null) {
            return createEmEmpSchools(emEmpSchools);
        }
        EmEmpSchools result = emEmpSchoolsRepository.save(emEmpSchools);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emEmpSchools.getId().toString()))
            .body(result);
    }

    /**
     * GET  /em-emp-schools : get all the emEmpSchools.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of emEmpSchools in body
     */
    @GetMapping("/em-emp-schools")
    @Timed
    public ResponseEntity<List<EmEmpSchools>> getAllEmEmpSchools(Pageable pageable) {
        log.debug("REST request to get a page of EmEmpSchools");
        Page<EmEmpSchools> page = emEmpSchoolsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/em-emp-schools");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /em-emp-schools/:id : get the "id" emEmpSchools.
     *
     * @param id the id of the emEmpSchools to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emEmpSchools, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-schools/{id}")
    @Timed
    public ResponseEntity<EmEmpSchools> getEmEmpSchools(@PathVariable Long id) {
        log.debug("REST request to get EmEmpSchools : {}", id);
        EmEmpSchools emEmpSchools = emEmpSchoolsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmpSchools));
    }

    /**
     * DELETE  /em-emp-schools/:id : delete the "id" emEmpSchools.
     *
     * @param id the id of the emEmpSchools to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/em-emp-schools/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmEmpSchools(@PathVariable Long id) {
        log.debug("REST request to delete EmEmpSchools : {}", id);
        emEmpSchoolsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
