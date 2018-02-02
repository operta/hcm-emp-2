package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.EmEmployees;

import com.infostudio.ba.repository.EmEmployeesRepository;
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
 * REST controller for managing EmEmployees.
 */
@RestController
@RequestMapping("/api")
public class EmEmployeesResource {

    private final Logger log = LoggerFactory.getLogger(EmEmployeesResource.class);

    private static final String ENTITY_NAME = "emEmployees";

    private final EmEmployeesRepository emEmployeesRepository;

    public EmEmployeesResource(EmEmployeesRepository emEmployeesRepository) {
        this.emEmployeesRepository = emEmployeesRepository;
    }

    /**
     * POST  /em-employees : Create a new emEmployees.
     *
     * @param emEmployees the emEmployees to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emEmployees, or with status 400 (Bad Request) if the emEmployees has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/em-employees")
    @Timed
    public ResponseEntity<EmEmployees> createEmEmployees(@Valid @RequestBody EmEmployees emEmployees) throws URISyntaxException {
        log.debug("REST request to save EmEmployees : {}", emEmployees);
        if (emEmployees.getId() != null) {
            throw new BadRequestAlertException("A new emEmployees cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmEmployees result = emEmployeesRepository.save(emEmployees);
        return ResponseEntity.created(new URI("/api/em-employees/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /em-employees : Updates an existing emEmployees.
     *
     * @param emEmployees the emEmployees to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emEmployees,
     * or with status 400 (Bad Request) if the emEmployees is not valid,
     * or with status 500 (Internal Server Error) if the emEmployees couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/em-employees")
    @Timed
    public ResponseEntity<EmEmployees> updateEmEmployees(@Valid @RequestBody EmEmployees emEmployees) throws URISyntaxException {
        log.debug("REST request to update EmEmployees : {}", emEmployees);
        if (emEmployees.getId() == null) {
            return createEmEmployees(emEmployees);
        }
        EmEmployees result = emEmployeesRepository.save(emEmployees);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emEmployees.getId().toString()))
            .body(result);
    }

    /**
     * GET  /em-employees : get all the emEmployees.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of emEmployees in body
     */
    @GetMapping("/em-employees")
    @Timed
    public ResponseEntity<List<EmEmployees>> getAllEmEmployees(Pageable pageable) {
        log.debug("REST request to get a page of EmEmployees");
        Page<EmEmployees> page = emEmployeesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/em-employees");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /em-employees/:id : get the "id" emEmployees.
     *
     * @param id the id of the emEmployees to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emEmployees, or with status 404 (Not Found)
     */
    @GetMapping("/em-employees/{id}")
    @Timed
    public ResponseEntity<EmEmployees> getEmEmployees(@PathVariable Long id) {
        log.debug("REST request to get EmEmployees : {}", id);
        EmEmployees emEmployees = emEmployeesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmployees));
    }

    /**
     * GET  /em-employees/user/:id : get the emEmployee by user id.
     *
     * @param id the id of the User to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emEmployees, or with status 404 (Not Found)
     */
    @GetMapping("/em-employees/user/{id}")
    @Timed
    public ResponseEntity<EmEmployees> getEmEmployeesByUserId(@PathVariable Long id) {
        log.debug("REST request to get EmEmployees by user id: {}", id);
        EmEmployees emEmployees = emEmployeesRepository.findByIdUserId(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmployees));
    }

    /**
     * DELETE  /em-employees/:id : delete the "id" emEmployees.
     *
     * @param id the id of the emEmployees to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/em-employees/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmEmployees(@PathVariable Long id) {
        log.debug("REST request to delete EmEmployees : {}", id);
        emEmployeesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
