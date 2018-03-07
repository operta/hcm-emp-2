package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.EmBorrowingTypes;

import com.infostudio.ba.repository.EmBorrowingTypesRepository;
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
 * REST controller for managing EmBorrowingTypes.
 */
@RestController
@RequestMapping("/api")
public class EmBorrowingTypesResource {

    private final Logger log = LoggerFactory.getLogger(EmBorrowingTypesResource.class);

    private static final String ENTITY_NAME = "emBorrowingTypes";

    private final EmBorrowingTypesRepository emBorrowingTypesRepository;

    public EmBorrowingTypesResource(EmBorrowingTypesRepository emBorrowingTypesRepository) {
        this.emBorrowingTypesRepository = emBorrowingTypesRepository;
    }

    /**
     * POST  /em-borrowing-types : Create a new emBorrowingTypes.
     *
     * @param emBorrowingTypes the emBorrowingTypes to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emBorrowingTypes, or with status 400 (Bad Request) if the emBorrowingTypes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/em-borrowing-types")
    @Timed
    public ResponseEntity<EmBorrowingTypes> createEmBorrowingTypes(@Valid @RequestBody EmBorrowingTypes emBorrowingTypes) throws URISyntaxException {
        log.debug("REST request to save EmBorrowingTypes : {}", emBorrowingTypes);
        if (emBorrowingTypes.getId() != null) {
            throw new BadRequestAlertException("A new emBorrowingTypes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmBorrowingTypes result = emBorrowingTypesRepository.save(emBorrowingTypes);
        return ResponseEntity.created(new URI("/api/em-borrowing-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /em-borrowing-types : Updates an existing emBorrowingTypes.
     *
     * @param emBorrowingTypes the emBorrowingTypes to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emBorrowingTypes,
     * or with status 400 (Bad Request) if the emBorrowingTypes is not valid,
     * or with status 500 (Internal Server Error) if the emBorrowingTypes couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/em-borrowing-types")
    @Timed
    public ResponseEntity<EmBorrowingTypes> updateEmBorrowingTypes(@Valid @RequestBody EmBorrowingTypes emBorrowingTypes) throws URISyntaxException {
        log.debug("REST request to update EmBorrowingTypes : {}", emBorrowingTypes);
        if (emBorrowingTypes.getId() == null) {
            return createEmBorrowingTypes(emBorrowingTypes);
        }
        EmBorrowingTypes result = emBorrowingTypesRepository.save(emBorrowingTypes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emBorrowingTypes.getId().toString()))
            .body(result);
    }

    /**
     * GET  /em-borrowing-types : get all the emBorrowingTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of emBorrowingTypes in body
     */
    @GetMapping("/em-borrowing-types")
    @Timed
    public List<EmBorrowingTypes> getAllEmBorrowingTypes() {
        log.debug("REST request to get all EmBorrowingTypes");
        return emBorrowingTypesRepository.findAll();
        }

    /**
     * GET  /em-borrowing-types/:id : get the "id" emBorrowingTypes.
     *
     * @param id the id of the emBorrowingTypes to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emBorrowingTypes, or with status 404 (Not Found)
     */
    @GetMapping("/em-borrowing-types/{id}")
    @Timed
    public ResponseEntity<EmBorrowingTypes> getEmBorrowingTypes(@PathVariable Long id) {
        log.debug("REST request to get EmBorrowingTypes : {}", id);
        EmBorrowingTypes emBorrowingTypes = emBorrowingTypesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emBorrowingTypes));
    }

    /**
     * DELETE  /em-borrowing-types/:id : delete the "id" emBorrowingTypes.
     *
     * @param id the id of the emBorrowingTypes to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/em-borrowing-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmBorrowingTypes(@PathVariable Long id) {
        log.debug("REST request to delete EmBorrowingTypes : {}", id);
        emBorrowingTypesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
