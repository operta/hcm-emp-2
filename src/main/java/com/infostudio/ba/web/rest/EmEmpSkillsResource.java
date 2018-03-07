package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.EmEmpFamilies;
import com.infostudio.ba.domain.EmEmpSkills;

import com.infostudio.ba.repository.EmEmpSkillsRepository;
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
 * REST controller for managing EmEmpSkills.
 */
@RestController
@RequestMapping("/api")
public class EmEmpSkillsResource {

    private final Logger log = LoggerFactory.getLogger(EmEmpSkillsResource.class);

    private static final String ENTITY_NAME = "emEmpSkills";

    private final EmEmpSkillsRepository emEmpSkillsRepository;

    public EmEmpSkillsResource(EmEmpSkillsRepository emEmpSkillsRepository) {
        this.emEmpSkillsRepository = emEmpSkillsRepository;
    }

    /**
     * POST  /em-emp-skills : Create a new emEmpSkills.
     *
     * @param emEmpSkills the emEmpSkills to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emEmpSkills, or with status 400 (Bad Request) if the emEmpSkills has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/em-emp-skills")
    @Timed
    public ResponseEntity<EmEmpSkills> createEmEmpSkills(@RequestBody EmEmpSkills emEmpSkills) throws URISyntaxException {
        log.debug("REST request to save EmEmpSkills : {}", emEmpSkills);
        if (emEmpSkills.getId() != null) {
            throw new BadRequestAlertException("A new emEmpSkills cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmEmpSkills result = emEmpSkillsRepository.save(emEmpSkills);
        return ResponseEntity.created(new URI("/api/em-emp-skills/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /em-emp-skills : Updates an existing emEmpSkills.
     *
     * @param emEmpSkills the emEmpSkills to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emEmpSkills,
     * or with status 400 (Bad Request) if the emEmpSkills is not valid,
     * or with status 500 (Internal Server Error) if the emEmpSkills couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/em-emp-skills")
    @Timed
    public ResponseEntity<EmEmpSkills> updateEmEmpSkills(@RequestBody EmEmpSkills emEmpSkills) throws URISyntaxException {
        log.debug("REST request to update EmEmpSkills : {}", emEmpSkills);
        if (emEmpSkills.getId() == null) {
            return createEmEmpSkills(emEmpSkills);
        }
        EmEmpSkills result = emEmpSkillsRepository.save(emEmpSkills);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emEmpSkills.getId().toString()))
            .body(result);
    }

    /**
     * GET  /em-emp-skills : get all the emEmpSkills.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of emEmpSkills in body
     */
    @GetMapping("/em-emp-skills")
    @Timed
    public List<EmEmpSkills> getAllEmEmpSkills() {
        log.debug("REST request to get all EmEmpSkills");
        return emEmpSkillsRepository.findAll();
        }

    /**
     * GET  /em-emp-skills/:id : get the "id" emEmpSkills.
     *
     * @param id the id of the emEmpSkills to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emEmpSkills, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-skills/{id}")
    @Timed
    public ResponseEntity<EmEmpSkills> getEmEmpSkills(@PathVariable Long id) {
        log.debug("REST request to get EmEmpSkills : {}", id);
        EmEmpSkills emEmpSkills = emEmpSkillsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmpSkills));
    }


    /**
     * GET  /em-emp-skills/employee/:id : get the skills by employee.
     *
     * @param id the employee id
     * @return the ResponseEntity with status 200 (OK) and with body of Skills MOdel, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-skills/employee/{id}")
    @Timed
    public ResponseEntity<List<EmEmpSkills>> getAllSkillsByEmployee(@PathVariable String id) {
        log.debug("REST request to get all Skills by employee");
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmpSkillsRepository.findByIdEmployee_Id(Long.valueOf(id))));
    }

    /**
     * DELETE  /em-emp-skills/:id : delete the "id" emEmpSkills.
     *
     * @param id the id of the emEmpSkills to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/em-emp-skills/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmEmpSkills(@PathVariable Long id) {
        log.debug("REST request to delete EmEmpSkills : {}", id);
        emEmpSkillsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
