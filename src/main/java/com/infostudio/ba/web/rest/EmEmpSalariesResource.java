package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.EmEmpSalaries;

import com.infostudio.ba.repository.EmEmpSalariesRepository;
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
 * REST controller for managing EmEmpSalaries.
 */
@RestController
@RequestMapping("/api")
public class EmEmpSalariesResource {

    private final Logger log = LoggerFactory.getLogger(EmEmpSalariesResource.class);

    private static final String ENTITY_NAME = "emEmpSalaries";

    private final EmEmpSalariesRepository emEmpSalariesRepository;

    public EmEmpSalariesResource(EmEmpSalariesRepository emEmpSalariesRepository) {
        this.emEmpSalariesRepository = emEmpSalariesRepository;
    }

    /**
     * POST  /em-emp-salaries : Create a new emEmpSalaries.
     *
     * @param emEmpSalaries the emEmpSalaries to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emEmpSalaries, or with status 400 (Bad Request) if the emEmpSalaries has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/em-emp-salaries")
    @Timed
    public ResponseEntity<EmEmpSalaries> createEmEmpSalaries(@Valid @RequestBody EmEmpSalaries emEmpSalaries) throws URISyntaxException {
        log.debug("REST request to save EmEmpSalaries : {}", emEmpSalaries);
        if (emEmpSalaries.getId() != null) {
            throw new BadRequestAlertException("A new emEmpSalaries cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmEmpSalaries result = emEmpSalariesRepository.save(emEmpSalaries);
        return ResponseEntity.created(new URI("/api/em-emp-salaries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /em-emp-salaries : Updates an existing emEmpSalaries.
     *
     * @param emEmpSalaries the emEmpSalaries to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emEmpSalaries,
     * or with status 400 (Bad Request) if the emEmpSalaries is not valid,
     * or with status 500 (Internal Server Error) if the emEmpSalaries couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/em-emp-salaries")
    @Timed
    public ResponseEntity<EmEmpSalaries> updateEmEmpSalaries(@Valid @RequestBody EmEmpSalaries emEmpSalaries) throws URISyntaxException {
        log.debug("REST request to update EmEmpSalaries : {}", emEmpSalaries);
        if (emEmpSalaries.getId() == null) {
            return createEmEmpSalaries(emEmpSalaries);
        }
        EmEmpSalaries result = emEmpSalariesRepository.save(emEmpSalaries);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emEmpSalaries.getId().toString()))
            .body(result);
    }

    /**
     * GET  /em-emp-salaries : get all the emEmpSalaries.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of emEmpSalaries in body
     */
    @GetMapping("/em-emp-salaries")
    @Timed
    public ResponseEntity<List<EmEmpSalaries>> getAllEmEmpSalaries(Pageable pageable) {
        log.debug("REST request to get a page of EmEmpSalaries");
        Page<EmEmpSalaries> page = emEmpSalariesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/em-emp-salaries");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /em-emp-salaries/:id : get the "id" emEmpSalaries.
     *
     * @param id the id of the emEmpSalaries to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emEmpSalaries, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-salaries/{id}")
    @Timed
    public ResponseEntity<EmEmpSalaries> getEmEmpSalaries(@PathVariable Long id) {
        log.debug("REST request to get EmEmpSalaries : {}", id);
        EmEmpSalaries emEmpSalaries = emEmpSalariesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmpSalaries));
    }

    /**
     * DELETE  /em-emp-salaries/:id : delete the "id" emEmpSalaries.
     *
     * @param id the id of the emEmpSalaries to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/em-emp-salaries/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmEmpSalaries(@PathVariable Long id) {
        log.debug("REST request to delete EmEmpSalaries : {}", id);
        emEmpSalariesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
