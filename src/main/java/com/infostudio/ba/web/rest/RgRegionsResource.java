package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.RgRegions;

import com.infostudio.ba.repository.RgRegionsRepository;
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
 * REST controller for managing RgRegions.
 */
@RestController
@RequestMapping("/api")
public class RgRegionsResource {

    private final Logger log = LoggerFactory.getLogger(RgRegionsResource.class);

    private static final String ENTITY_NAME = "rgRegions";

    private final RgRegionsRepository rgRegionsRepository;

    public RgRegionsResource(RgRegionsRepository rgRegionsRepository) {
        this.rgRegionsRepository = rgRegionsRepository;
    }

    /**
     * POST  /rg-regions : Create a new rgRegions.
     *
     * @param rgRegions the rgRegions to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rgRegions, or with status 400 (Bad Request) if the rgRegions has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rg-regions")
    @Timed
    public ResponseEntity<RgRegions> createRgRegions(@Valid @RequestBody RgRegions rgRegions) throws URISyntaxException {
        log.debug("REST request to save RgRegions : {}", rgRegions);
        if (rgRegions.getId() != null) {
            throw new BadRequestAlertException("A new rgRegions cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RgRegions result = rgRegionsRepository.save(rgRegions);
        return ResponseEntity.created(new URI("/api/rg-regions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rg-regions : Updates an existing rgRegions.
     *
     * @param rgRegions the rgRegions to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rgRegions,
     * or with status 400 (Bad Request) if the rgRegions is not valid,
     * or with status 500 (Internal Server Error) if the rgRegions couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rg-regions")
    @Timed
    public ResponseEntity<RgRegions> updateRgRegions(@Valid @RequestBody RgRegions rgRegions) throws URISyntaxException {
        log.debug("REST request to update RgRegions : {}", rgRegions);
        if (rgRegions.getId() == null) {
            return createRgRegions(rgRegions);
        }
        RgRegions result = rgRegionsRepository.save(rgRegions);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rgRegions.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rg-regions : get all the rgRegions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of rgRegions in body
     */
    @GetMapping("/rg-regions")
    @Timed
    public ResponseEntity<List<RgRegions>> getAllRgRegions(Pageable pageable) {
        log.debug("REST request to get a page of RgRegions");
        Page<RgRegions> page = rgRegionsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/rg-regions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /rg-regions/:id : get the "id" rgRegions.
     *
     * @param id the id of the rgRegions to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rgRegions, or with status 404 (Not Found)
     */
    @GetMapping("/rg-regions/{id}")
    @Timed
    public ResponseEntity<RgRegions> getRgRegions(@PathVariable Long id) {
        log.debug("REST request to get RgRegions : {}", id);
        RgRegions rgRegions = rgRegionsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(rgRegions));
    }

    /**
     * GET  /rg-regions/type/:id : get the rgRegions by Type.
     *
     * @param id the idType of the rgRegions to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rgRegions, or with status 404 (Not Found)
     */
    @GetMapping("/rg-regions/type/{id}")
    @Timed
    public ResponseEntity<List<RgRegions>> getRgRegionsByType(@PathVariable Long id) {
        log.debug("REST request to get RgRegionsByType : {}", id);
        List<RgRegions> rgRegions = rgRegionsRepository.findByIdTypeId(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(rgRegions));
    }

    /**
     * DELETE  /rg-regions/:id : delete the "id" rgRegions.
     *
     * @param id the id of the rgRegions to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rg-regions/{id}")
    @Timed
    public ResponseEntity<Void> deleteRgRegions(@PathVariable Long id) {
        log.debug("REST request to delete RgRegions : {}", id);
        rgRegionsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
