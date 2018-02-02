package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.EmStatuses;

import com.infostudio.ba.repository.EmStatusesRepository;
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
 * REST controller for managing EmStatuses.
 */
@RestController
@RequestMapping("/api")
public class EmStatusesResource {

    private final Logger log = LoggerFactory.getLogger(EmStatusesResource.class);

    private static final String ENTITY_NAME = "emStatuses";

    private final EmStatusesRepository emStatusesRepository;

    public EmStatusesResource(EmStatusesRepository emStatusesRepository) {
        this.emStatusesRepository = emStatusesRepository;
    }

    /**
     * POST  /em-statuses : Create a new emStatuses.
     *
     * @param emStatuses the emStatuses to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emStatuses, or with status 400 (Bad Request) if the emStatuses has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/em-statuses")
    @Timed
    public ResponseEntity<EmStatuses> createEmStatuses(@RequestBody EmStatuses emStatuses) throws URISyntaxException {
        log.debug("REST request to save EmStatuses : {}", emStatuses);
        if (emStatuses.getId() != null) {
            throw new BadRequestAlertException("A new emStatuses cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmStatuses result = emStatusesRepository.save(emStatuses);
        return ResponseEntity.created(new URI("/api/em-statuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /em-statuses : Updates an existing emStatuses.
     *
     * @param emStatuses the emStatuses to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emStatuses,
     * or with status 400 (Bad Request) if the emStatuses is not valid,
     * or with status 500 (Internal Server Error) if the emStatuses couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/em-statuses")
    @Timed
    public ResponseEntity<EmStatuses> updateEmStatuses(@RequestBody EmStatuses emStatuses) throws URISyntaxException {
        log.debug("REST request to update EmStatuses : {}", emStatuses);
        if (emStatuses.getId() == null) {
            return createEmStatuses(emStatuses);
        }
        EmStatuses result = emStatusesRepository.save(emStatuses);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emStatuses.getId().toString()))
            .body(result);
    }

    /**
     * GET  /em-statuses : get all the emStatuses.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of emStatuses in body
     */
    @GetMapping("/em-statuses")
    @Timed
    public ResponseEntity<List<EmStatuses>> getAllEmStatuses(Pageable pageable) {
        log.debug("REST request to get a page of EmStatuses");
        Page<EmStatuses> page = emStatusesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/em-statuses");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /em-statuses/:id : get the "id" emStatuses.
     *
     * @param id the id of the emStatuses to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emStatuses, or with status 404 (Not Found)
     */
    @GetMapping("/em-statuses/{id}")
    @Timed
    public ResponseEntity<EmStatuses> getEmStatuses(@PathVariable Long id) {
        log.debug("REST request to get EmStatuses : {}", id);
        EmStatuses emStatuses = emStatusesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emStatuses));
    }

    /**
     * DELETE  /em-statuses/:id : delete the "id" emStatuses.
     *
     * @param id the id of the emStatuses to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/em-statuses/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmStatuses(@PathVariable Long id) {
        log.debug("REST request to delete EmStatuses : {}", id);
        emStatusesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
