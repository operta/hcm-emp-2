package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.EmEmpOrgWorkPlaces;

import com.infostudio.ba.domain.EmEmployees;
import com.infostudio.ba.repository.EmEmpOrgWorkPlacesRepository;
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
 * REST controller for managing EmEmpOrgWorkPlaces.
 */
@RestController
@RequestMapping("/api")
public class EmEmpOrgWorkPlacesResource {

    private final Logger log = LoggerFactory.getLogger(EmEmpOrgWorkPlacesResource.class);

    private static final String ENTITY_NAME = "emEmpOrgWorkPlaces";

    private final EmEmpOrgWorkPlacesRepository emEmpOrgWorkPlacesRepository;

    public EmEmpOrgWorkPlacesResource(EmEmpOrgWorkPlacesRepository emEmpOrgWorkPlacesRepository) {
        this.emEmpOrgWorkPlacesRepository = emEmpOrgWorkPlacesRepository;
    }

    /**
     * POST  /em-emp-org-work-places : Create a new emEmpOrgWorkPlaces.
     *
     * @param emEmpOrgWorkPlaces the emEmpOrgWorkPlaces to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emEmpOrgWorkPlaces, or with status 400 (Bad Request) if the emEmpOrgWorkPlaces has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/em-emp-org-work-places")
    @Timed
    public ResponseEntity<EmEmpOrgWorkPlaces> createEmEmpOrgWorkPlaces(@Valid @RequestBody EmEmpOrgWorkPlaces emEmpOrgWorkPlaces) throws URISyntaxException {
        log.debug("REST request to save EmEmpOrgWorkPlaces : {}", emEmpOrgWorkPlaces);
        if (emEmpOrgWorkPlaces.getId() != null) {
            throw new BadRequestAlertException("A new emEmpOrgWorkPlaces cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmEmpOrgWorkPlaces result = emEmpOrgWorkPlacesRepository.save(emEmpOrgWorkPlaces);
        return ResponseEntity.created(new URI("/api/em-emp-org-work-places/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /em-emp-org-work-places : Updates an existing emEmpOrgWorkPlaces.
     *
     * @param emEmpOrgWorkPlaces the emEmpOrgWorkPlaces to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emEmpOrgWorkPlaces,
     * or with status 400 (Bad Request) if the emEmpOrgWorkPlaces is not valid,
     * or with status 500 (Internal Server Error) if the emEmpOrgWorkPlaces couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/em-emp-org-work-places")
    @Timed
    public ResponseEntity<EmEmpOrgWorkPlaces> updateEmEmpOrgWorkPlaces(@Valid @RequestBody EmEmpOrgWorkPlaces emEmpOrgWorkPlaces) throws URISyntaxException {
        log.debug("REST request to update EmEmpOrgWorkPlaces : {}", emEmpOrgWorkPlaces);
        if (emEmpOrgWorkPlaces.getId() == null) {
            return createEmEmpOrgWorkPlaces(emEmpOrgWorkPlaces);
        }
        EmEmpOrgWorkPlaces result = emEmpOrgWorkPlacesRepository.save(emEmpOrgWorkPlaces);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emEmpOrgWorkPlaces.getId().toString()))
            .body(result);
    }

    /**
     * GET  /em-emp-org-work-places : get all the emEmpOrgWorkPlaces.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of emEmpOrgWorkPlaces in body
     */
    @GetMapping("/em-emp-org-work-places")
    @Timed
    public ResponseEntity<List<EmEmpOrgWorkPlaces>> getAllEmEmpOrgWorkPlaces(Pageable pageable) {
        log.debug("REST request to get a page of EmEmpOrgWorkPlaces");
        Page<EmEmpOrgWorkPlaces> page = emEmpOrgWorkPlacesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/em-emp-org-work-places");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /em-emp-org-work-places/:id : get the "id" emEmpOrgWorkPlaces.
     *
     * @param id the id of the emEmpOrgWorkPlaces to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emEmpOrgWorkPlaces, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-org-work-places/{id}")
    @Timed
    public ResponseEntity<EmEmpOrgWorkPlaces> getEmEmpOrgWorkPlaces(@PathVariable Long id) {
        log.debug("REST request to get EmEmpOrgWorkPlaces : {}", id);
        EmEmpOrgWorkPlaces emEmpOrgWorkPlaces = emEmpOrgWorkPlacesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmpOrgWorkPlaces));
    }


    /**
     * GET  /em-emp-org-work-places/employee/:id : get the "id" emEmpOrgWorkPlaces.
     *
     * @param id the employee id of the emEmpOrgWorkPlaces to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emEmpOrgWorkPlaces, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-org-work-places/employee/{id}")
    @Timed
    @ResponseStatus(value = HttpStatus.OK)
    public EmEmpOrgWorkPlaces getLastEmployeeWorkPlace(@PathVariable Long id) {
        log.debug("REST request to get last employee work place : {}", id);
        EmEmpOrgWorkPlaces emEmpOrgWorkPlaces = emEmpOrgWorkPlacesRepository.findTopByIdEmployeeIdOrderByDateFromDesc(id);
        return emEmpOrgWorkPlaces;
    }

    /**
     * DELETE  /em-emp-org-work-places/:id : delete the "id" emEmpOrgWorkPlaces.
     *
     * @param id the id of the emEmpOrgWorkPlaces to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/em-emp-org-work-places/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmEmpOrgWorkPlaces(@PathVariable Long id) {
        log.debug("REST request to delete EmEmpOrgWorkPlaces : {}", id);
        emEmpOrgWorkPlacesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
