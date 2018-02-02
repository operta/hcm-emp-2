package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.EmEmpAccomplishments;

import com.infostudio.ba.repository.EmEmpAccomplishmentsRepository;
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
 * REST controller for managing EmEmpAccomplishments.
 */
@RestController
@RequestMapping("/api")
public class EmEmpAccomplishmentsResource {

    private final Logger log = LoggerFactory.getLogger(EmEmpAccomplishmentsResource.class);

    private static final String ENTITY_NAME = "emEmpAccomplishments";

    private final EmEmpAccomplishmentsRepository emEmpAccomplishmentsRepository;

    public EmEmpAccomplishmentsResource(EmEmpAccomplishmentsRepository emEmpAccomplishmentsRepository) {
        this.emEmpAccomplishmentsRepository = emEmpAccomplishmentsRepository;
    }

    /**
     * POST  /em-emp-accomplishments : Create a new emEmpAccomplishments.
     *
     * @param emEmpAccomplishments the emEmpAccomplishments to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emEmpAccomplishments, or with status 400 (Bad Request) if the emEmpAccomplishments has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/em-emp-accomplishments")
    @Timed
    public ResponseEntity<EmEmpAccomplishments> createEmEmpAccomplishments(@Valid @RequestBody EmEmpAccomplishments emEmpAccomplishments) throws URISyntaxException {
        log.debug("REST request to save EmEmpAccomplishments : {}", emEmpAccomplishments);
        if (emEmpAccomplishments.getId() != null) {
            throw new BadRequestAlertException("A new emEmpAccomplishments cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmEmpAccomplishments result = emEmpAccomplishmentsRepository.save(emEmpAccomplishments);
        return ResponseEntity.created(new URI("/api/em-emp-accomplishments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /em-emp-accomplishments : Updates an existing emEmpAccomplishments.
     *
     * @param emEmpAccomplishments the emEmpAccomplishments to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emEmpAccomplishments,
     * or with status 400 (Bad Request) if the emEmpAccomplishments is not valid,
     * or with status 500 (Internal Server Error) if the emEmpAccomplishments couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/em-emp-accomplishments")
    @Timed
    public ResponseEntity<EmEmpAccomplishments> updateEmEmpAccomplishments(@Valid @RequestBody EmEmpAccomplishments emEmpAccomplishments) throws URISyntaxException {
        log.debug("REST request to update EmEmpAccomplishments : {}", emEmpAccomplishments);
        if (emEmpAccomplishments.getId() == null) {
            return createEmEmpAccomplishments(emEmpAccomplishments);
        }
        EmEmpAccomplishments result = emEmpAccomplishmentsRepository.save(emEmpAccomplishments);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emEmpAccomplishments.getId().toString()))
            .body(result);
    }

    /**
     * GET  /em-emp-accomplishments : get all the emEmpAccomplishments.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of emEmpAccomplishments in body
     */
    @GetMapping("/em-emp-accomplishments")
    @Timed
    public ResponseEntity<List<EmEmpAccomplishments>> getAllEmEmpAccomplishments(Pageable pageable) {
        log.debug("REST request to get a page of EmEmpAccomplishments");
        Page<EmEmpAccomplishments> page = emEmpAccomplishmentsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/em-emp-accomplishments");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /em-emp-accomplishments/:id : get the "id" emEmpAccomplishments.
     *
     * @param id the id of the emEmpAccomplishments to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emEmpAccomplishments, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-accomplishments/{id}")
    @Timed
    public ResponseEntity<EmEmpAccomplishments> getEmEmpAccomplishments(@PathVariable Long id) {
        log.debug("REST request to get EmEmpAccomplishments : {}", id);
        EmEmpAccomplishments emEmpAccomplishments = emEmpAccomplishmentsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmpAccomplishments));
    }

    /**
     * DELETE  /em-emp-accomplishments/:id : delete the "id" emEmpAccomplishments.
     *
     * @param id the id of the emEmpAccomplishments to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/em-emp-accomplishments/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmEmpAccomplishments(@PathVariable Long id) {
        log.debug("REST request to delete EmEmpAccomplishments : {}", id);
        emEmpAccomplishmentsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
