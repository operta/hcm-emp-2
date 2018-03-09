package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.RgContactTypes;

import com.infostudio.ba.repository.RgContactTypesRepository;
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
 * REST controller for managing RgContactTypes.
 */
@RestController
@RequestMapping("/api")
public class RgContactTypesResource {

    private final Logger log = LoggerFactory.getLogger(RgContactTypesResource.class);

    private static final String ENTITY_NAME = "rgContactTypes";

    private final RgContactTypesRepository rgContactTypesRepository;

    public RgContactTypesResource(RgContactTypesRepository rgContactTypesRepository) {
        this.rgContactTypesRepository = rgContactTypesRepository;
    }

    /**
     * POST  /rg-contact-types : Create a new rgContactTypes.
     *
     * @param rgContactTypes the rgContactTypes to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rgContactTypes, or with status 400 (Bad Request) if the rgContactTypes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rg-contact-types")
    @Timed
    public ResponseEntity<RgContactTypes> createRgContactTypes(@Valid @RequestBody RgContactTypes rgContactTypes) throws URISyntaxException {
        log.debug("REST request to save RgContactTypes : {}", rgContactTypes);
        if (rgContactTypes.getId() != null) {
            throw new BadRequestAlertException("A new rgContactTypes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RgContactTypes result = rgContactTypesRepository.save(rgContactTypes);
        return ResponseEntity.created(new URI("/api/rg-contact-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rg-contact-types : Updates an existing rgContactTypes.
     *
     * @param rgContactTypes the rgContactTypes to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rgContactTypes,
     * or with status 400 (Bad Request) if the rgContactTypes is not valid,
     * or with status 500 (Internal Server Error) if the rgContactTypes couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rg-contact-types")
    @Timed
    public ResponseEntity<RgContactTypes> updateRgContactTypes(@Valid @RequestBody RgContactTypes rgContactTypes) throws URISyntaxException {
        log.debug("REST request to update RgContactTypes : {}", rgContactTypes);
        if (rgContactTypes.getId() == null) {
            return createRgContactTypes(rgContactTypes);
        }
        RgContactTypes result = rgContactTypesRepository.save(rgContactTypes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rgContactTypes.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rg-contact-types : get all the rgContactTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of rgContactTypes in body
     */
    @GetMapping("/rg-contact-types")
    @Timed
    public List<RgContactTypes> getAllRgContactTypes() {
        log.debug("REST request to get all RgContactTypes");
        return rgContactTypesRepository.findAll();
        }

    /**
     * GET  /rg-contact-types/:id : get the "id" rgContactTypes.
     *
     * @param id the id of the rgContactTypes to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rgContactTypes, or with status 404 (Not Found)
     */
    @GetMapping("/rg-contact-types/{id}")
    @Timed
    public ResponseEntity<RgContactTypes> getRgContactTypes(@PathVariable Long id) {
        log.debug("REST request to get RgContactTypes : {}", id);
        RgContactTypes rgContactTypes = rgContactTypesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(rgContactTypes));
    }

    /**
     * DELETE  /rg-contact-types/:id : delete the "id" rgContactTypes.
     *
     * @param id the id of the rgContactTypes to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rg-contact-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteRgContactTypes(@PathVariable Long id) {
        log.debug("REST request to delete RgContactTypes : {}", id);
        rgContactTypesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
