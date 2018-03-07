package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.EmRewardTypes;

import com.infostudio.ba.repository.EmRewardTypesRepository;
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
 * REST controller for managing EmRewardTypes.
 */
@RestController
@RequestMapping("/api")
public class EmRewardTypesResource {

    private final Logger log = LoggerFactory.getLogger(EmRewardTypesResource.class);

    private static final String ENTITY_NAME = "emRewardTypes";

    private final EmRewardTypesRepository emRewardTypesRepository;

    public EmRewardTypesResource(EmRewardTypesRepository emRewardTypesRepository) {
        this.emRewardTypesRepository = emRewardTypesRepository;
    }

    /**
     * POST  /em-reward-types : Create a new emRewardTypes.
     *
     * @param emRewardTypes the emRewardTypes to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emRewardTypes, or with status 400 (Bad Request) if the emRewardTypes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/em-reward-types")
    @Timed
    public ResponseEntity<EmRewardTypes> createEmRewardTypes(@Valid @RequestBody EmRewardTypes emRewardTypes) throws URISyntaxException {
        log.debug("REST request to save EmRewardTypes : {}", emRewardTypes);
        if (emRewardTypes.getId() != null) {
            throw new BadRequestAlertException("A new emRewardTypes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmRewardTypes result = emRewardTypesRepository.save(emRewardTypes);
        return ResponseEntity.created(new URI("/api/em-reward-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /em-reward-types : Updates an existing emRewardTypes.
     *
     * @param emRewardTypes the emRewardTypes to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emRewardTypes,
     * or with status 400 (Bad Request) if the emRewardTypes is not valid,
     * or with status 500 (Internal Server Error) if the emRewardTypes couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/em-reward-types")
    @Timed
    public ResponseEntity<EmRewardTypes> updateEmRewardTypes(@Valid @RequestBody EmRewardTypes emRewardTypes) throws URISyntaxException {
        log.debug("REST request to update EmRewardTypes : {}", emRewardTypes);
        if (emRewardTypes.getId() == null) {
            return createEmRewardTypes(emRewardTypes);
        }
        EmRewardTypes result = emRewardTypesRepository.save(emRewardTypes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emRewardTypes.getId().toString()))
            .body(result);
    }

    /**
     * GET  /em-reward-types : get all the emRewardTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of emRewardTypes in body
     */
    @GetMapping("/em-reward-types")
    @Timed
    public List<EmRewardTypes> getAllEmRewardTypes() {
        log.debug("REST request to get all EmRewardTypes");
        return emRewardTypesRepository.findAll();
        }

    /**
     * GET  /em-reward-types/:id : get the "id" emRewardTypes.
     *
     * @param id the id of the emRewardTypes to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emRewardTypes, or with status 404 (Not Found)
     */
    @GetMapping("/em-reward-types/{id}")
    @Timed
    public ResponseEntity<EmRewardTypes> getEmRewardTypes(@PathVariable Long id) {
        log.debug("REST request to get EmRewardTypes : {}", id);
        EmRewardTypes emRewardTypes = emRewardTypesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emRewardTypes));
    }

    /**
     * DELETE  /em-reward-types/:id : delete the "id" emRewardTypes.
     *
     * @param id the id of the emRewardTypes to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/em-reward-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmRewardTypes(@PathVariable Long id) {
        log.debug("REST request to delete EmRewardTypes : {}", id);
        emRewardTypesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
