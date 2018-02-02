package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.DmDocumentTypes;

import com.infostudio.ba.repository.DmDocumentTypesRepository;
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
 * REST controller for managing DmDocumentTypes.
 */
@RestController
@RequestMapping("/api")
public class DmDocumentTypesResource {

    private final Logger log = LoggerFactory.getLogger(DmDocumentTypesResource.class);

    private static final String ENTITY_NAME = "dmDocumentTypes";

    private final DmDocumentTypesRepository dmDocumentTypesRepository;

    public DmDocumentTypesResource(DmDocumentTypesRepository dmDocumentTypesRepository) {
        this.dmDocumentTypesRepository = dmDocumentTypesRepository;
    }

    /**
     * POST  /dm-document-types : Create a new dmDocumentTypes.
     *
     * @param dmDocumentTypes the dmDocumentTypes to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dmDocumentTypes, or with status 400 (Bad Request) if the dmDocumentTypes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dm-document-types")
    @Timed
    public ResponseEntity<DmDocumentTypes> createDmDocumentTypes(@Valid @RequestBody DmDocumentTypes dmDocumentTypes) throws URISyntaxException {
        log.debug("REST request to save DmDocumentTypes : {}", dmDocumentTypes);
        if (dmDocumentTypes.getId() != null) {
            throw new BadRequestAlertException("A new dmDocumentTypes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DmDocumentTypes result = dmDocumentTypesRepository.save(dmDocumentTypes);
        return ResponseEntity.created(new URI("/api/dm-document-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dm-document-types : Updates an existing dmDocumentTypes.
     *
     * @param dmDocumentTypes the dmDocumentTypes to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dmDocumentTypes,
     * or with status 400 (Bad Request) if the dmDocumentTypes is not valid,
     * or with status 500 (Internal Server Error) if the dmDocumentTypes couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dm-document-types")
    @Timed
    public ResponseEntity<DmDocumentTypes> updateDmDocumentTypes(@Valid @RequestBody DmDocumentTypes dmDocumentTypes) throws URISyntaxException {
        log.debug("REST request to update DmDocumentTypes : {}", dmDocumentTypes);
        if (dmDocumentTypes.getId() == null) {
            return createDmDocumentTypes(dmDocumentTypes);
        }
        DmDocumentTypes result = dmDocumentTypesRepository.save(dmDocumentTypes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dmDocumentTypes.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dm-document-types : get all the dmDocumentTypes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of dmDocumentTypes in body
     */
    @GetMapping("/dm-document-types")
    @Timed
    public ResponseEntity<List<DmDocumentTypes>> getAllDmDocumentTypes(Pageable pageable) {
        log.debug("REST request to get a page of DmDocumentTypes");
        Page<DmDocumentTypes> page = dmDocumentTypesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/dm-document-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /dm-document-types/:id : get the "id" dmDocumentTypes.
     *
     * @param id the id of the dmDocumentTypes to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dmDocumentTypes, or with status 404 (Not Found)
     */
    @GetMapping("/dm-document-types/{id}")
    @Timed
    public ResponseEntity<DmDocumentTypes> getDmDocumentTypes(@PathVariable Long id) {
        log.debug("REST request to get DmDocumentTypes : {}", id);
        DmDocumentTypes dmDocumentTypes = dmDocumentTypesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dmDocumentTypes));
    }

    /**
     * DELETE  /dm-document-types/:id : delete the "id" dmDocumentTypes.
     *
     * @param id the id of the dmDocumentTypes to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dm-document-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteDmDocumentTypes(@PathVariable Long id) {
        log.debug("REST request to delete DmDocumentTypes : {}", id);
        dmDocumentTypesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
