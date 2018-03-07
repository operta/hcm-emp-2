package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.RgFamilyRoles;

import com.infostudio.ba.repository.RgFamilyRolesRepository;
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
 * REST controller for managing RgFamilyRoles.
 */
@RestController
@RequestMapping("/api")
public class RgFamilyRolesResource {

    private final Logger log = LoggerFactory.getLogger(RgFamilyRolesResource.class);

    private static final String ENTITY_NAME = "rgFamilyRoles";

    private final RgFamilyRolesRepository rgFamilyRolesRepository;

    public RgFamilyRolesResource(RgFamilyRolesRepository rgFamilyRolesRepository) {
        this.rgFamilyRolesRepository = rgFamilyRolesRepository;
    }

    /**
     * POST  /rg-family-roles : Create a new rgFamilyRoles.
     *
     * @param rgFamilyRoles the rgFamilyRoles to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rgFamilyRoles, or with status 400 (Bad Request) if the rgFamilyRoles has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rg-family-roles")
    @Timed
    public ResponseEntity<RgFamilyRoles> createRgFamilyRoles(@Valid @RequestBody RgFamilyRoles rgFamilyRoles) throws URISyntaxException {
        log.debug("REST request to save RgFamilyRoles : {}", rgFamilyRoles);
        if (rgFamilyRoles.getId() != null) {
            throw new BadRequestAlertException("A new rgFamilyRoles cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RgFamilyRoles result = rgFamilyRolesRepository.save(rgFamilyRoles);
        return ResponseEntity.created(new URI("/api/rg-family-roles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rg-family-roles : Updates an existing rgFamilyRoles.
     *
     * @param rgFamilyRoles the rgFamilyRoles to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rgFamilyRoles,
     * or with status 400 (Bad Request) if the rgFamilyRoles is not valid,
     * or with status 500 (Internal Server Error) if the rgFamilyRoles couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rg-family-roles")
    @Timed
    public ResponseEntity<RgFamilyRoles> updateRgFamilyRoles(@Valid @RequestBody RgFamilyRoles rgFamilyRoles) throws URISyntaxException {
        log.debug("REST request to update RgFamilyRoles : {}", rgFamilyRoles);
        if (rgFamilyRoles.getId() == null) {
            return createRgFamilyRoles(rgFamilyRoles);
        }
        RgFamilyRoles result = rgFamilyRolesRepository.save(rgFamilyRoles);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rgFamilyRoles.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rg-family-roles : get all the rgFamilyRoles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of rgFamilyRoles in body
     */
    @GetMapping("/rg-family-roles")
    @Timed
    public List<RgFamilyRoles> getAllRgFamilyRoles() {
        log.debug("REST request to get all RgFamilyRoles");
        return rgFamilyRolesRepository.findAll();
        }

    /**
     * GET  /rg-family-roles/:id : get the "id" rgFamilyRoles.
     *
     * @param id the id of the rgFamilyRoles to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rgFamilyRoles, or with status 404 (Not Found)
     */
    @GetMapping("/rg-family-roles/{id}")
    @Timed
    public ResponseEntity<RgFamilyRoles> getRgFamilyRoles(@PathVariable Long id) {
        log.debug("REST request to get RgFamilyRoles : {}", id);
        RgFamilyRoles rgFamilyRoles = rgFamilyRolesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(rgFamilyRoles));
    }

    /**
     * DELETE  /rg-family-roles/:id : delete the "id" rgFamilyRoles.
     *
     * @param id the id of the rgFamilyRoles to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rg-family-roles/{id}")
    @Timed
    public ResponseEntity<Void> deleteRgFamilyRoles(@PathVariable Long id) {
        log.debug("REST request to delete RgFamilyRoles : {}", id);
        rgFamilyRolesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
