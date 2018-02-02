package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmEmpTypes;
import com.infostudio.ba.repository.EmEmpTypesRepository;
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
 * Test class for the EmEmpTypesResource REST controller.
 *
 * @see EmEmpTypesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmEmpTypesResourceIntTest {

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
    private EmEmpTypesRepository emEmpTypesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmEmpTypesMockMvc;

    private EmEmpTypes emEmpTypes;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmEmpTypesResource emEmpTypesResource = new EmEmpTypesResource(emEmpTypesRepository);
        this.restEmEmpTypesMockMvc = MockMvcBuilders.standaloneSetup(emEmpTypesResource)
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
    public static EmEmpTypes createEntity(EntityManager em) {
        EmEmpTypes emEmpTypes = new EmEmpTypes()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emEmpTypes;
    }

    @Before
    public void initTest() {
        emEmpTypes = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmEmpTypes() throws Exception {
        int databaseSizeBeforeCreate = emEmpTypesRepository.findAll().size();

        // Create the EmEmpTypes
        restEmEmpTypesMockMvc.perform(post("/api/em-emp-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpTypes)))
            .andExpect(status().isCreated());

        // Validate the EmEmpTypes in the database
        List<EmEmpTypes> emEmpTypesList = emEmpTypesRepository.findAll();
        assertThat(emEmpTypesList).hasSize(databaseSizeBeforeCreate + 1);
        EmEmpTypes testEmEmpTypes = emEmpTypesList.get(emEmpTypesList.size() - 1);
        assertThat(testEmEmpTypes.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testEmEmpTypes.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEmEmpTypes.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testEmEmpTypes.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmEmpTypes.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmEmpTypes.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmEmpTypes.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmEmpTypesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emEmpTypesRepository.findAll().size();

        // Create the EmEmpTypes with an existing ID
        emEmpTypes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmEmpTypesMockMvc.perform(post("/api/em-emp-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpTypes)))
            .andExpect(status().isBadRequest());

        // Validate the EmEmpTypes in the database
        List<EmEmpTypes> emEmpTypesList = emEmpTypesRepository.findAll();
        assertThat(emEmpTypesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = emEmpTypesRepository.findAll().size();
        // set the field null
        emEmpTypes.setCode(null);

        // Create the EmEmpTypes, which fails.

        restEmEmpTypesMockMvc.perform(post("/api/em-emp-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpTypes)))
            .andExpect(status().isBadRequest());

        List<EmEmpTypes> emEmpTypesList = emEmpTypesRepository.findAll();
        assertThat(emEmpTypesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = emEmpTypesRepository.findAll().size();
        // set the field null
        emEmpTypes.setName(null);

        // Create the EmEmpTypes, which fails.

        restEmEmpTypesMockMvc.perform(post("/api/em-emp-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpTypes)))
            .andExpect(status().isBadRequest());

        List<EmEmpTypes> emEmpTypesList = emEmpTypesRepository.findAll();
        assertThat(emEmpTypesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmEmpTypes() throws Exception {
        // Initialize the database
        emEmpTypesRepository.saveAndFlush(emEmpTypes);

        // Get all the emEmpTypesList
        restEmEmpTypesMockMvc.perform(get("/api/em-emp-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emEmpTypes.getId().intValue())))
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
    public void getEmEmpTypes() throws Exception {
        // Initialize the database
        emEmpTypesRepository.saveAndFlush(emEmpTypes);

        // Get the emEmpTypes
        restEmEmpTypesMockMvc.perform(get("/api/em-emp-types/{id}", emEmpTypes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emEmpTypes.getId().intValue()))
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
    public void getNonExistingEmEmpTypes() throws Exception {
        // Get the emEmpTypes
        restEmEmpTypesMockMvc.perform(get("/api/em-emp-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmEmpTypes() throws Exception {
        // Initialize the database
        emEmpTypesRepository.saveAndFlush(emEmpTypes);
        int databaseSizeBeforeUpdate = emEmpTypesRepository.findAll().size();

        // Update the emEmpTypes
        EmEmpTypes updatedEmEmpTypes = emEmpTypesRepository.findOne(emEmpTypes.getId());
        // Disconnect from session so that the updates on updatedEmEmpTypes are not directly saved in db
        em.detach(updatedEmEmpTypes);
        updatedEmEmpTypes
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmEmpTypesMockMvc.perform(put("/api/em-emp-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmEmpTypes)))
            .andExpect(status().isOk());

        // Validate the EmEmpTypes in the database
        List<EmEmpTypes> emEmpTypesList = emEmpTypesRepository.findAll();
        assertThat(emEmpTypesList).hasSize(databaseSizeBeforeUpdate);
        EmEmpTypes testEmEmpTypes = emEmpTypesList.get(emEmpTypesList.size() - 1);
        assertThat(testEmEmpTypes.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testEmEmpTypes.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEmEmpTypes.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testEmEmpTypes.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmEmpTypes.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmEmpTypes.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmEmpTypes.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmEmpTypes() throws Exception {
        int databaseSizeBeforeUpdate = emEmpTypesRepository.findAll().size();

        // Create the EmEmpTypes

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmEmpTypesMockMvc.perform(put("/api/em-emp-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpTypes)))
            .andExpect(status().isCreated());

        // Validate the EmEmpTypes in the database
        List<EmEmpTypes> emEmpTypesList = emEmpTypesRepository.findAll();
        assertThat(emEmpTypesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmEmpTypes() throws Exception {
        // Initialize the database
        emEmpTypesRepository.saveAndFlush(emEmpTypes);
        int databaseSizeBeforeDelete = emEmpTypesRepository.findAll().size();

        // Get the emEmpTypes
        restEmEmpTypesMockMvc.perform(delete("/api/em-emp-types/{id}", emEmpTypes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmEmpTypes> emEmpTypesList = emEmpTypesRepository.findAll();
        assertThat(emEmpTypesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmEmpTypes.class);
        EmEmpTypes emEmpTypes1 = new EmEmpTypes();
        emEmpTypes1.setId(1L);
        EmEmpTypes emEmpTypes2 = new EmEmpTypes();
        emEmpTypes2.setId(emEmpTypes1.getId());
        assertThat(emEmpTypes1).isEqualTo(emEmpTypes2);
        emEmpTypes2.setId(2L);
        assertThat(emEmpTypes1).isNotEqualTo(emEmpTypes2);
        emEmpTypes1.setId(null);
        assertThat(emEmpTypes1).isNotEqualTo(emEmpTypes2);
    }
}
