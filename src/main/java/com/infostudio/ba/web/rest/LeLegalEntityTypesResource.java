package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.LeLegalEntityTypes;

import com.infostudio.ba.repository.LeLegalEntityTypesRepository;
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
 * REST controller for managing LeLegalEntityTypes.
 */
@RestController
@RequestMapping("/api")
public class LeLegalEntityTypesResource {

    private final Logger log = LoggerFactory.getLogger(LeLegalEntityTypesResource.class);

    private static final String ENTITY_NAME = "leLegalEntityTypes";

    private final LeLegalEntityTypesRepository leLegalEntityTypesRepository;

    public LeLegalEntityTypesResource(LeLegalEntityTypesRepository leLegalEntityTypesRepository) {
        this.leLegalEntityTypesRepository = leLegalEntityTypesRepository;
    }

    /**
     * POST  /le-legal-entity-types : Create a new leLegalEntityTypes.
     *
     * @param leLegalEntityTypes the leLegalEntityTypes to create
     * @return the ResponseEntity with status 201 (Created) and with body the new leLegalEntityTypes, or with status 400 (Bad Request) if the leLegalEntityTypes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/le-legal-entity-types")
    @Timed
    public ResponseEntity<LeLegalEntityTypes> createLeLegalEntityTypes(@Valid @RequestBody LeLegalEntityTypes leLegalEntityTypes) throws URISyntaxException {
        log.debug("REST request to save LeLegalEntityTypes : {}", leLegalEntityTypes);
        if (leLegalEntityTypes.getId() != null) {
            throw new BadRequestAlertException("A new leLegalEntityTypes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LeLegalEntityTypes result = leLegalEntityTypesRepository.save(leLegalEntityTypes);
        return ResponseEntity.created(new URI("/api/le-legal-entity-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /le-legal-entity-types : Updates an existing leLegalEntityTypes.
     *
     * @param leLegalEntityTypes the leLegalEntityTypes to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated leLegalEntityTypes,
     * or with status 400 (Bad Request) if the leLegalEntityTypes is not valid,
     * or with status 500 (Internal Server Error) if the leLegalEntityTypes couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/le-legal-entity-types")
    @Timed
    public ResponseEntity<LeLegalEntityTypes> updateLeLegalEntityTypes(@Valid @RequestBody LeLegalEntityTypes leLegalEntityTypes) throws URISyntaxException {
        log.debug("REST request to update LeLegalEntityTypes : {}", leLegalEntityTypes);
        if (leLegalEntityTypes.getId() == null) {
            return createLeLegalEntityTypes(leLegalEntityTypes);
        }
        LeLegalEntityTypes result = leLegalEntityTypesRepository.save(leLegalEntityTypes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, leLegalEntityTypes.getId().toString()))
            .body(result);
    }

    /**
     * GET  /le-legal-entity-types : get all the leLegalEntityTypes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of leLegalEntityTypes in body
     */
    @GetMapping("/le-legal-entity-types")
    @Timed
    public ResponseEntity<List<LeLegalEntityTypes>> getAllLeLegalEntityTypes(Pageable pageable) {
        log.debug("REST request to get a page of LeLegalEntityTypes");
        Page<LeLegalEntityTypes> page = leLegalEntityTypesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/le-legal-entity-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /le-legal-entity-types/:id : get the "id" leLegalEntityTypes.
     *
     * @param id the id of the leLegalEntityTypes to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the leLegalEntityTypes, or with status 404 (Not Found)
     */
    @GetMapping("/le-legal-entity-types/{id}")
    @Timed
    public ResponseEntity<LeLegalEntityTypes> getLeLegalEntityTypes(@PathVariable Long id) {
        log.debug("REST request to get LeLegalEntityTypes : {}", id);
        LeLegalEntityTypes leLegalEntityTypes = leLegalEntityTypesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(leLegalEntityTypes));
    }

    /**
     * DELETE  /le-legal-entity-types/:id : delete the "id" leLegalEntityTypes.
     *
     * @param id the id of the leLegalEntityTypes to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/le-legal-entity-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteLeLegalEntityTypes(@PathVariable Long id) {
        log.debug("REST request to delete LeLegalEntityTypes : {}", id);
        leLegalEntityTypesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
