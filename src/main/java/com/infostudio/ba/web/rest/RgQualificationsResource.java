package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.RgQualifications;

import com.infostudio.ba.repository.RgQualificationsRepository;
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
 * REST controller for managing RgQualifications.
 */
@RestController
@RequestMapping("/api")
public class RgQualificationsResource {

    private final Logger log = LoggerFactory.getLogger(RgQualificationsResource.class);

    private static final String ENTITY_NAME = "rgQualifications";

    private final RgQualificationsRepository rgQualificationsRepository;

    public RgQualificationsResource(RgQualificationsRepository rgQualificationsRepository) {
        this.rgQualificationsRepository = rgQualificationsRepository;
    }

    /**
     * POST  /rg-qualifications : Create a new rgQualifications.
     *
     * @param rgQualifications the rgQualifications to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rgQualifications, or with status 400 (Bad Request) if the rgQualifications has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rg-qualifications")
    @Timed
    public ResponseEntity<RgQualifications> createRgQualifications(@Valid @RequestBody RgQualifications rgQualifications) throws URISyntaxException {
        log.debug("REST request to save RgQualifications : {}", rgQualifications);
        if (rgQualifications.getId() != null) {
            throw new BadRequestAlertException("A new rgQualifications cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RgQualifications result = rgQualificationsRepository.save(rgQualifications);
        return ResponseEntity.created(new URI("/api/rg-qualifications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rg-qualifications : Updates an existing rgQualifications.
     *
     * @param rgQualifications the rgQualifications to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rgQualifications,
     * or with status 400 (Bad Request) if the rgQualifications is not valid,
     * or with status 500 (Internal Server Error) if the rgQualifications couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rg-qualifications")
    @Timed
    public ResponseEntity<RgQualifications> updateRgQualifications(@Valid @RequestBody RgQualifications rgQualifications) throws URISyntaxException {
        log.debug("REST request to update RgQualifications : {}", rgQualifications);
        if (rgQualifications.getId() == null) {
            return createRgQualifications(rgQualifications);
        }
        RgQualifications result = rgQualificationsRepository.save(rgQualifications);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rgQualifications.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rg-qualifications : get all the rgQualifications.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of rgQualifications in body
     */
    @GetMapping("/rg-qualifications")
    @Timed
    public ResponseEntity<List<RgQualifications>> getAllRgQualifications(Pageable pageable) {
        log.debug("REST request to get a page of RgQualifications");
        Page<RgQualifications> page = rgQualificationsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/rg-qualifications");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /rg-qualifications/:id : get the "id" rgQualifications.
     *
     * @param id the id of the rgQualifications to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rgQualifications, or with status 404 (Not Found)
     */
    @GetMapping("/rg-qualifications/{id}")
    @Timed
    public ResponseEntity<RgQualifications> getRgQualifications(@PathVariable Long id) {
        log.debug("REST request to get RgQualifications : {}", id);
        RgQualifications rgQualifications = rgQualificationsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(rgQualifications));
    }

    /**
     * DELETE  /rg-qualifications/:id : delete the "id" rgQualifications.
     *
     * @param id the id of the rgQualifications to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rg-qualifications/{id}")
    @Timed
    public ResponseEntity<Void> deleteRgQualifications(@PathVariable Long id) {
        log.debug("REST request to delete RgQualifications : {}", id);
        rgQualificationsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
