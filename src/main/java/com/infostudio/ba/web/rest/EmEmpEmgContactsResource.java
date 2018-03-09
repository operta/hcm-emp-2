package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.EmEmpEmgContacts;

import com.infostudio.ba.repository.EmEmpEmgContactsRepository;
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
 * REST controller for managing EmEmpEmgContacts.
 */
@RestController
@RequestMapping("/api")
public class EmEmpEmgContactsResource {

    private final Logger log = LoggerFactory.getLogger(EmEmpEmgContactsResource.class);

    private static final String ENTITY_NAME = "emEmpEmgContacts";

    private final EmEmpEmgContactsRepository emEmpEmgContactsRepository;

    public EmEmpEmgContactsResource(EmEmpEmgContactsRepository emEmpEmgContactsRepository) {
        this.emEmpEmgContactsRepository = emEmpEmgContactsRepository;
    }

    /**
     * POST  /em-emp-emg-contacts : Create a new emEmpEmgContacts.
     *
     * @param emEmpEmgContacts the emEmpEmgContacts to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emEmpEmgContacts, or with status 400 (Bad Request) if the emEmpEmgContacts has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/em-emp-emg-contacts")
    @Timed
    public ResponseEntity<EmEmpEmgContacts> createEmEmpEmgContacts(@RequestBody EmEmpEmgContacts emEmpEmgContacts) throws URISyntaxException {
        log.debug("REST request to save EmEmpEmgContacts : {}", emEmpEmgContacts);
        if (emEmpEmgContacts.getId() != null) {
            throw new BadRequestAlertException("A new emEmpEmgContacts cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmEmpEmgContacts result = emEmpEmgContactsRepository.save(emEmpEmgContacts);
        return ResponseEntity.created(new URI("/api/em-emp-emg-contacts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /em-emp-emg-contacts : Updates an existing emEmpEmgContacts.
     *
     * @param emEmpEmgContacts the emEmpEmgContacts to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emEmpEmgContacts,
     * or with status 400 (Bad Request) if the emEmpEmgContacts is not valid,
     * or with status 500 (Internal Server Error) if the emEmpEmgContacts couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/em-emp-emg-contacts")
    @Timed
    public ResponseEntity<EmEmpEmgContacts> updateEmEmpEmgContacts(@RequestBody EmEmpEmgContacts emEmpEmgContacts) throws URISyntaxException {
        log.debug("REST request to update EmEmpEmgContacts : {}", emEmpEmgContacts);
        if (emEmpEmgContacts.getId() == null) {
            return createEmEmpEmgContacts(emEmpEmgContacts);
        }
        EmEmpEmgContacts result = emEmpEmgContactsRepository.save(emEmpEmgContacts);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emEmpEmgContacts.getId().toString()))
            .body(result);
    }

    /**
     * GET  /em-emp-emg-contacts : get all the emEmpEmgContacts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of emEmpEmgContacts in body
     */
    @GetMapping("/em-emp-emg-contacts")
    @Timed
    public List<EmEmpEmgContacts> getAllEmEmpEmgContacts() {
        log.debug("REST request to get all EmEmpEmgContacts");
        return emEmpEmgContactsRepository.findAll();
        }

    /**
     * GET  /em-emp-emg-contacts/:id : get the "id" emEmpEmgContacts.
     *
     * @param id the id of the emEmpEmgContacts to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emEmpEmgContacts, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-emg-contacts/{id}")
    @Timed
    public ResponseEntity<EmEmpEmgContacts> getEmEmpEmgContacts(@PathVariable Long id) {
        log.debug("REST request to get EmEmpEmgContacts : {}", id);
        EmEmpEmgContacts emEmpEmgContacts = emEmpEmgContactsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmpEmgContacts));
    }

    /**
     * GET  /em-emp-emg-contacts/employee/:id : get the "id" emEmpEmgContacts by employee.
     *
     * @param id the id of the emEmpEmgContacts to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emEmpEmgContacts, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-emg-contacts/employee/{id}")
    @Timed
    public ResponseEntity<List<EmEmpEmgContacts>> getEmergencyContactsByEmployee(@PathVariable Long id) {
        log.debug("REST request to get EmEmpEmgContacts : {}", id);
        List<EmEmpEmgContacts> emEmpEmgContacts = emEmpEmgContactsRepository.findByIdEmployeeId(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmpEmgContacts));
    }

    /**
     * DELETE  /em-emp-emg-contacts/:id : delete the "id" emEmpEmgContacts.
     *
     * @param id the id of the emEmpEmgContacts to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/em-emp-emg-contacts/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmEmpEmgContacts(@PathVariable Long id) {
        log.debug("REST request to delete EmEmpEmgContacts : {}", id);
        emEmpEmgContactsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
