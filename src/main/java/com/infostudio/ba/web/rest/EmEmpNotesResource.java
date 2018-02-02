package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.EmEmpNotes;

import com.infostudio.ba.repository.EmEmpNotesRepository;
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
 * REST controller for managing EmEmpNotes.
 */
@RestController
@RequestMapping("/api")
public class EmEmpNotesResource {

    private final Logger log = LoggerFactory.getLogger(EmEmpNotesResource.class);

    private static final String ENTITY_NAME = "emEmpNotes";

    private final EmEmpNotesRepository emEmpNotesRepository;

    public EmEmpNotesResource(EmEmpNotesRepository emEmpNotesRepository) {
        this.emEmpNotesRepository = emEmpNotesRepository;
    }

    /**
     * POST  /em-emp-notes : Create a new emEmpNotes.
     *
     * @param emEmpNotes the emEmpNotes to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emEmpNotes, or with status 400 (Bad Request) if the emEmpNotes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/em-emp-notes")
    @Timed
    public ResponseEntity<EmEmpNotes> createEmEmpNotes(@Valid @RequestBody EmEmpNotes emEmpNotes) throws URISyntaxException {
        log.debug("REST request to save EmEmpNotes : {}", emEmpNotes);
        if (emEmpNotes.getId() != null) {
            throw new BadRequestAlertException("A new emEmpNotes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmEmpNotes result = emEmpNotesRepository.save(emEmpNotes);
        return ResponseEntity.created(new URI("/api/em-emp-notes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /em-emp-notes : Updates an existing emEmpNotes.
     *
     * @param emEmpNotes the emEmpNotes to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emEmpNotes,
     * or with status 400 (Bad Request) if the emEmpNotes is not valid,
     * or with status 500 (Internal Server Error) if the emEmpNotes couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/em-emp-notes")
    @Timed
    public ResponseEntity<EmEmpNotes> updateEmEmpNotes(@Valid @RequestBody EmEmpNotes emEmpNotes) throws URISyntaxException {
        log.debug("REST request to update EmEmpNotes : {}", emEmpNotes);
        if (emEmpNotes.getId() == null) {
            return createEmEmpNotes(emEmpNotes);
        }
        EmEmpNotes result = emEmpNotesRepository.save(emEmpNotes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emEmpNotes.getId().toString()))
            .body(result);
    }

    /**
     * GET  /em-emp-notes : get all the emEmpNotes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of emEmpNotes in body
     */
    @GetMapping("/em-emp-notes")
    @Timed
    public ResponseEntity<List<EmEmpNotes>> getAllEmEmpNotes(Pageable pageable) {
        log.debug("REST request to get a page of EmEmpNotes");
        Page<EmEmpNotes> page = emEmpNotesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/em-emp-notes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /em-emp-notes/:id : get the "id" emEmpNotes.
     *
     * @param id the id of the emEmpNotes to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emEmpNotes, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-notes/{id}")
    @Timed
    public ResponseEntity<EmEmpNotes> getEmEmpNotes(@PathVariable Long id) {
        log.debug("REST request to get EmEmpNotes : {}", id);
        EmEmpNotes emEmpNotes = emEmpNotesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmpNotes));
    }

    /**
     * DELETE  /em-emp-notes/:id : delete the "id" emEmpNotes.
     *
     * @param id the id of the emEmpNotes to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/em-emp-notes/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmEmpNotes(@PathVariable Long id) {
        log.debug("REST request to delete EmEmpNotes : {}", id);
        emEmpNotesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
