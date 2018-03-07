package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.RgSkillGrades;

import com.infostudio.ba.repository.RgSkillGradesRepository;
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
 * REST controller for managing RgSkillGrades.
 */
@RestController
@RequestMapping("/api")
public class RgSkillGradesResource {

    private final Logger log = LoggerFactory.getLogger(RgSkillGradesResource.class);

    private static final String ENTITY_NAME = "rgSkillGrades";

    private final RgSkillGradesRepository rgSkillGradesRepository;

    public RgSkillGradesResource(RgSkillGradesRepository rgSkillGradesRepository) {
        this.rgSkillGradesRepository = rgSkillGradesRepository;
    }

    /**
     * POST  /rg-skill-grades : Create a new rgSkillGrades.
     *
     * @param rgSkillGrades the rgSkillGrades to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rgSkillGrades, or with status 400 (Bad Request) if the rgSkillGrades has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rg-skill-grades")
    @Timed
    public ResponseEntity<RgSkillGrades> createRgSkillGrades(@Valid @RequestBody RgSkillGrades rgSkillGrades) throws URISyntaxException {
        log.debug("REST request to save RgSkillGrades : {}", rgSkillGrades);
        if (rgSkillGrades.getId() != null) {
            throw new BadRequestAlertException("A new rgSkillGrades cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RgSkillGrades result = rgSkillGradesRepository.save(rgSkillGrades);
        return ResponseEntity.created(new URI("/api/rg-skill-grades/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rg-skill-grades : Updates an existing rgSkillGrades.
     *
     * @param rgSkillGrades the rgSkillGrades to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rgSkillGrades,
     * or with status 400 (Bad Request) if the rgSkillGrades is not valid,
     * or with status 500 (Internal Server Error) if the rgSkillGrades couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rg-skill-grades")
    @Timed
    public ResponseEntity<RgSkillGrades> updateRgSkillGrades(@Valid @RequestBody RgSkillGrades rgSkillGrades) throws URISyntaxException {
        log.debug("REST request to update RgSkillGrades : {}", rgSkillGrades);
        if (rgSkillGrades.getId() == null) {
            return createRgSkillGrades(rgSkillGrades);
        }
        RgSkillGrades result = rgSkillGradesRepository.save(rgSkillGrades);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rgSkillGrades.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rg-skill-grades : get all the rgSkillGrades.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of rgSkillGrades in body
     */
    @GetMapping("/rg-skill-grades")
    @Timed
    public List<RgSkillGrades> getAllRgSkillGrades() {
        log.debug("REST request to get all RgSkillGrades");
        return rgSkillGradesRepository.findAll();
        }

    /**
     * GET  /rg-skill-grades/:id : get the "id" rgSkillGrades.
     *
     * @param id the id of the rgSkillGrades to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rgSkillGrades, or with status 404 (Not Found)
     */
    @GetMapping("/rg-skill-grades/{id}")
    @Timed
    public ResponseEntity<RgSkillGrades> getRgSkillGrades(@PathVariable Long id) {
        log.debug("REST request to get RgSkillGrades : {}", id);
        RgSkillGrades rgSkillGrades = rgSkillGradesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(rgSkillGrades));
    }

    /**
     * DELETE  /rg-skill-grades/:id : delete the "id" rgSkillGrades.
     *
     * @param id the id of the rgSkillGrades to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rg-skill-grades/{id}")
    @Timed
    public ResponseEntity<Void> deleteRgSkillGrades(@PathVariable Long id) {
        log.debug("REST request to delete RgSkillGrades : {}", id);
        rgSkillGradesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
