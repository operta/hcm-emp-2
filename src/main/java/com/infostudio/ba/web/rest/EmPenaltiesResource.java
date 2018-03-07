package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.EmEmpFamilies;
import com.infostudio.ba.domain.EmPenalties;

import com.infostudio.ba.repository.EmPenaltiesRepository;
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
 * REST controller for managing EmPenalties.
 */
@RestController
@RequestMapping("/api")
public class EmPenaltiesResource {

    private final Logger log = LoggerFactory.getLogger(EmPenaltiesResource.class);

    private static final String ENTITY_NAME = "emPenalties";

    private final EmPenaltiesRepository emPenaltiesRepository;

    public EmPenaltiesResource(EmPenaltiesRepository emPenaltiesRepository) {
        this.emPenaltiesRepository = emPenaltiesRepository;
    }

    /**
     * POST  /em-penalties : Create a new emPenalties.
     *
     * @param emPenalties the emPenalties to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emPenalties, or with status 400 (Bad Request) if the emPenalties has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/em-penalties")
    @Timed
    public ResponseEntity<EmPenalties> createEmPenalties(@RequestBody EmPenalties emPenalties) throws URISyntaxException {
        log.debug("REST request to save EmPenalties : {}", emPenalties);
        if (emPenalties.getId() != null) {
            throw new BadRequestAlertException("A new emPenalties cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmPenalties result = emPenaltiesRepository.save(emPenalties);
        return ResponseEntity.created(new URI("/api/em-penalties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /em-penalties : Updates an existing emPenalties.
     *
     * @param emPenalties the emPenalties to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emPenalties,
     * or with status 400 (Bad Request) if the emPenalties is not valid,
     * or with status 500 (Internal Server Error) if the emPenalties couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/em-penalties")
    @Timed
    public ResponseEntity<EmPenalties> updateEmPenalties(@RequestBody EmPenalties emPenalties) throws URISyntaxException {
        log.debug("REST request to update EmPenalties : {}", emPenalties);
        if (emPenalties.getId() == null) {
            return createEmPenalties(emPenalties);
        }
        EmPenalties result = emPenaltiesRepository.save(emPenalties);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emPenalties.getId().toString()))
            .body(result);
    }

    /**
     * GET  /em-penalties : get all the emPenalties.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of emPenalties in body
     */
    @GetMapping("/em-penalties")
    @Timed
    public List<EmPenalties> getAllEmPenalties() {
        log.debug("REST request to get all EmPenalties");
        return emPenaltiesRepository.findAll();
        }

    /**
     * GET  /em-penalties/:id : get the "id" emPenalties.
     *
     * @param id the id of the emPenalties to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emPenalties, or with status 404 (Not Found)
     */
    @GetMapping("/em-penalties/{id}")
    @Timed
    public ResponseEntity<EmPenalties> getEmPenalties(@PathVariable Long id) {
        log.debug("REST request to get EmPenalties : {}", id);
        EmPenalties emPenalties = emPenaltiesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emPenalties));
    }


    /**
     * GET  /em-emp-penalties/employee/:id : get the penalties by employee.
     *
     * @param id the employee id
     * @return the ResponseEntity with status 200 (OK) and with body of Penalties Model, or with status 404 (Not Found)
     */
    @GetMapping("/em-penalties/employee/{id}")
    @Timed
    public ResponseEntity<List<EmPenalties>> getAllPenaltiesByEmployee(@PathVariable String id) {
        log.debug("REST request to get all Penalties by employee");
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emPenaltiesRepository.findByIdEmployee_Id(Long.valueOf(id))));
    }

    /**
     * DELETE  /em-penalties/:id : delete the "id" emPenalties.
     *
     * @param id the id of the emPenalties to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/em-penalties/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmPenalties(@PathVariable Long id) {
        log.debug("REST request to delete EmPenalties : {}", id);
        emPenaltiesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
