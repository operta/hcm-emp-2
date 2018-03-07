package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.EmEmpAccomplishments;
import com.infostudio.ba.domain.EmEmpBorrowings;

import com.infostudio.ba.repository.EmEmpBorrowingsRepository;
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
 * REST controller for managing EmEmpBorrowings.
 */
@RestController
@RequestMapping("/api")
public class EmEmpBorrowingsResource {

    private final Logger log = LoggerFactory.getLogger(EmEmpBorrowingsResource.class);

    private static final String ENTITY_NAME = "emEmpBorrowings";

    private final EmEmpBorrowingsRepository emEmpBorrowingsRepository;

    public EmEmpBorrowingsResource(EmEmpBorrowingsRepository emEmpBorrowingsRepository) {
        this.emEmpBorrowingsRepository = emEmpBorrowingsRepository;
    }

    /**
     * POST  /em-emp-borrowings : Create a new emEmpBorrowings.
     *
     * @param emEmpBorrowings the emEmpBorrowings to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emEmpBorrowings, or with status 400 (Bad Request) if the emEmpBorrowings has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/em-emp-borrowings")
    @Timed
    public ResponseEntity<EmEmpBorrowings> createEmEmpBorrowings(@Valid @RequestBody EmEmpBorrowings emEmpBorrowings) throws URISyntaxException {
        log.debug("REST request to save EmEmpBorrowings : {}", emEmpBorrowings);
        if (emEmpBorrowings.getId() != null) {
            throw new BadRequestAlertException("A new emEmpBorrowings cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmEmpBorrowings result = emEmpBorrowingsRepository.save(emEmpBorrowings);
        return ResponseEntity.created(new URI("/api/em-emp-borrowings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /em-emp-borrowings : Updates an existing emEmpBorrowings.
     *
     * @param emEmpBorrowings the emEmpBorrowings to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emEmpBorrowings,
     * or with status 400 (Bad Request) if the emEmpBorrowings is not valid,
     * or with status 500 (Internal Server Error) if the emEmpBorrowings couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/em-emp-borrowings")
    @Timed
    public ResponseEntity<EmEmpBorrowings> updateEmEmpBorrowings(@Valid @RequestBody EmEmpBorrowings emEmpBorrowings) throws URISyntaxException {
        log.debug("REST request to update EmEmpBorrowings : {}", emEmpBorrowings);
        if (emEmpBorrowings.getId() == null) {
            return createEmEmpBorrowings(emEmpBorrowings);
        }
        EmEmpBorrowings result = emEmpBorrowingsRepository.save(emEmpBorrowings);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emEmpBorrowings.getId().toString()))
            .body(result);
    }

    /**
     * GET  /em-emp-borrowings : get all the emEmpBorrowings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of emEmpBorrowings in body
     */
    @GetMapping("/em-emp-borrowings")
    @Timed
    public List<EmEmpBorrowings> getAllEmEmpBorrowings() {
        log.debug("REST request to get all EmEmpBorrowings");
        return emEmpBorrowingsRepository.findAll();
        }

    /**
     * GET  /em-emp-borrowings/:id : get the "id" emEmpBorrowings.
     *
     * @param id the id of the emEmpBorrowings to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emEmpBorrowings, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-borrowings/{id}")
    @Timed
    public ResponseEntity<EmEmpBorrowings> getEmEmpBorrowings(@PathVariable Long id) {
        log.debug("REST request to get EmEmpBorrowings : {}", id);
        EmEmpBorrowings emEmpBorrowings = emEmpBorrowingsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmpBorrowings));
    }

    /**
     * GET  /em-emp-borrowings/employee/:id : get the borrowings by employee.
     *
     * @param id the employee id
     * @return the ResponseEntity with status 200 (OK) and with body the emEmpBorrowings, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-borrowings/employee/{id}")
    @Timed
    public ResponseEntity<List<EmEmpBorrowings>> getAllBorrowingsByEmployee(@PathVariable String id) {
        log.debug("REST request to get all Borrowings by employee");
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmpBorrowingsRepository.findByIdEmployee_IdOrderByDateFromDesc(Long.valueOf(id))));
    }

    /**
     * DELETE  /em-emp-borrowings/:id : delete the "id" emEmpBorrowings.
     *
     * @param id the id of the emEmpBorrowings to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/em-emp-borrowings/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmEmpBorrowings(@PathVariable Long id) {
        log.debug("REST request to delete EmEmpBorrowings : {}", id);
        emEmpBorrowingsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
