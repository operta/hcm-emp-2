package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.EmEmpFamilies;
import com.infostudio.ba.domain.EmEmpIdentifications;

import com.infostudio.ba.repository.EmEmpIdentificationsRepository;
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
 * REST controller for managing EmEmpIdentifications.
 */
@RestController
@RequestMapping("/api")
public class EmEmpIdentificationsResource {

    private final Logger log = LoggerFactory.getLogger(EmEmpIdentificationsResource.class);

    private static final String ENTITY_NAME = "emEmpIdentifications";

    private final EmEmpIdentificationsRepository emEmpIdentificationsRepository;

    public EmEmpIdentificationsResource(EmEmpIdentificationsRepository emEmpIdentificationsRepository) {
        this.emEmpIdentificationsRepository = emEmpIdentificationsRepository;
    }

    /**
     * POST  /em-emp-identifications : Create a new emEmpIdentifications.
     *
     * @param emEmpIdentifications the emEmpIdentifications to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emEmpIdentifications, or with status 400 (Bad Request) if the emEmpIdentifications has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/em-emp-identifications")
    @Timed
    public ResponseEntity<EmEmpIdentifications> createEmEmpIdentifications(@Valid @RequestBody EmEmpIdentifications emEmpIdentifications) throws URISyntaxException {
        log.debug("REST request to save EmEmpIdentifications : {}", emEmpIdentifications);
        if (emEmpIdentifications.getId() != null) {
            throw new BadRequestAlertException("A new emEmpIdentifications cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmEmpIdentifications result = emEmpIdentificationsRepository.save(emEmpIdentifications);
        return ResponseEntity.created(new URI("/api/em-emp-identifications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /em-emp-identifications : Updates an existing emEmpIdentifications.
     *
     * @param emEmpIdentifications the emEmpIdentifications to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emEmpIdentifications,
     * or with status 400 (Bad Request) if the emEmpIdentifications is not valid,
     * or with status 500 (Internal Server Error) if the emEmpIdentifications couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/em-emp-identifications")
    @Timed
    public ResponseEntity<EmEmpIdentifications> updateEmEmpIdentifications(@Valid @RequestBody EmEmpIdentifications emEmpIdentifications) throws URISyntaxException {
        log.debug("REST request to update EmEmpIdentifications : {}", emEmpIdentifications);
        if (emEmpIdentifications.getId() == null) {
            return createEmEmpIdentifications(emEmpIdentifications);
        }
        EmEmpIdentifications result = emEmpIdentificationsRepository.save(emEmpIdentifications);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emEmpIdentifications.getId().toString()))
            .body(result);
    }

    /**
     * GET  /em-emp-identifications : get all the emEmpIdentifications.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of emEmpIdentifications in body
     */
    @GetMapping("/em-emp-identifications")
    @Timed
    public List<EmEmpIdentifications> getAllEmEmpIdentifications() {
        log.debug("REST request to get all EmEmpIdentifications");
        return emEmpIdentificationsRepository.findAll();
        }

    /**
     * GET  /em-emp-identifications/:id : get the "id" emEmpIdentifications.
     *
     * @param id the id of the emEmpIdentifications to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emEmpIdentifications, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-identifications/{id}")
    @Timed
    public ResponseEntity<EmEmpIdentifications> getEmEmpIdentifications(@PathVariable Long id) {
        log.debug("REST request to get EmEmpIdentifications : {}", id);
        EmEmpIdentifications emEmpIdentifications = emEmpIdentificationsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmpIdentifications));
    }

    /**
     * GET  /em-emp-identifications/employee/:id : get the identifications by employee.
     *
     * @param id the employee id
     * @return the ResponseEntity with status 200 (OK) and with body of Identifications Model, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-identifications/employee/{id}")
    @Timed
    public ResponseEntity<List<EmEmpIdentifications>> getAllIdentificationsByEmployee(@PathVariable String id) {
        log.debug("REST request to get all Identifications by employee");
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmpIdentificationsRepository.findByIdEmployee_Id(Long.valueOf(id))));
    }

    /**
     * DELETE  /em-emp-identifications/:id : delete the "id" emEmpIdentifications.
     *
     * @param id the id of the emEmpIdentifications to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/em-emp-identifications/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmEmpIdentifications(@PathVariable Long id) {
        log.debug("REST request to delete EmEmpIdentifications : {}", id);
        emEmpIdentificationsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
