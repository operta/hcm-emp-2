package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.EmEmpTypes;

import com.infostudio.ba.repository.EmEmpTypesRepository;
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
 * REST controller for managing EmEmpTypes.
 */
@RestController
@RequestMapping("/api")
public class EmEmpTypesResource {

    private final Logger log = LoggerFactory.getLogger(EmEmpTypesResource.class);

    private static final String ENTITY_NAME = "emEmpTypes";

    private final EmEmpTypesRepository emEmpTypesRepository;

    public EmEmpTypesResource(EmEmpTypesRepository emEmpTypesRepository) {
        this.emEmpTypesRepository = emEmpTypesRepository;
    }

    /**
     * POST  /em-emp-types : Create a new emEmpTypes.
     *
     * @param emEmpTypes the emEmpTypes to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emEmpTypes, or with status 400 (Bad Request) if the emEmpTypes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/em-emp-types")
    @Timed
    public ResponseEntity<EmEmpTypes> createEmEmpTypes(@Valid @RequestBody EmEmpTypes emEmpTypes) throws URISyntaxException {
        log.debug("REST request to save EmEmpTypes : {}", emEmpTypes);
        if (emEmpTypes.getId() != null) {
            throw new BadRequestAlertException("A new emEmpTypes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmEmpTypes result = emEmpTypesRepository.save(emEmpTypes);
        return ResponseEntity.created(new URI("/api/em-emp-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /em-emp-types : Updates an existing emEmpTypes.
     *
     * @param emEmpTypes the emEmpTypes to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emEmpTypes,
     * or with status 400 (Bad Request) if the emEmpTypes is not valid,
     * or with status 500 (Internal Server Error) if the emEmpTypes couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/em-emp-types")
    @Timed
    public ResponseEntity<EmEmpTypes> updateEmEmpTypes(@Valid @RequestBody EmEmpTypes emEmpTypes) throws URISyntaxException {
        log.debug("REST request to update EmEmpTypes : {}", emEmpTypes);
        if (emEmpTypes.getId() == null) {
            return createEmEmpTypes(emEmpTypes);
        }
        EmEmpTypes result = emEmpTypesRepository.save(emEmpTypes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emEmpTypes.getId().toString()))
            .body(result);
    }

    /**
     * GET  /em-emp-types : get all the emEmpTypes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of emEmpTypes in body
     */
    @GetMapping("/em-emp-types")
    @Timed
    public ResponseEntity<List<EmEmpTypes>> getAllEmEmpTypes(Pageable pageable) {
        log.debug("REST request to get a page of EmEmpTypes");
        Page<EmEmpTypes> page = emEmpTypesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/em-emp-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /em-emp-types/:id : get the "id" emEmpTypes.
     *
     * @param id the id of the emEmpTypes to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emEmpTypes, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-types/{id}")
    @Timed
    public ResponseEntity<EmEmpTypes> getEmEmpTypes(@PathVariable Long id) {
        log.debug("REST request to get EmEmpTypes : {}", id);
        EmEmpTypes emEmpTypes = emEmpTypesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmpTypes));
    }

    /**
     * DELETE  /em-emp-types/:id : delete the "id" emEmpTypes.
     *
     * @param id the id of the emEmpTypes to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/em-emp-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmEmpTypes(@PathVariable Long id) {
        log.debug("REST request to delete EmEmpTypes : {}", id);
        emEmpTypesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
