package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.RgRegions;
import com.infostudio.ba.repository.RgRegionsRepository;
import com.infostudio.ba.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.infostudio.ba.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RgRegionsResource REST controller.
 *
 * @see RgRegionsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class RgRegionsResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private RgRegionsRepository rgRegionsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRgRegionsMockMvc;

    private RgRegions rgRegions;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RgRegionsResource rgRegionsResource = new RgRegionsResource(rgRegionsRepository);
        this.restRgRegionsMockMvc = MockMvcBuilders.standaloneSetup(rgRegionsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RgRegions createEntity(EntityManager em) {
        RgRegions rgRegions = new RgRegions()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return rgRegions;
    }

    @Before
    public void initTest() {
        rgRegions = createEntity(em);
    }

    @Test
    @Transactional
    public void createRgRegions() throws Exception {
        int databaseSizeBeforeCreate = rgRegionsRepository.findAll().size();

        // Create the RgRegions
        restRgRegionsMockMvc.perform(post("/api/rg-regions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgRegions)))
            .andExpect(status().isCreated());

        // Validate the RgRegions in the database
        List<RgRegions> rgRegionsList = rgRegionsRepository.findAll();
        assertThat(rgRegionsList).hasSize(databaseSizeBeforeCreate + 1);
        RgRegions testRgRegions = rgRegionsList.get(rgRegionsList.size() - 1);
        assertThat(testRgRegions.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testRgRegions.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRgRegions.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testRgRegions.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testRgRegions.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testRgRegions.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testRgRegions.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createRgRegionsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rgRegionsRepository.findAll().size();

        // Create the RgRegions with an existing ID
        rgRegions.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRgRegionsMockMvc.perform(post("/api/rg-regions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgRegions)))
            .andExpect(status().isBadRequest());

        // Validate the RgRegions in the database
        List<RgRegions> rgRegionsList = rgRegionsRepository.findAll();
        assertThat(rgRegionsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRgRegions() throws Exception {
        // Initialize the database
        rgRegionsRepository.saveAndFlush(rgRegions);

        // Get all the rgRegionsList
        restRgRegionsMockMvc.perform(get("/api/rg-regions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rgRegions.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getRgRegions() throws Exception {
        // Initialize the database
        rgRegionsRepository.saveAndFlush(rgRegions);

        // Get the rgRegions
        restRgRegionsMockMvc.perform(get("/api/rg-regions/{id}", rgRegions.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rgRegions.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRgRegions() throws Exception {
        // Get the rgRegions
        restRgRegionsMockMvc.perform(get("/api/rg-regions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRgRegions() throws Exception {
        // Initialize the database
        rgRegionsRepository.saveAndFlush(rgRegions);
        int databaseSizeBeforeUpdate = rgRegionsRepository.findAll().size();

        // Update the rgRegions
        RgRegions updatedRgRegions = rgRegionsRepository.findOne(rgRegions.getId());
        // Disconnect from session so that the updates on updatedRgRegions are not directly saved in db
        em.detach(updatedRgRegions);
        updatedRgRegions
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restRgRegionsMockMvc.perform(put("/api/rg-regions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRgRegions)))
            .andExpect(status().isOk());

        // Validate the RgRegions in the database
        List<RgRegions> rgRegionsList = rgRegionsRepository.findAll();
        assertThat(rgRegionsList).hasSize(databaseSizeBeforeUpdate);
        RgRegions testRgRegions = rgRegionsList.get(rgRegionsList.size() - 1);
        assertThat(testRgRegions.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testRgRegions.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRgRegions.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testRgRegions.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testRgRegions.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testRgRegions.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testRgRegions.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingRgRegions() throws Exception {
        int databaseSizeBeforeUpdate = rgRegionsRepository.findAll().size();

        // Create the RgRegions

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRgRegionsMockMvc.perform(put("/api/rg-regions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgRegions)))
            .andExpect(status().isCreated());

        // Validate the RgRegions in the database
        List<RgRegions> rgRegionsList = rgRegionsRepository.findAll();
        assertThat(rgRegionsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRgRegions() throws Exception {
        // Initialize the database
        rgRegionsRepository.saveAndFlush(rgRegions);
        int databaseSizeBeforeDelete = rgRegionsRepository.findAll().size();

        // Get the rgRegions
        restRgRegionsMockMvc.perform(delete("/api/rg-regions/{id}", rgRegions.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RgRegions> rgRegionsList = rgRegionsRepository.findAll();
        assertThat(rgRegionsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RgRegions.class);
        RgRegions rgRegions1 = new RgRegions();
        rgRegions1.setId(1L);
        RgRegions rgRegions2 = new RgRegions();
        rgRegions2.setId(rgRegions1.getId());
        assertThat(rgRegions1).isEqualTo(rgRegions2);
        rgRegions2.setId(2L);
        assertThat(rgRegions1).isNotEqualTo(rgRegions2);
        rgRegions1.setId(null);
        assertThat(rgRegions1).isNotEqualTo(rgRegions2);
    }
}
