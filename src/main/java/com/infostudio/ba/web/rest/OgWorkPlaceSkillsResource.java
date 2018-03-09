package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.OgWorkPlaceSkills;

import com.infostudio.ba.repository.OgWorkPlaceSkillsRepository;
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
 * REST controller for managing OgWorkPlaceSkills.
 */
@RestController
@RequestMapping("/api")
public class OgWorkPlaceSkillsResource {

    private final Logger log = LoggerFactory.getLogger(OgWorkPlaceSkillsResource.class);

    private static final String ENTITY_NAME = "ogWorkPlaceSkills";

    private final OgWorkPlaceSkillsRepository ogWorkPlaceSkillsRepository;

    public OgWorkPlaceSkillsResource(OgWorkPlaceSkillsRepository ogWorkPlaceSkillsRepository) {
        this.ogWorkPlaceSkillsRepository = ogWorkPlaceSkillsRepository;
    }

    /**
     * POST  /og-work-place-skills : Create a new ogWorkPlaceSkills.
     *
     * @param ogWorkPlaceSkills the ogWorkPlaceSkills to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ogWorkPlaceSkills, or with status 400 (Bad Request) if the ogWorkPlaceSkills has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/og-work-place-skills")
    @Timed
    public ResponseEntity<OgWorkPlaceSkills> createOgWorkPlaceSkills(@RequestBody OgWorkPlaceSkills ogWorkPlaceSkills) throws URISyntaxException {
        log.debug("REST request to save OgWorkPlaceSkills : {}", ogWorkPlaceSkills);
        if (ogWorkPlaceSkills.getId() != null) {
            throw new BadRequestAlertException("A new ogWorkPlaceSkills cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OgWorkPlaceSkills result = ogWorkPlaceSkillsRepository.save(ogWorkPlaceSkills);
        return ResponseEntity.created(new URI("/api/og-work-place-skills/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /og-work-place-skills : Updates an existing ogWorkPlaceSkills.
     *
     * @param ogWorkPlaceSkills the ogWorkPlaceSkills to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ogWorkPlaceSkills,
     * or with status 400 (Bad Request) if the ogWorkPlaceSkills is not valid,
     * or with status 500 (Internal Server Error) if the ogWorkPlaceSkills couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/og-work-place-skills")
    @Timed
    public ResponseEntity<OgWorkPlaceSkills> updateOgWorkPlaceSkills(@RequestBody OgWorkPlaceSkills ogWorkPlaceSkills) throws URISyntaxException {
        log.debug("REST request to update OgWorkPlaceSkills : {}", ogWorkPlaceSkills);
        if (ogWorkPlaceSkills.getId() == null) {
            return createOgWorkPlaceSkills(ogWorkPlaceSkills);
        }
        OgWorkPlaceSkills result = ogWorkPlaceSkillsRepository.save(ogWorkPlaceSkills);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ogWorkPlaceSkills.getId().toString()))
            .body(result);
    }

    /**
     * GET  /og-work-place-skills : get all the ogWorkPlaceSkills.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ogWorkPlaceSkills in body
     */
    @GetMapping("/og-work-place-skills")
    @Timed
    public List<OgWorkPlaceSkills> getAllOgWorkPlaceSkills() {
        log.debug("REST request to get all OgWorkPlaceSkills");
        return ogWorkPlaceSkillsRepository.findAll();
        }

    /**
     * GET  /og-work-place-skills/:id : get the "id" ogWorkPlaceSkills.
     *
     * @param id the id of the ogWorkPlaceSkills to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ogWorkPlaceSkills, or with status 404 (Not Found)
     */
    @GetMapping("/og-work-place-skills/{id}")
    @Timed
    public ResponseEntity<OgWorkPlaceSkills> getOgWorkPlaceSkills(@PathVariable Long id) {
        log.debug("REST request to get OgWorkPlaceSkills : {}", id);
        OgWorkPlaceSkills ogWorkPlaceSkills = ogWorkPlaceSkillsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ogWorkPlaceSkills));
    }


    /**
     * GET  /og-work-place-skills/workplace/:id : get the "id" ogWorkPlaceSkills by workplace.
     *
     * @param id the id of the ogWorkPlaceSkills to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ogWorkPlaceSkills, or with status 404 (Not Found)
     */
    @GetMapping("/og-work-place-skills/workplace/{id}")
    @Timed
    public ResponseEntity<List<OgWorkPlaceSkills>> getWorkplaceSkillsByWorkplace(@PathVariable Long id) {
        log.debug("REST request to get OgWorkPlaceSkills by workplace: {}", id);
        List<OgWorkPlaceSkills> ogWorkPlaceSkills = ogWorkPlaceSkillsRepository.findByIdWorkPlaceId(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ogWorkPlaceSkills));
    }
    /**
     * DELETE  /og-work-place-skills/:id : delete the "id" ogWorkPlaceSkills.
     *
     * @param id the id of the ogWorkPlaceSkills to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/og-work-place-skills/{id}")
    @Timed
    public ResponseEntity<Void> deleteOgWorkPlaceSkills(@PathVariable Long id) {
        log.debug("REST request to delete OgWorkPlaceSkills : {}", id);
        ogWorkPlaceSkillsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
