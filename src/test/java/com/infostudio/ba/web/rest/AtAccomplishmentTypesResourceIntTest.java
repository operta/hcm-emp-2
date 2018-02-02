package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.AtAccomplishmentTypes;
import com.infostudio.ba.repository.AtAccomplishmentTypesRepository;
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
 * Test class for the AtAccomplishmentTypesResource REST controller.
 *
 * @see AtAccomplishmentTypesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class AtAccomplishmentTypesResourceIntTest {

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
    private AtAccomplishmentTypesRepository atAccomplishmentTypesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAtAccomplishmentTypesMockMvc;

    private AtAccomplishmentTypes atAccomplishmentTypes;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AtAccomplishmentTypesResource atAccomplishmentTypesResource = new AtAccomplishmentTypesResource(atAccomplishmentTypesRepository);
        this.restAtAccomplishmentTypesMockMvc = MockMvcBuilders.standaloneSetup(atAccomplishmentTypesResource)
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
    public static AtAccomplishmentTypes createEntity(EntityManager em) {
        AtAccomplishmentTypes atAccomplishmentTypes = new AtAccomplishmentTypes()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return atAccomplishmentTypes;
    }

    @Before
    public void initTest() {
        atAccomplishmentTypes = createEntity(em);
    }

    @Test
    @Transactional
    public void createAtAccomplishmentTypes() throws Exception {
        int databaseSizeBeforeCreate = atAccomplishmentTypesRepository.findAll().size();

        // Create the AtAccomplishmentTypes
        restAtAccomplishmentTypesMockMvc.perform(post("/api/at-accomplishment-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(atAccomplishmentTypes)))
            .andExpect(status().isCreated());

        // Validate the AtAccomplishmentTypes in the database
        List<AtAccomplishmentTypes> atAccomplishmentTypesList = atAccomplishmentTypesRepository.findAll();
        assertThat(atAccomplishmentTypesList).hasSize(databaseSizeBeforeCreate + 1);
        AtAccomplishmentTypes testAtAccomplishmentTypes = atAccomplishmentTypesList.get(atAccomplishmentTypesList.size() - 1);
        assertThat(testAtAccomplishmentTypes.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testAtAccomplishmentTypes.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAtAccomplishmentTypes.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testAtAccomplishmentTypes.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testAtAccomplishmentTypes.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testAtAccomplishmentTypes.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testAtAccomplishmentTypes.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createAtAccomplishmentTypesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = atAccomplishmentTypesRepository.findAll().size();

        // Create the AtAccomplishmentTypes with an existing ID
        atAccomplishmentTypes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAtAccomplishmentTypesMockMvc.perform(post("/api/at-accomplishment-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(atAccomplishmentTypes)))
            .andExpect(status().isBadRequest());

        // Validate the AtAccomplishmentTypes in the database
        List<AtAccomplishmentTypes> atAccomplishmentTypesList = atAccomplishmentTypesRepository.findAll();
        assertThat(atAccomplishmentTypesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = atAccomplishmentTypesRepository.findAll().size();
        // set the field null
        atAccomplishmentTypes.setCode(null);

        // Create the AtAccomplishmentTypes, which fails.

        restAtAccomplishmentTypesMockMvc.perform(post("/api/at-accomplishment-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(atAccomplishmentTypes)))
            .andExpect(status().isBadRequest());

        List<AtAccomplishmentTypes> atAccomplishmentTypesList = atAccomplishmentTypesRepository.findAll();
        assertThat(atAccomplishmentTypesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = atAccomplishmentTypesRepository.findAll().size();
        // set the field null
        atAccomplishmentTypes.setName(null);

        // Create the AtAccomplishmentTypes, which fails.

        restAtAccomplishmentTypesMockMvc.perform(post("/api/at-accomplishment-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(atAccomplishmentTypes)))
            .andExpect(status().isBadRequest());

        List<AtAccomplishmentTypes> atAccomplishmentTypesList = atAccomplishmentTypesRepository.findAll();
        assertThat(atAccomplishmentTypesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAtAccomplishmentTypes() throws Exception {
        // Initialize the database
        atAccomplishmentTypesRepository.saveAndFlush(atAccomplishmentTypes);

        // Get all the atAccomplishmentTypesList
        restAtAccomplishmentTypesMockMvc.perform(get("/api/at-accomplishment-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(atAccomplishmentTypes.getId().intValue())))
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
    public void getAtAccomplishmentTypes() throws Exception {
        // Initialize the database
        atAccomplishmentTypesRepository.saveAndFlush(atAccomplishmentTypes);

        // Get the atAccomplishmentTypes
        restAtAccomplishmentTypesMockMvc.perform(get("/api/at-accomplishment-types/{id}", atAccomplishmentTypes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(atAccomplishmentTypes.getId().intValue()))
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
    public void getNonExistingAtAccomplishmentTypes() throws Exception {
        // Get the atAccomplishmentTypes
        restAtAccomplishmentTypesMockMvc.perform(get("/api/at-accomplishment-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAtAccomplishmentTypes() throws Exception {
        // Initialize the database
        atAccomplishmentTypesRepository.saveAndFlush(atAccomplishmentTypes);
        int databaseSizeBeforeUpdate = atAccomplishmentTypesRepository.findAll().size();

        // Update the atAccomplishmentTypes
        AtAccomplishmentTypes updatedAtAccomplishmentTypes = atAccomplishmentTypesRepository.findOne(atAccomplishmentTypes.getId());
        // Disconnect from session so that the updates on updatedAtAccomplishmentTypes are not directly saved in db
        em.detach(updatedAtAccomplishmentTypes);
        updatedAtAccomplishmentTypes
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restAtAccomplishmentTypesMockMvc.perform(put("/api/at-accomplishment-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAtAccomplishmentTypes)))
            .andExpect(status().isOk());

        // Validate the AtAccomplishmentTypes in the database
        List<AtAccomplishmentTypes> atAccomplishmentTypesList = atAccomplishmentTypesRepository.findAll();
        assertThat(atAccomplishmentTypesList).hasSize(databaseSizeBeforeUpdate);
        AtAccomplishmentTypes testAtAccomplishmentTypes = atAccomplishmentTypesList.get(atAccomplishmentTypesList.size() - 1);
        assertThat(testAtAccomplishmentTypes.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testAtAccomplishmentTypes.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAtAccomplishmentTypes.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testAtAccomplishmentTypes.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testAtAccomplishmentTypes.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testAtAccomplishmentTypes.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testAtAccomplishmentTypes.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingAtAccomplishmentTypes() throws Exception {
        int databaseSizeBeforeUpdate = atAccomplishmentTypesRepository.findAll().size();

        // Create the AtAccomplishmentTypes

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAtAccomplishmentTypesMockMvc.perform(put("/api/at-accomplishment-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(atAccomplishmentTypes)))
            .andExpect(status().isCreated());

        // Validate the AtAccomplishmentTypes in the database
        List<AtAccomplishmentTypes> atAccomplishmentTypesList = atAccomplishmentTypesRepository.findAll();
        assertThat(atAccomplishmentTypesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAtAccomplishmentTypes() throws Exception {
        // Initialize the database
        atAccomplishmentTypesRepository.saveAndFlush(atAccomplishmentTypes);
        int databaseSizeBeforeDelete = atAccomplishmentTypesRepository.findAll().size();

        // Get the atAccomplishmentTypes
        restAtAccomplishmentTypesMockMvc.perform(delete("/api/at-accomplishment-types/{id}", atAccomplishmentTypes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AtAccomplishmentTypes> atAccomplishmentTypesList = atAccomplishmentTypesRepository.findAll();
        assertThat(atAccomplishmentTypesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AtAccomplishmentTypes.class);
        AtAccomplishmentTypes atAccomplishmentTypes1 = new AtAccomplishmentTypes();
        atAccomplishmentTypes1.setId(1L);
        AtAccomplishmentTypes atAccomplishmentTypes2 = new AtAccomplishmentTypes();
        atAccomplishmentTypes2.setId(atAccomplishmentTypes1.getId());
        assertThat(atAccomplishmentTypes1).isEqualTo(atAccomplishmentTypes2);
        atAccomplishmentTypes2.setId(2L);
        assertThat(atAccomplishmentTypes1).isNotEqualTo(atAccomplishmentTypes2);
        atAccomplishmentTypes1.setId(null);
        assertThat(atAccomplishmentTypes1).isNotEqualTo(atAccomplishmentTypes2);
    }
}
