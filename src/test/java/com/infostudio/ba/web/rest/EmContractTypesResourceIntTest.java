package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmContractTypes;
import com.infostudio.ba.repository.EmContractTypesRepository;
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
 * Test class for the EmContractTypesResource REST controller.
 *
 * @see EmContractTypesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmContractTypesResourceIntTest {

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
    private EmContractTypesRepository emContractTypesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmContractTypesMockMvc;

    private EmContractTypes emContractTypes;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmContractTypesResource emContractTypesResource = new EmContractTypesResource(emContractTypesRepository);
        this.restEmContractTypesMockMvc = MockMvcBuilders.standaloneSetup(emContractTypesResource)
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
    public static EmContractTypes createEntity(EntityManager em) {
        EmContractTypes emContractTypes = new EmContractTypes()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emContractTypes;
    }

    @Before
    public void initTest() {
        emContractTypes = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmContractTypes() throws Exception {
        int databaseSizeBeforeCreate = emContractTypesRepository.findAll().size();

        // Create the EmContractTypes
        restEmContractTypesMockMvc.perform(post("/api/em-contract-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emContractTypes)))
            .andExpect(status().isCreated());

        // Validate the EmContractTypes in the database
        List<EmContractTypes> emContractTypesList = emContractTypesRepository.findAll();
        assertThat(emContractTypesList).hasSize(databaseSizeBeforeCreate + 1);
        EmContractTypes testEmContractTypes = emContractTypesList.get(emContractTypesList.size() - 1);
        assertThat(testEmContractTypes.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testEmContractTypes.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEmContractTypes.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testEmContractTypes.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmContractTypes.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmContractTypes.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmContractTypes.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmContractTypesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emContractTypesRepository.findAll().size();

        // Create the EmContractTypes with an existing ID
        emContractTypes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmContractTypesMockMvc.perform(post("/api/em-contract-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emContractTypes)))
            .andExpect(status().isBadRequest());

        // Validate the EmContractTypes in the database
        List<EmContractTypes> emContractTypesList = emContractTypesRepository.findAll();
        assertThat(emContractTypesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = emContractTypesRepository.findAll().size();
        // set the field null
        emContractTypes.setCode(null);

        // Create the EmContractTypes, which fails.

        restEmContractTypesMockMvc.perform(post("/api/em-contract-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emContractTypes)))
            .andExpect(status().isBadRequest());

        List<EmContractTypes> emContractTypesList = emContractTypesRepository.findAll();
        assertThat(emContractTypesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = emContractTypesRepository.findAll().size();
        // set the field null
        emContractTypes.setName(null);

        // Create the EmContractTypes, which fails.

        restEmContractTypesMockMvc.perform(post("/api/em-contract-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emContractTypes)))
            .andExpect(status().isBadRequest());

        List<EmContractTypes> emContractTypesList = emContractTypesRepository.findAll();
        assertThat(emContractTypesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmContractTypes() throws Exception {
        // Initialize the database
        emContractTypesRepository.saveAndFlush(emContractTypes);

        // Get all the emContractTypesList
        restEmContractTypesMockMvc.perform(get("/api/em-contract-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emContractTypes.getId().intValue())))
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
    public void getEmContractTypes() throws Exception {
        // Initialize the database
        emContractTypesRepository.saveAndFlush(emContractTypes);

        // Get the emContractTypes
        restEmContractTypesMockMvc.perform(get("/api/em-contract-types/{id}", emContractTypes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emContractTypes.getId().intValue()))
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
    public void getNonExistingEmContractTypes() throws Exception {
        // Get the emContractTypes
        restEmContractTypesMockMvc.perform(get("/api/em-contract-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmContractTypes() throws Exception {
        // Initialize the database
        emContractTypesRepository.saveAndFlush(emContractTypes);
        int databaseSizeBeforeUpdate = emContractTypesRepository.findAll().size();

        // Update the emContractTypes
        EmContractTypes updatedEmContractTypes = emContractTypesRepository.findOne(emContractTypes.getId());
        // Disconnect from session so that the updates on updatedEmContractTypes are not directly saved in db
        em.detach(updatedEmContractTypes);
        updatedEmContractTypes
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmContractTypesMockMvc.perform(put("/api/em-contract-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmContractTypes)))
            .andExpect(status().isOk());

        // Validate the EmContractTypes in the database
        List<EmContractTypes> emContractTypesList = emContractTypesRepository.findAll();
        assertThat(emContractTypesList).hasSize(databaseSizeBeforeUpdate);
        EmContractTypes testEmContractTypes = emContractTypesList.get(emContractTypesList.size() - 1);
        assertThat(testEmContractTypes.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testEmContractTypes.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEmContractTypes.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testEmContractTypes.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmContractTypes.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmContractTypes.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmContractTypes.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmContractTypes() throws Exception {
        int databaseSizeBeforeUpdate = emContractTypesRepository.findAll().size();

        // Create the EmContractTypes

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmContractTypesMockMvc.perform(put("/api/em-contract-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emContractTypes)))
            .andExpect(status().isCreated());

        // Validate the EmContractTypes in the database
        List<EmContractTypes> emContractTypesList = emContractTypesRepository.findAll();
        assertThat(emContractTypesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmContractTypes() throws Exception {
        // Initialize the database
        emContractTypesRepository.saveAndFlush(emContractTypes);
        int databaseSizeBeforeDelete = emContractTypesRepository.findAll().size();

        // Get the emContractTypes
        restEmContractTypesMockMvc.perform(delete("/api/em-contract-types/{id}", emContractTypes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmContractTypes> emContractTypesList = emContractTypesRepository.findAll();
        assertThat(emContractTypesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmContractTypes.class);
        EmContractTypes emContractTypes1 = new EmContractTypes();
        emContractTypes1.setId(1L);
        EmContractTypes emContractTypes2 = new EmContractTypes();
        emContractTypes2.setId(emContractTypes1.getId());
        assertThat(emContractTypes1).isEqualTo(emContractTypes2);
        emContractTypes2.setId(2L);
        assertThat(emContractTypes1).isNotEqualTo(emContractTypes2);
        emContractTypes1.setId(null);
        assertThat(emContractTypes1).isNotEqualTo(emContractTypes2);
    }
}
