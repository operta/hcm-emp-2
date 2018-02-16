package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.EmEmpPreviousJobs;

import com.infostudio.ba.repository.EmEmpPreviousJobsRepository;
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
 * REST controller for managing EmEmpPreviousJobs.
 */
@RestController
@RequestMapping("/api")
public class EmEmpPreviousJobsResource {

    private final Logger log = LoggerFactory.getLogger(EmEmpPreviousJobsResource.class);

    private static final String ENTITY_NAME = "emEmpPreviousJobs";

    private final EmEmpPreviousJobsRepository emEmpPreviousJobsRepository;

    public EmEmpPreviousJobsResource(EmEmpPreviousJobsRepository emEmpPreviousJobsRepository) {
        this.emEmpPreviousJobsRepository = emEmpPreviousJobsRepository;
    }

    /**
     * POST  /em-emp-previous-jobs : Create a new emEmpPreviousJobs.
     *
     * @param emEmpPreviousJobs the emEmpPreviousJobs to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emEmpPreviousJobs, or with status 400 (Bad Request) if the emEmpPreviousJobs has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/em-emp-previous-jobs")
    @Timed
    public ResponseEntity<EmEmpPreviousJobs> createEmEmpPreviousJobs(@Valid @RequestBody EmEmpPreviousJobs emEmpPreviousJobs) throws URISyntaxException {
        log.debug("REST request to save EmEmpPreviousJobs : {}", emEmpPreviousJobs);
        if (emEmpPreviousJobs.getId() != null) {
            throw new BadRequestAlertException("A new emEmpPreviousJobs cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmEmpPreviousJobs result = emEmpPreviousJobsRepository.save(emEmpPreviousJobs);
        return ResponseEntity.created(new URI("/api/em-emp-previous-jobs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /em-emp-previous-jobs : Updates an existing emEmpPreviousJobs.
     *
     * @param emEmpPreviousJobs the emEmpPreviousJobs to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emEmpPreviousJobs,
     * or with status 400 (Bad Request) if the emEmpPreviousJobs is not valid,
     * or with status 500 (Internal Server Error) if the emEmpPreviousJobs couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/em-emp-previous-jobs")
    @Timed
    public ResponseEntity<EmEmpPreviousJobs> updateEmEmpPreviousJobs(@Valid @RequestBody EmEmpPreviousJobs emEmpPreviousJobs) throws URISyntaxException {
        log.debug("REST request to update EmEmpPreviousJobs : {}", emEmpPreviousJobs);
        if (emEmpPreviousJobs.getId() == null) {
            return createEmEmpPreviousJobs(emEmpPreviousJobs);
        }
        EmEmpPreviousJobs result = emEmpPreviousJobsRepository.save(emEmpPreviousJobs);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emEmpPreviousJobs.getId().toString()))
            .body(result);
    }

    /**
     * GET  /em-emp-previous-jobs : get all the emEmpPreviousJobs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of emEmpPreviousJobs in body
     */
    @GetMapping("/em-emp-previous-jobs")
    @Timed
    public List<EmEmpPreviousJobs> getAllEmEmpPreviousJobs() {
        log.debug("REST request to get all EmEmpPreviousJobs");
        return emEmpPreviousJobsRepository.findAll();
        }

    /**
     * GET  /em-emp-previous-jobs/:id : get the "id" emEmpPreviousJobs.
     *
     * @param id the id of the emEmpPreviousJobs to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emEmpPreviousJobs, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-previous-jobs/{id}")
    @Timed
    public ResponseEntity<EmEmpPreviousJobs> getEmEmpPreviousJobs(@PathVariable Long id) {
        log.debug("REST request to get EmEmpPreviousJobs : {}", id);
        EmEmpPreviousJobs emEmpPreviousJobs = emEmpPreviousJobsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmpPreviousJobs));
    }

    /**
     * GET  /em-emp-previous-jobs/employee/:id : get all the emEmpPreviousJobs based on employee id.
     *
     * @param id the id of the emEmployees which the previous jobs belong to
     * @return the ResponseEntity with status 200 (OK) and the list of emEmpPreviousJobs in body
     */
    @GetMapping("/em-emp-previous-jobs/employee/{id}")
    @Timed
    public List<EmEmpPreviousJobs> getAllEmEmpPreviousJobs(@PathVariable String id) {
        log.debug("REST request to get all EmEmpPreviousJobs");
        return emEmpPreviousJobsRepository.findAllByIdEmployee_IdOrderByDateFromDesc(Long.valueOf(id));
    }


    /**
     * DELETE  /em-emp-previous-jobs/:id : delete the "id" emEmpPreviousJobs.
     *
     * @param id the id of the emEmpPreviousJobs to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/em-emp-previous-jobs/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmEmpPreviousJobs(@PathVariable Long id) {
        log.debug("REST request to delete EmEmpPreviousJobs : {}", id);
        emEmpPreviousJobsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
