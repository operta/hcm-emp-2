package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.OgOrgWorkPlaces;

import com.infostudio.ba.repository.OgOrgWorkPlacesRepository;
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
 * REST controller for managing OgOrgWorkPlaces.
 */
@RestController
@RequestMapping("/api")
public class OgOrgWorkPlacesResource {

    private final Logger log = LoggerFactory.getLogger(OgOrgWorkPlacesResource.class);

    private static final String ENTITY_NAME = "ogOrgWorkPlaces";

    private final OgOrgWorkPlacesRepository ogOrgWorkPlacesRepository;

    public OgOrgWorkPlacesResource(OgOrgWorkPlacesRepository ogOrgWorkPlacesRepository) {
        this.ogOrgWorkPlacesRepository = ogOrgWorkPlacesRepository;
    }

    /**
     * POST  /og-org-work-places : Create a new ogOrgWorkPlaces.
     *
     * @param ogOrgWorkPlaces the ogOrgWorkPlaces to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ogOrgWorkPlaces, or with status 400 (Bad Request) if the ogOrgWorkPlaces has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/og-org-work-places")
    @Timed
    public ResponseEntity<OgOrgWorkPlaces> createOgOrgWorkPlaces(@RequestBody OgOrgWorkPlaces ogOrgWorkPlaces) throws URISyntaxException {
        log.debug("REST request to save OgOrgWorkPlaces : {}", ogOrgWorkPlaces);
        if (ogOrgWorkPlaces.getId() != null) {
            throw new BadRequestAlertException("A new ogOrgWorkPlaces cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OgOrgWorkPlaces result = ogOrgWorkPlacesRepository.save(ogOrgWorkPlaces);
        return ResponseEntity.created(new URI("/api/og-org-work-places/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /og-org-work-places : Updates an existing ogOrgWorkPlaces.
     *
     * @param ogOrgWorkPlaces the ogOrgWorkPlaces to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ogOrgWorkPlaces,
     * or with status 400 (Bad Request) if the ogOrgWorkPlaces is not valid,
     * or with status 500 (Internal Server Error) if the ogOrgWorkPlaces couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/og-org-work-places")
    @Timed
    public ResponseEntity<OgOrgWorkPlaces> updateOgOrgWorkPlaces(@RequestBody OgOrgWorkPlaces ogOrgWorkPlaces) throws URISyntaxException {
        log.debug("REST request to update OgOrgWorkPlaces : {}", ogOrgWorkPlaces);
        if (ogOrgWorkPlaces.getId() == null) {
            return createOgOrgWorkPlaces(ogOrgWorkPlaces);
        }
        OgOrgWorkPlaces result = ogOrgWorkPlacesRepository.save(ogOrgWorkPlaces);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ogOrgWorkPlaces.getId().toString()))
            .body(result);
    }

    /**
     * GET  /og-org-work-places : get all the ogOrgWorkPlaces.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of ogOrgWorkPlaces in body
     */
    @GetMapping("/og-org-work-places")
    @Timed
    public ResponseEntity<List<OgOrgWorkPlaces>> getAllOgOrgWorkPlaces(Pageable pageable) {
        log.debug("REST request to get a page of OgOrgWorkPlaces");
        Page<OgOrgWorkPlaces> page = ogOrgWorkPlacesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/og-org-work-places");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /og-org-work-places/:id : get the "id" ogOrgWorkPlaces.
     *
     * @param id the id of the ogOrgWorkPlaces to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ogOrgWorkPlaces, or with status 404 (Not Found)
     */
    @GetMapping("/og-org-work-places/{id}")
    @Timed
    public ResponseEntity<OgOrgWorkPlaces> getOgOrgWorkPlaces(@PathVariable Long id) {
        log.debug("REST request to get OgOrgWorkPlaces : {}", id);
        OgOrgWorkPlaces ogOrgWorkPlaces = ogOrgWorkPlacesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ogOrgWorkPlaces));
    }

    /**
     * DELETE  /og-org-work-places/:id : delete the "id" ogOrgWorkPlaces.
     *
     * @param id the id of the ogOrgWorkPlaces to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/og-org-work-places/{id}")
    @Timed
    public ResponseEntity<Void> deleteOgOrgWorkPlaces(@PathVariable Long id) {
        log.debug("REST request to delete OgOrgWorkPlaces : {}", id);
        ogOrgWorkPlacesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
