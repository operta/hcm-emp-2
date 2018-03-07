package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.RgIdentificationTypes;

import com.infostudio.ba.repository.RgIdentificationTypesRepository;
import com.infostudio.ba.web.rest.errors.BadRequestAlertException;
import com.infostudio.ba.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing RgIdentificationTypes.
 */
@RestController
@RequestMapping("/api")
public class RgIdentificationTypesResource {

    private final Logger log = LoggerFactory.getLogger(RgIdentificationTypesResource.class);

    private static final String ENTITY_NAME = "rgIdentificationTypes";

    private final RgIdentificationTypesRepository rgIdentificationTypesRepository;

    public RgIdentificationTypesResource(RgIdentificationTypesRepository rgIdentificationTypesRepository) {
        this.rgIdentificationTypesRepository = rgIdentificationTypesRepository;
    }

    /**
     * POST  /rg-identification-types : Create a new rgIdentificationTypes.
     *
     * @param rgIdentificationTypes the rgIdentificationTypes to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rgIdentificationTypes, or with status 400 (Bad Request) if the rgIdentificationTypes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rg-identification-types")
    @Timed
    public ResponseEntity<RgIdentificationTypes> createRgIdentificationTypes(@Valid @RequestBody RgIdentificationTypes rgIdentificationTypes) throws URISyntaxException {
        log.debug("REST request to save RgIdentificationTypes : {}", rgIdentificationTypes);
        if (rgIdentificationTypes.getId() != null) {
            throw new BadRequestAlertException("A new rgIdentificationTypes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RgIdentificationTypes result = rgIdentificationTypesRepository.save(rgIdentificationTypes);
        return ResponseEntity.created(new URI("/api/rg-identification-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rg-identification-types : Updates an existing rgIdentificationTypes.
     *
     * @param rgIdentificationTypes the rgIdentificationTypes to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rgIdentificationTypes,
     * or with status 400 (Bad Request) if the rgIdentificationTypes is not valid,
     * or with status 500 (Internal Server Error) if the rgIdentificationTypes couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rg-identification-types")
    @Timed
    public ResponseEntity<RgIdentificationTypes> updateRgIdentificationTypes(@Valid @RequestBody RgIdentificationTypes rgIdentificationTypes) throws URISyntaxException {
        log.debug("REST request to update RgIdentificationTypes : {}", rgIdentificationTypes);
        if (rgIdentificationTypes.getId() == null) {
            return createRgIdentificationTypes(rgIdentificationTypes);
        }
        RgIdentificationTypes result = rgIdentificationTypesRepository.save(rgIdentificationTypes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rgIdentificationTypes.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rg-identification-types : get all the rgIdentificationTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of rgIdentificationTypes in body
     */
    @GetMapping("/rg-identification-types")
    @Timed
    public List<RgIdentificationTypes> getAllRgIdentificationTypes() {
        log.debug("REST request to get all RgIdentificationTypes");
        return rgIdentificationTypesRepository.findAll();
        }

    /**
     * GET  /rg-identification-types/:id : get the "id" rgIdentificationTypes.
     *
     * @param id the id of the rgIdentificationTypes to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rgIdentificationTypes, or with status 404 (Not Found)
     */
    @GetMapping("/rg-identification-types/{id}")
    @Timed
    public ResponseEntity<RgIdentificationTypes> getRgIdentificationTypes(@PathVariable Long id) {
        log.debug("REST request to get RgIdentificationTypes : {}", id);
        RgIdentificationTypes rgIdentificationTypes = rgIdentificationTypesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(rgIdentificationTypes));
    }

    /**
     * DELETE  /rg-identification-types/:id : delete the "id" rgIdentificationTypes.
     *
     * @param id the id of the rgIdentificationTypes to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rg-identification-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteRgIdentificationTypes(@PathVariable Long id) {
        log.debug("REST request to delete RgIdentificationTypes : {}", id);
        rgIdentificationTypesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
