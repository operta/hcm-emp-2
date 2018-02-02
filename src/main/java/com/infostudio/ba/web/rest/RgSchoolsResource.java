package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.RgSchools;

import com.infostudio.ba.repository.RgSchoolsRepository;
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
 * REST controller for managing RgSchools.
 */
@RestController
@RequestMapping("/api")
public class RgSchoolsResource {

    private final Logger log = LoggerFactory.getLogger(RgSchoolsResource.class);

    private static final String ENTITY_NAME = "rgSchools";

    private final RgSchoolsRepository rgSchoolsRepository;

    public RgSchoolsResource(RgSchoolsRepository rgSchoolsRepository) {
        this.rgSchoolsRepository = rgSchoolsRepository;
    }

    /**
     * POST  /rg-schools : Create a new rgSchools.
     *
     * @param rgSchools the rgSchools to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rgSchools, or with status 400 (Bad Request) if the rgSchools has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rg-schools")
    @Timed
    public ResponseEntity<RgSchools> createRgSchools(@Valid @RequestBody RgSchools rgSchools) throws URISyntaxException {
        log.debug("REST request to save RgSchools : {}", rgSchools);
        if (rgSchools.getId() != null) {
            throw new BadRequestAlertException("A new rgSchools cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RgSchools result = rgSchoolsRepository.save(rgSchools);
        return ResponseEntity.created(new URI("/api/rg-schools/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rg-schools : Updates an existing rgSchools.
     *
     * @param rgSchools the rgSchools to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rgSchools,
     * or with status 400 (Bad Request) if the rgSchools is not valid,
     * or with status 500 (Internal Server Error) if the rgSchools couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rg-schools")
    @Timed
    public ResponseEntity<RgSchools> updateRgSchools(@Valid @RequestBody RgSchools rgSchools) throws URISyntaxException {
        log.debug("REST request to update RgSchools : {}", rgSchools);
        if (rgSchools.getId() == null) {
            return createRgSchools(rgSchools);
        }
        RgSchools result = rgSchoolsRepository.save(rgSchools);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rgSchools.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rg-schools : get all the rgSchools.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of rgSchools in body
     */
    @GetMapping("/rg-schools")
    @Timed
    public ResponseEntity<List<RgSchools>> getAllRgSchools(Pageable pageable) {
        log.debug("REST request to get a page of RgSchools");
        Page<RgSchools> page = rgSchoolsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/rg-schools");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /rg-schools/:id : get the "id" rgSchools.
     *
     * @param id the id of the rgSchools to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rgSchools, or with status 404 (Not Found)
     */
    @GetMapping("/rg-schools/{id}")
    @Timed
    public ResponseEntity<RgSchools> getRgSchools(@PathVariable Long id) {
        log.debug("REST request to get RgSchools : {}", id);
        RgSchools rgSchools = rgSchoolsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(rgSchools));
    }

    /**
     * DELETE  /rg-schools/:id : delete the "id" rgSchools.
     *
     * @param id the id of the rgSchools to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rg-schools/{id}")
    @Timed
    public ResponseEntity<Void> deleteRgSchools(@PathVariable Long id) {
        log.debug("REST request to delete RgSchools : {}", id);
        rgSchoolsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
