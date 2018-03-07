package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.EmInjuryTypes;

import com.infostudio.ba.repository.EmInjuryTypesRepository;
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
 * REST controller for managing EmInjuryTypes.
 */
@RestController
@RequestMapping("/api")
public class EmInjuryTypesResource {

    private final Logger log = LoggerFactory.getLogger(EmInjuryTypesResource.class);

    private static final String ENTITY_NAME = "emInjuryTypes";

    private final EmInjuryTypesRepository emInjuryTypesRepository;

    public EmInjuryTypesResource(EmInjuryTypesRepository emInjuryTypesRepository) {
        this.emInjuryTypesRepository = emInjuryTypesRepository;
    }

    /**
     * POST  /em-injury-types : Create a new emInjuryTypes.
     *
     * @param emInjuryTypes the emInjuryTypes to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emInjuryTypes, or with status 400 (Bad Request) if the emInjuryTypes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/em-injury-types")
    @Timed
    public ResponseEntity<EmInjuryTypes> createEmInjuryTypes(@Valid @RequestBody EmInjuryTypes emInjuryTypes) throws URISyntaxException {
        log.debug("REST request to save EmInjuryTypes : {}", emInjuryTypes);
        if (emInjuryTypes.getId() != null) {
            throw new BadRequestAlertException("A new emInjuryTypes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmInjuryTypes result = emInjuryTypesRepository.save(emInjuryTypes);
        return ResponseEntity.created(new URI("/api/em-injury-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /em-injury-types : Updates an existing emInjuryTypes.
     *
     * @param emInjuryTypes the emInjuryTypes to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emInjuryTypes,
     * or with status 400 (Bad Request) if the emInjuryTypes is not valid,
     * or with status 500 (Internal Server Error) if the emInjuryTypes couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/em-injury-types")
    @Timed
    public ResponseEntity<EmInjuryTypes> updateEmInjuryTypes(@Valid @RequestBody EmInjuryTypes emInjuryTypes) throws URISyntaxException {
        log.debug("REST request to update EmInjuryTypes : {}", emInjuryTypes);
        if (emInjuryTypes.getId() == null) {
            return createEmInjuryTypes(emInjuryTypes);
        }
        EmInjuryTypes result = emInjuryTypesRepository.save(emInjuryTypes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emInjuryTypes.getId().toString()))
            .body(result);
    }

    /**
     * GET  /em-injury-types : get all the emInjuryTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of emInjuryTypes in body
     */
    @GetMapping("/em-injury-types")
    @Timed
    public List<EmInjuryTypes> getAllEmInjuryTypes() {
        log.debug("REST request to get all EmInjuryTypes");
        return emInjuryTypesRepository.findAll();
        }

    /**
     * GET  /em-injury-types/:id : get the "id" emInjuryTypes.
     *
     * @param id the id of the emInjuryTypes to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emInjuryTypes, or with status 404 (Not Found)
     */
    @GetMapping("/em-injury-types/{id}")
    @Timed
    public ResponseEntity<EmInjuryTypes> getEmInjuryTypes(@PathVariable Long id) {
        log.debug("REST request to get EmInjuryTypes : {}", id);
        EmInjuryTypes emInjuryTypes = emInjuryTypesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emInjuryTypes));
    }

    /**
     * DELETE  /em-injury-types/:id : delete the "id" emInjuryTypes.
     *
     * @param id the id of the emInjuryTypes to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/em-injury-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmInjuryTypes(@PathVariable Long id) {
        log.debug("REST request to delete EmInjuryTypes : {}", id);
        emInjuryTypesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
