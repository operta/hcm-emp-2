package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.OgOrgTypes;

import com.infostudio.ba.repository.OgOrgTypesRepository;
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
 * REST controller for managing OgOrgTypes.
 */
@RestController
@RequestMapping("/api")
public class OgOrgTypesResource {

    private final Logger log = LoggerFactory.getLogger(OgOrgTypesResource.class);

    private static final String ENTITY_NAME = "ogOrgTypes";

    private final OgOrgTypesRepository ogOrgTypesRepository;

    public OgOrgTypesResource(OgOrgTypesRepository ogOrgTypesRepository) {
        this.ogOrgTypesRepository = ogOrgTypesRepository;
    }

    /**
     * POST  /og-org-types : Create a new ogOrgTypes.
     *
     * @param ogOrgTypes the ogOrgTypes to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ogOrgTypes, or with status 400 (Bad Request) if the ogOrgTypes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/og-org-types")
    @Timed
    public ResponseEntity<OgOrgTypes> createOgOrgTypes(@Valid @RequestBody OgOrgTypes ogOrgTypes) throws URISyntaxException {
        log.debug("REST request to save OgOrgTypes : {}", ogOrgTypes);
        if (ogOrgTypes.getId() != null) {
            throw new BadRequestAlertException("A new ogOrgTypes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OgOrgTypes result = ogOrgTypesRepository.save(ogOrgTypes);
        return ResponseEntity.created(new URI("/api/og-org-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /og-org-types : Updates an existing ogOrgTypes.
     *
     * @param ogOrgTypes the ogOrgTypes to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ogOrgTypes,
     * or with status 400 (Bad Request) if the ogOrgTypes is not valid,
     * or with status 500 (Internal Server Error) if the ogOrgTypes couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/og-org-types")
    @Timed
    public ResponseEntity<OgOrgTypes> updateOgOrgTypes(@Valid @RequestBody OgOrgTypes ogOrgTypes) throws URISyntaxException {
        log.debug("REST request to update OgOrgTypes : {}", ogOrgTypes);
        if (ogOrgTypes.getId() == null) {
            return createOgOrgTypes(ogOrgTypes);
        }
        OgOrgTypes result = ogOrgTypesRepository.save(ogOrgTypes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ogOrgTypes.getId().toString()))
            .body(result);
    }

    /**
     * GET  /og-org-types : get all the ogOrgTypes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of ogOrgTypes in body
     */
    @GetMapping("/og-org-types")
    @Timed
    public ResponseEntity<List<OgOrgTypes>> getAllOgOrgTypes(Pageable pageable) {
        log.debug("REST request to get a page of OgOrgTypes");
        Page<OgOrgTypes> page = ogOrgTypesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/og-org-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /og-org-types/:id : get the "id" ogOrgTypes.
     *
     * @param id the id of the ogOrgTypes to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ogOrgTypes, or with status 404 (Not Found)
     */
    @GetMapping("/og-org-types/{id}")
    @Timed
    public ResponseEntity<OgOrgTypes> getOgOrgTypes(@PathVariable Long id) {
        log.debug("REST request to get OgOrgTypes : {}", id);
        OgOrgTypes ogOrgTypes = ogOrgTypesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ogOrgTypes));
    }

    /**
     * DELETE  /og-org-types/:id : delete the "id" ogOrgTypes.
     *
     * @param id the id of the ogOrgTypes to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/og-org-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteOgOrgTypes(@PathVariable Long id) {
        log.debug("REST request to delete OgOrgTypes : {}", id);
        ogOrgTypesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
