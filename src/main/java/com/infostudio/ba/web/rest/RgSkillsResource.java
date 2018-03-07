package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.RgSkills;

import com.infostudio.ba.repository.RgSkillsRepository;
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
 * REST controller for managing RgSkills.
 */
@RestController
@RequestMapping("/api")
public class RgSkillsResource {

    private final Logger log = LoggerFactory.getLogger(RgSkillsResource.class);

    private static final String ENTITY_NAME = "rgSkills";

    private final RgSkillsRepository rgSkillsRepository;

    public RgSkillsResource(RgSkillsRepository rgSkillsRepository) {
        this.rgSkillsRepository = rgSkillsRepository;
    }

    /**
     * POST  /rg-skills : Create a new rgSkills.
     *
     * @param rgSkills the rgSkills to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rgSkills, or with status 400 (Bad Request) if the rgSkills has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rg-skills")
    @Timed
    public ResponseEntity<RgSkills> createRgSkills(@Valid @RequestBody RgSkills rgSkills) throws URISyntaxException {
        log.debug("REST request to save RgSkills : {}", rgSkills);
        if (rgSkills.getId() != null) {
            throw new BadRequestAlertException("A new rgSkills cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RgSkills result = rgSkillsRepository.save(rgSkills);
        return ResponseEntity.created(new URI("/api/rg-skills/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rg-skills : Updates an existing rgSkills.
     *
     * @param rgSkills the rgSkills to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rgSkills,
     * or with status 400 (Bad Request) if the rgSkills is not valid,
     * or with status 500 (Internal Server Error) if the rgSkills couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rg-skills")
    @Timed
    public ResponseEntity<RgSkills> updateRgSkills(@Valid @RequestBody RgSkills rgSkills) throws URISyntaxException {
        log.debug("REST request to update RgSkills : {}", rgSkills);
        if (rgSkills.getId() == null) {
            return createRgSkills(rgSkills);
        }
        RgSkills result = rgSkillsRepository.save(rgSkills);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rgSkills.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rg-skills : get all the rgSkills.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of rgSkills in body
     */
    @GetMapping("/rg-skills")
    @Timed
    public List<RgSkills> getAllRgSkills() {
        log.debug("REST request to get all RgSkills");
        return rgSkillsRepository.findAll();
        }

    /**
     * GET  /rg-skills/:id : get the "id" rgSkills.
     *
     * @param id the id of the rgSkills to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rgSkills, or with status 404 (Not Found)
     */
    @GetMapping("/rg-skills/{id}")
    @Timed
    public ResponseEntity<RgSkills> getRgSkills(@PathVariable Long id) {
        log.debug("REST request to get RgSkills : {}", id);
        RgSkills rgSkills = rgSkillsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(rgSkills));
    }

    /**
     * DELETE  /rg-skills/:id : delete the "id" rgSkills.
     *
     * @param id the id of the rgSkills to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rg-skills/{id}")
    @Timed
    public ResponseEntity<Void> deleteRgSkills(@PathVariable Long id) {
        log.debug("REST request to delete RgSkills : {}", id);
        rgSkillsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
