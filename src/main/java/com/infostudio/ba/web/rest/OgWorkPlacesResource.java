package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.OgWorkPlaces;

import com.infostudio.ba.repository.OgWorkPlacesRepository;
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
 * REST controller for managing OgWorkPlaces.
 */
@RestController
@RequestMapping("/api")
public class OgWorkPlacesResource {

    private final Logger log = LoggerFactory.getLogger(OgWorkPlacesResource.class);

    private static final String ENTITY_NAME = "ogWorkPlaces";

    private final OgWorkPlacesRepository ogWorkPlacesRepository;

    public OgWorkPlacesResource(OgWorkPlacesRepository ogWorkPlacesRepository) {
        this.ogWorkPlacesRepository = ogWorkPlacesRepository;
    }

    /**
     * POST  /og-work-places : Create a new ogWorkPlaces.
     *
     * @param ogWorkPlaces the ogWorkPlaces to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ogWorkPlaces, or with status 400 (Bad Request) if the ogWorkPlaces has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/og-work-places")
    @Timed
    public ResponseEntity<OgWorkPlaces> createOgWorkPlaces(@Valid @RequestBody OgWorkPlaces ogWorkPlaces) throws URISyntaxException {
        log.debug("REST request to save OgWorkPlaces : {}", ogWorkPlaces);
        if (ogWorkPlaces.getId() != null) {
            throw new BadRequestAlertException("A new ogWorkPlaces cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OgWorkPlaces result = ogWorkPlacesRepository.save(ogWorkPlaces);
        return ResponseEntity.created(new URI("/api/og-work-places/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /og-work-places : Updates an existing ogWorkPlaces.
     *
     * @param ogWorkPlaces the ogWorkPlaces to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ogWorkPlaces,
     * or with status 400 (Bad Request) if the ogWorkPlaces is not valid,
     * or with status 500 (Internal Server Error) if the ogWorkPlaces couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/og-work-places")
    @Timed
    public ResponseEntity<OgWorkPlaces> updateOgWorkPlaces(@Valid @RequestBody OgWorkPlaces ogWorkPlaces) throws URISyntaxException {
        log.debug("REST request to update OgWorkPlaces : {}", ogWorkPlaces);
        if (ogWorkPlaces.getId() == null) {
            return createOgWorkPlaces(ogWorkPlaces);
        }
        OgWorkPlaces result = ogWorkPlacesRepository.save(ogWorkPlaces);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ogWorkPlaces.getId().toString()))
            .body(result);
    }

    /**
     * GET  /og-work-places : get all the ogWorkPlaces.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of ogWorkPlaces in body
     */
    @GetMapping("/og-work-places")
    @Timed
    public ResponseEntity<List<OgWorkPlaces>> getAllOgWorkPlaces(Pageable pageable) {
        log.debug("REST request to get a page of OgWorkPlaces");
        Page<OgWorkPlaces> page = ogWorkPlacesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/og-work-places");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /og-work-places/:id : get the "id" ogWorkPlaces.
     *
     * @param id the id of the ogWorkPlaces to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ogWorkPlaces, or with status 404 (Not Found)
     */
    @GetMapping("/og-work-places/{id}")
    @Timed
    public ResponseEntity<OgWorkPlaces> getOgWorkPlaces(@PathVariable Long id) {
        log.debug("REST request to get OgWorkPlaces : {}", id);
        OgWorkPlaces ogWorkPlaces = ogWorkPlacesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ogWorkPlaces));
    }

    /**
     * DELETE  /og-work-places/:id : delete the "id" ogWorkPlaces.
     *
     * @param id the id of the ogWorkPlaces to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/og-work-places/{id}")
    @Timed
    public ResponseEntity<Void> deleteOgWorkPlaces(@PathVariable Long id) {
        log.debug("REST request to delete OgWorkPlaces : {}", id);
        ogWorkPlacesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
