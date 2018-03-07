package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.EmEmpFamilies;
import com.infostudio.ba.domain.EmEmpInjuries;

import com.infostudio.ba.repository.EmEmpInjuriesRepository;
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
 * REST controller for managing EmEmpInjuries.
 */
@RestController
@RequestMapping("/api")
public class EmEmpInjuriesResource {

    private final Logger log = LoggerFactory.getLogger(EmEmpInjuriesResource.class);

    private static final String ENTITY_NAME = "emEmpInjuries";

    private final EmEmpInjuriesRepository emEmpInjuriesRepository;

    public EmEmpInjuriesResource(EmEmpInjuriesRepository emEmpInjuriesRepository) {
        this.emEmpInjuriesRepository = emEmpInjuriesRepository;
    }

    /**
     * POST  /em-emp-injuries : Create a new emEmpInjuries.
     *
     * @param emEmpInjuries the emEmpInjuries to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emEmpInjuries, or with status 400 (Bad Request) if the emEmpInjuries has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/em-emp-injuries")
    @Timed
    public ResponseEntity<EmEmpInjuries> createEmEmpInjuries(@RequestBody EmEmpInjuries emEmpInjuries) throws URISyntaxException {
        log.debug("REST request to save EmEmpInjuries : {}", emEmpInjuries);
        if (emEmpInjuries.getId() != null) {
            throw new BadRequestAlertException("A new emEmpInjuries cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmEmpInjuries result = emEmpInjuriesRepository.save(emEmpInjuries);
        return ResponseEntity.created(new URI("/api/em-emp-injuries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /em-emp-injuries : Updates an existing emEmpInjuries.
     *
     * @param emEmpInjuries the emEmpInjuries to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emEmpInjuries,
     * or with status 400 (Bad Request) if the emEmpInjuries is not valid,
     * or with status 500 (Internal Server Error) if the emEmpInjuries couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/em-emp-injuries")
    @Timed
    public ResponseEntity<EmEmpInjuries> updateEmEmpInjuries(@RequestBody EmEmpInjuries emEmpInjuries) throws URISyntaxException {
        log.debug("REST request to update EmEmpInjuries : {}", emEmpInjuries);
        if (emEmpInjuries.getId() == null) {
            return createEmEmpInjuries(emEmpInjuries);
        }
        EmEmpInjuries result = emEmpInjuriesRepository.save(emEmpInjuries);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emEmpInjuries.getId().toString()))
            .body(result);
    }

    /**
     * GET  /em-emp-injuries : get all the emEmpInjuries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of emEmpInjuries in body
     */
    @GetMapping("/em-emp-injuries")
    @Timed
    public List<EmEmpInjuries> getAllEmEmpInjuries() {
        log.debug("REST request to get all EmEmpInjuries");
        return emEmpInjuriesRepository.findAll();
        }

    /**
     * GET  /em-emp-injuries/:id : get the "id" emEmpInjuries.
     *
     * @param id the id of the emEmpInjuries to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emEmpInjuries, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-injuries/{id}")
    @Timed
    public ResponseEntity<EmEmpInjuries> getEmEmpInjuries(@PathVariable Long id) {
        log.debug("REST request to get EmEmpInjuries : {}", id);
        EmEmpInjuries emEmpInjuries = emEmpInjuriesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmpInjuries));
    }

    /**
     * GET  /em-emp-injuries/employee/:id : get the injuries by employee.
     *
     * @param id the employee id
     * @return the ResponseEntity with status 200 (OK) and with body of InjuriesModel, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-injuries/employee/{id}")
    @Timed
    public ResponseEntity<List<EmEmpInjuries>> getAllInjuriesByEmployee(@PathVariable String id) {
        log.debug("REST request to get all Injuries by employee");
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmpInjuriesRepository.findByIdEmployee_Id(Long.valueOf(id))));
    }

    /**
     * DELETE  /em-emp-injuries/:id : delete the "id" emEmpInjuries.
     *
     * @param id the id of the emEmpInjuries to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/em-emp-injuries/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmEmpInjuries(@PathVariable Long id) {
        log.debug("REST request to delete EmEmpInjuries : {}", id);
        emEmpInjuriesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
