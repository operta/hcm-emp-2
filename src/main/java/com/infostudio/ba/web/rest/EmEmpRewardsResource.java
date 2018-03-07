package com.infostudio.ba.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.infostudio.ba.domain.EmEmpFamilies;
import com.infostudio.ba.domain.EmEmpRewards;

import com.infostudio.ba.repository.EmEmpRewardsRepository;
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
 * REST controller for managing EmEmpRewards.
 */
@RestController
@RequestMapping("/api")
public class EmEmpRewardsResource {

    private final Logger log = LoggerFactory.getLogger(EmEmpRewardsResource.class);

    private static final String ENTITY_NAME = "emEmpRewards";

    private final EmEmpRewardsRepository emEmpRewardsRepository;

    public EmEmpRewardsResource(EmEmpRewardsRepository emEmpRewardsRepository) {
        this.emEmpRewardsRepository = emEmpRewardsRepository;
    }

    /**
     * POST  /em-emp-rewards : Create a new emEmpRewards.
     *
     * @param emEmpRewards the emEmpRewards to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emEmpRewards, or with status 400 (Bad Request) if the emEmpRewards has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/em-emp-rewards")
    @Timed
    public ResponseEntity<EmEmpRewards> createEmEmpRewards(@RequestBody EmEmpRewards emEmpRewards) throws URISyntaxException {
        log.debug("REST request to save EmEmpRewards : {}", emEmpRewards);
        if (emEmpRewards.getId() != null) {
            throw new BadRequestAlertException("A new emEmpRewards cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmEmpRewards result = emEmpRewardsRepository.save(emEmpRewards);
        return ResponseEntity.created(new URI("/api/em-emp-rewards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /em-emp-rewards : Updates an existing emEmpRewards.
     *
     * @param emEmpRewards the emEmpRewards to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emEmpRewards,
     * or with status 400 (Bad Request) if the emEmpRewards is not valid,
     * or with status 500 (Internal Server Error) if the emEmpRewards couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/em-emp-rewards")
    @Timed
    public ResponseEntity<EmEmpRewards> updateEmEmpRewards(@RequestBody EmEmpRewards emEmpRewards) throws URISyntaxException {
        log.debug("REST request to update EmEmpRewards : {}", emEmpRewards);
        if (emEmpRewards.getId() == null) {
            return createEmEmpRewards(emEmpRewards);
        }
        EmEmpRewards result = emEmpRewardsRepository.save(emEmpRewards);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emEmpRewards.getId().toString()))
            .body(result);
    }

    /**
     * GET  /em-emp-rewards : get all the emEmpRewards.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of emEmpRewards in body
     */
    @GetMapping("/em-emp-rewards")
    @Timed
    public List<EmEmpRewards> getAllEmEmpRewards() {
        log.debug("REST request to get all EmEmpRewards");
        return emEmpRewardsRepository.findAll();
        }

    /**
     * GET  /em-emp-rewards/:id : get the "id" emEmpRewards.
     *
     * @param id the id of the emEmpRewards to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emEmpRewards, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-rewards/{id}")
    @Timed
    public ResponseEntity<EmEmpRewards> getEmEmpRewards(@PathVariable Long id) {
        log.debug("REST request to get EmEmpRewards : {}", id);
        EmEmpRewards emEmpRewards = emEmpRewardsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmpRewards));
    }

    /**
     * GET  /em-emp-rewards/employee/:id : get the rewards by employee.
     *
     * @param id the employee id
     * @return the ResponseEntity with status 200 (OK) and with body of Rewards Model, or with status 404 (Not Found)
     */
    @GetMapping("/em-emp-rewards/employee/{id}")
    @Timed
    public ResponseEntity<List<EmEmpRewards>> getAllRewardsByEmployee(@PathVariable String id) {
        log.debug("REST request to get all Rewards by employee");
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emEmpRewardsRepository.findByIdEmployee_Id(Long.valueOf(id))));
    }

    /**
     * DELETE  /em-emp-rewards/:id : delete the "id" emEmpRewards.
     *
     * @param id the id of the emEmpRewards to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/em-emp-rewards/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmEmpRewards(@PathVariable Long id) {
        log.debug("REST request to delete EmEmpRewards : {}", id);
        emEmpRewardsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
