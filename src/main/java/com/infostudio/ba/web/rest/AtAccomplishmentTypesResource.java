package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.AtAccomplishmentTypes;

import com.infostudio.ba.repository.AtAccomplishmentTypesRepository;
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
 * REST controller for managing AtAccomplishmentTypes.
 */
@RestController
@RequestMapping("/api")
public class AtAccomplishmentTypesResource {

    private final Logger log = LoggerFactory.getLogger(AtAccomplishmentTypesResource.class);

    private static final String ENTITY_NAME = "atAccomplishmentTypes";

    private final AtAccomplishmentTypesRepository atAccomplishmentTypesRepository;

    public AtAccomplishmentTypesResource(AtAccomplishmentTypesRepository atAccomplishmentTypesRepository) {
        this.atAccomplishmentTypesRepository = atAccomplishmentTypesRepository;
    }

    /**
     * POST  /at-accomplishment-types : Create a new atAccomplishmentTypes.
     *
     * @param atAccomplishmentTypes the atAccomplishmentTypes to create
     * @return the ResponseEntity with status 201 (Created) and with body the new atAccomplishmentTypes, or with status 400 (Bad Request) if the atAccomplishmentTypes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/at-accomplishment-types")
    @Timed
    public ResponseEntity<AtAccomplishmentTypes> createAtAccomplishmentTypes(@Valid @RequestBody AtAccomplishmentTypes atAccomplishmentTypes) throws URISyntaxException {
        log.debug("REST request to save AtAccomplishmentTypes : {}", atAccomplishmentTypes);
        if (atAccomplishmentTypes.getId() != null) {
            throw new BadRequestAlertException("A new atAccomplishmentTypes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AtAccomplishmentTypes result = atAccomplishmentTypesRepository.save(atAccomplishmentTypes);
        return ResponseEntity.created(new URI("/api/at-accomplishment-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /at-accomplishment-types : Updates an existing atAccomplishmentTypes.
     *
     * @param atAccomplishmentTypes the atAccomplishmentTypes to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated atAccomplishmentTypes,
     * or with status 400 (Bad Request) if the atAccomplishmentTypes is not valid,
     * or with status 500 (Internal Server Error) if the atAccomplishmentTypes couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/at-accomplishment-types")
    @Timed
    public ResponseEntity<AtAccomplishmentTypes> updateAtAccomplishmentTypes(@Valid @RequestBody AtAccomplishmentTypes atAccomplishmentTypes) throws URISyntaxException {
        log.debug("REST request to update AtAccomplishmentTypes : {}", atAccomplishmentTypes);
        if (atAccomplishmentTypes.getId() == null) {
            return createAtAccomplishmentTypes(atAccomplishmentTypes);
        }
        AtAccomplishmentTypes result = atAccomplishmentTypesRepository.save(atAccomplishmentTypes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, atAccomplishmentTypes.getId().toString()))
            .body(result);
    }

    /**
     * GET  /at-accomplishment-types : get all the atAccomplishmentTypes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of atAccomplishmentTypes in body
     */
    @GetMapping("/at-accomplishment-types")
    @Timed
    public ResponseEntity<List<AtAccomplishmentTypes>> getAllAtAccomplishmentTypes(Pageable pageable) {
        log.debug("REST request to get a page of AtAccomplishmentTypes");
        Page<AtAccomplishmentTypes> page = atAccomplishmentTypesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/at-accomplishment-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /at-accomplishment-types/:id : get the "id" atAccomplishmentTypes.
     *
     * @param id the id of the atAccomplishmentTypes to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the atAccomplishmentTypes, or with status 404 (Not Found)
     */
    @GetMapping("/at-accomplishment-types/{id}")
    @Timed
    public ResponseEntity<AtAccomplishmentTypes> getAtAccomplishmentTypes(@PathVariable Long id) {
        log.debug("REST request to get AtAccomplishmentTypes : {}", id);
        AtAccomplishmentTypes atAccomplishmentTypes = atAccomplishmentTypesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(atAccomplishmentTypes));
    }

    /**
     * DELETE  /at-accomplishment-types/:id : delete the "id" atAccomplishmentTypes.
     *
     * @param id the id of the atAccomplishmentTypes to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/at-accomplishment-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteAtAccomplishmentTypes(@PathVariable Long id) {
        log.debug("REST request to delete AtAccomplishmentTypes : {}", id);
        atAccomplishmentTypesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
