package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.EmEmpBorrowings;
import com.infostudio.ba.domain.EmEmpFamilies;

import com.infostudio.ba.repository.EmEmpFamiliesRepository;
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
 * REST controller for managing EmEmpFamilies.
 */
@RestController
@RequestMapping("/api")
public class EmEmpFamiliesResource {

    private final Logger log = LoggerFactory.getLogger(EmEmpFamiliesResource.class);

    private static final String ENTITY_NAME = "emEmpFamilies";

    private final EmEmpFamiliesRepository emEmpFamiliesRepository;

    public EmEmpFamiliesResource(EmEmpFamiliesRepository emEmpFamiliesRepository) {
        this.emEmpFamiliesRepository = emEmpFamiliesRepository;
    }

    /**
     * POST  /em-emp-families : Create a new emEmpFamilies.
     *
     * @param emEmpFamilies the emEmpFamilies to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emEmpFamilies, or with status 400 (Bad Request) if the emEmpFamilies has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/em-emp-families")
    @Timed
    public ResponseEntity<EmEmpFamilies> createEmEmpFamilies(@Valid @RequestBody EmEmpFamilies emEmpFamilies) throws URISyntaxException {
        log.debug("REST request to save EmEmpFamilies : {}", emEmpFamilies);
        if (emEmpFamilies.getId() != null) {
            throw new BadRequestAlertException("A new emEmpFamilies cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmEmpFamilies result = emEmpFamiliesRepository.save(emEmpFamilies);
        return ResponseEntity.created(new URI("/api/em-emp-families/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /em-emp-families : Updates an existing emEmpFamilies.
     *
     * @param emEmpFamilies the emEmpFamilies to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emEmpFamilies,
     * or with status 400 (Bad Request) if the emEmpFamilies is not valid,
     * or with status 500 (Internal Server Error) if the emEmpFamilies couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/em-emp-families")
    @Timed
    public ResponseEntity<EmEmpFamilies> updateEmEmpFamilies(@Valid @RequestBody EmEmpFamilies emEmpFamilies) throws URISyntaxException {
        log.debug("REST request to update EmEmpFamilies : {}", emEmpFamilies);
        if (emEmpFamilies.getId() == null) {
            return createEmEmpFamilies(emEmpFamilies);
        }
        EmEmpFamilies result = emEmpFamiliesRepository.save(emEmpFamilies);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emEmpFamilies.getId().toString()))
            .body(result);
    }

    /**
     * GET  /em-emp-families : get all the emEmpFamilies.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of emEmpFamilies in body
     */
    @GetMapping("/em-emp-families")
    @Timed
    public List<EmEmpFamilies> getAllEmEmpFamilies() {
        log.debug("REST request to get all EmEmpFamilies");
        return emEmpFamiliesRepository.findAll();
        }

    /**
     * GET  /em-emp-families/:id : get the "id" emEmpFamilies.
     *
     * @param id the id of the emEmpFamilies to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emEmpFamilies, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-families/{id}")
    @Timed
    public ResponseEntity<EmEmpFamilies> getEmEmpFamilies(@PathVariable Long id) {
        log.debug("REST request to get EmEmpFamilies : {}", id);
        EmEmpFamilies emEmpFamilies = emEmpFamiliesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmpFamilies));
    }

    /**
     * GET  /em-emp-families/employee/:id : get the families by employee.
     *
     * @param id the employee id
     * @return the ResponseEntity with status 200 (OK) and with body of FamiliesModel, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-families/employee/{id}")
    @Timed
    public ResponseEntity<List<EmEmpFamilies>> getAllFamiliesByEmployee(@PathVariable String id) {
        log.debug("REST request to get all Families by employee");
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmpFamiliesRepository.findByIdEmployee_Id(Long.valueOf(id))));
    }


    /**
     * DELETE  /em-emp-families/:id : delete the "id" emEmpFamilies.
     *
     * @param id the id of the emEmpFamilies to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/em-emp-families/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmEmpFamilies(@PathVariable Long id) {
        log.debug("REST request to delete EmEmpFamilies : {}", id);
        emEmpFamiliesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
