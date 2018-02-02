package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.RgRegionTypes;

import com.infostudio.ba.repository.RgRegionTypesRepository;
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
 * REST controller for managing RgRegionTypes.
 */
@RestController
@RequestMapping("/api")
public class RgRegionTypesResource {

    private final Logger log = LoggerFactory.getLogger(RgRegionTypesResource.class);

    private static final String ENTITY_NAME = "rgRegionTypes";

    private final RgRegionTypesRepository rgRegionTypesRepository;

    public RgRegionTypesResource(RgRegionTypesRepository rgRegionTypesRepository) {
        this.rgRegionTypesRepository = rgRegionTypesRepository;
    }

    /**
     * POST  /rg-region-types : Create a new rgRegionTypes.
     *
     * @param rgRegionTypes the rgRegionTypes to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rgRegionTypes, or with status 400 (Bad Request) if the rgRegionTypes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rg-region-types")
    @Timed
    public ResponseEntity<RgRegionTypes> createRgRegionTypes(@Valid @RequestBody RgRegionTypes rgRegionTypes) throws URISyntaxException {
        log.debug("REST request to save RgRegionTypes : {}", rgRegionTypes);
        if (rgRegionTypes.getId() != null) {
            throw new BadRequestAlertException("A new rgRegionTypes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RgRegionTypes result = rgRegionTypesRepository.save(rgRegionTypes);
        return ResponseEntity.created(new URI("/api/rg-region-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rg-region-types : Updates an existing rgRegionTypes.
     *
     * @param rgRegionTypes the rgRegionTypes to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rgRegionTypes,
     * or with status 400 (Bad Request) if the rgRegionTypes is not valid,
     * or with status 500 (Internal Server Error) if the rgRegionTypes couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rg-region-types")
    @Timed
    public ResponseEntity<RgRegionTypes> updateRgRegionTypes(@Valid @RequestBody RgRegionTypes rgRegionTypes) throws URISyntaxException {
        log.debug("REST request to update RgRegionTypes : {}", rgRegionTypes);
        if (rgRegionTypes.getId() == null) {
            return createRgRegionTypes(rgRegionTypes);
        }
        RgRegionTypes result = rgRegionTypesRepository.save(rgRegionTypes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rgRegionTypes.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rg-region-types : get all the rgRegionTypes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of rgRegionTypes in body
     */
    @GetMapping("/rg-region-types")
    @Timed
    public ResponseEntity<List<RgRegionTypes>> getAllRgRegionTypes(Pageable pageable) {
        log.debug("REST request to get a page of RgRegionTypes");
        Page<RgRegionTypes> page = rgRegionTypesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/rg-region-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /rg-region-types/:id : get the "id" rgRegionTypes.
     *
     * @param id the id of the rgRegionTypes to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rgRegionTypes, or with status 404 (Not Found)
     */
    @GetMapping("/rg-region-types/{id}")
    @Timed
    public ResponseEntity<RgRegionTypes> getRgRegionTypes(@PathVariable Long id) {
        log.debug("REST request to get RgRegionTypes : {}", id);
        RgRegionTypes rgRegionTypes = rgRegionTypesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(rgRegionTypes));
    }

    /**
     * DELETE  /rg-region-types/:id : delete the "id" rgRegionTypes.
     *
     * @param id the id of the rgRegionTypes to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rg-region-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteRgRegionTypes(@PathVariable Long id) {
        log.debug("REST request to delete RgRegionTypes : {}", id);
        rgRegionTypesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
