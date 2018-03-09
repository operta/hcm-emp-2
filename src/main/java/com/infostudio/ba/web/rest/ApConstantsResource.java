package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.ApConstants;

import com.infostudio.ba.repository.ApConstantsRepository;
import com.infostudio.ba.web.rest.errors.BadRequestAlertException;
import com.infostudio.ba.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ApConstants.
 */
@RestController
@RequestMapping("/api")
public class ApConstantsResource {

    private final Logger log = LoggerFactory.getLogger(ApConstantsResource.class);

    private static final String ENTITY_NAME = "apConstants";

    private final ApConstantsRepository apConstantsRepository;

    public ApConstantsResource(ApConstantsRepository apConstantsRepository) {
        this.apConstantsRepository = apConstantsRepository;
    }

    /**
     * POST  /ap-constants : Create a new apConstants.
     *
     * @param apConstants the apConstants to create
     * @return the ResponseEntity with status 201 (Created) and with body the new apConstants, or with status 400 (Bad Request) if the apConstants has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ap-constants")
    @Timed
    public ResponseEntity<ApConstants> createApConstants(@RequestBody ApConstants apConstants) throws URISyntaxException {
        log.debug("REST request to save ApConstants : {}", apConstants);
        if (apConstants.getId() != null) {
            throw new BadRequestAlertException("A new apConstants cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ApConstants result = apConstantsRepository.save(apConstants);
        return ResponseEntity.created(new URI("/api/ap-constants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ap-constants : Updates an existing apConstants.
     *
     * @param apConstants the apConstants to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated apConstants,
     * or with status 400 (Bad Request) if the apConstants is not valid,
     * or with status 500 (Internal Server Error) if the apConstants couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ap-constants")
    @Timed
    public ResponseEntity<ApConstants> updateApConstants(@RequestBody ApConstants apConstants) throws URISyntaxException {
        log.debug("REST request to update ApConstants : {}", apConstants);
        if (apConstants.getId() == null) {
            return createApConstants(apConstants);
        }
        ApConstants result = apConstantsRepository.save(apConstants);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, apConstants.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ap-constants : get all the apConstants.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of apConstants in body
     */
    @GetMapping("/ap-constants")
    @Timed
    public List<ApConstants> getAllApConstants() {
        log.debug("REST request to get all ApConstants");
        return apConstantsRepository.findAll();
        }

    /**
     * GET  /ap-constants/:id : get the "id" apConstants.
     *
     * @param id the id of the apConstants to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the apConstants, or with status 404 (Not Found)
     */
    @GetMapping("/ap-constants/{id}")
    @Timed
    public ResponseEntity<ApConstants> getApConstants(@PathVariable Long id) {
        log.debug("REST request to get ApConstants : {}", id);
        ApConstants apConstants = apConstantsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(apConstants));
    }

    /**
     * GET  /ap-constants/key/:value : get the apConstant value by key.
     *
     * @param key the key of the apConstans to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the apConstants, or with status 404 (Not Found)
     */
    @GetMapping("/ap-constants/key/{key}")
    @Timed
    public ResponseEntity<ApConstants> getApConstantByKey(@PathVariable String key) {
        log.debug("REST request to get ApConstants : {}", key);
        ApConstants apConstants = apConstantsRepository.findByKeyIgnoreCase(key);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(apConstants));
    }

    /**
     * DELETE  /ap-constants/:id : delete the "id" apConstants.
     *
     * @param id the id of the apConstants to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ap-constants/{id}")
    @Timed
    public ResponseEntity<Void> deleteApConstants(@PathVariable Long id) {
        log.debug("REST request to delete ApConstants : {}", id);
        apConstantsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
