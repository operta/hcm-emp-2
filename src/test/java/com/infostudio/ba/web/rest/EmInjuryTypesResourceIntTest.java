package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmInjuryTypes;
import com.infostudio.ba.repository.EmInjuryTypesRepository;
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
 * Test class for the EmInjuryTypesResource REST controller.
 *
 * @see EmInjuryTypesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmInjuryTypesResourceIntTest {

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
    private EmInjuryTypesRepository emInjuryTypesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmInjuryTypesMockMvc;

    private EmInjuryTypes emInjuryTypes;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmInjuryTypesResource emInjuryTypesResource = new EmInjuryTypesResource(emInjuryTypesRepository);
        this.restEmInjuryTypesMockMvc = MockMvcBuilders.standaloneSetup(emInjuryTypesResource)
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
    public static EmInjuryTypes createEntity(EntityManager em) {
        EmInjuryTypes emInjuryTypes = new EmInjuryTypes()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emInjuryTypes;
    }

    @Before
    public void initTest() {
        emInjuryTypes = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmInjuryTypes() throws Exception {
        int databaseSizeBeforeCreate = emInjuryTypesRepository.findAll().size();

        // Create the EmInjuryTypes
        restEmInjuryTypesMockMvc.perform(post("/api/em-injury-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emInjuryTypes)))
            .andExpect(status().isCreated());

        // Validate the EmInjuryTypes in the database
        List<EmInjuryTypes> emInjuryTypesList = emInjuryTypesRepository.findAll();
        assertThat(emInjuryTypesList).hasSize(databaseSizeBeforeCreate + 1);
        EmInjuryTypes testEmInjuryTypes = emInjuryTypesList.get(emInjuryTypesList.size() - 1);
        assertThat(testEmInjuryTypes.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testEmInjuryTypes.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEmInjuryTypes.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testEmInjuryTypes.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmInjuryTypes.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmInjuryTypes.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmInjuryTypes.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmInjuryTypesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emInjuryTypesRepository.findAll().size();

        // Create the EmInjuryTypes with an existing ID
        emInjuryTypes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmInjuryTypesMockMvc.perform(post("/api/em-injury-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emInjuryTypes)))
            .andExpect(status().isBadRequest());

        // Validate the EmInjuryTypes in the database
        List<EmInjuryTypes> emInjuryTypesList = emInjuryTypesRepository.findAll();
        assertThat(emInjuryTypesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = emInjuryTypesRepository.findAll().size();
        // set the field null
        emInjuryTypes.setCode(null);

        // Create the EmInjuryTypes, which fails.

        restEmInjuryTypesMockMvc.perform(post("/api/em-injury-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emInjuryTypes)))
            .andExpect(status().isBadRequest());

        List<EmInjuryTypes> emInjuryTypesList = emInjuryTypesRepository.findAll();
        assertThat(emInjuryTypesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = emInjuryTypesRepository.findAll().size();
        // set the field null
        emInjuryTypes.setName(null);

        // Create the EmInjuryTypes, which fails.

        restEmInjuryTypesMockMvc.perform(post("/api/em-injury-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emInjuryTypes)))
            .andExpect(status().isBadRequest());

        List<EmInjuryTypes> emInjuryTypesList = emInjuryTypesRepository.findAll();
        assertThat(emInjuryTypesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmInjuryTypes() throws Exception {
        // Initialize the database
        emInjuryTypesRepository.saveAndFlush(emInjuryTypes);

        // Get all the emInjuryTypesList
        restEmInjuryTypesMockMvc.perform(get("/api/em-injury-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emInjuryTypes.getId().intValue())))
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
    public void getEmInjuryTypes() throws Exception {
        // Initialize the database
        emInjuryTypesRepository.saveAndFlush(emInjuryTypes);

        // Get the emInjuryTypes
        restEmInjuryTypesMockMvc.perform(get("/api/em-injury-types/{id}", emInjuryTypes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emInjuryTypes.getId().intValue()))
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
    public void getNonExistingEmInjuryTypes() throws Exception {
        // Get the emInjuryTypes
        restEmInjuryTypesMockMvc.perform(get("/api/em-injury-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmInjuryTypes() throws Exception {
        // Initialize the database
        emInjuryTypesRepository.saveAndFlush(emInjuryTypes);
        int databaseSizeBeforeUpdate = emInjuryTypesRepository.findAll().size();

        // Update the emInjuryTypes
        EmInjuryTypes updatedEmInjuryTypes = emInjuryTypesRepository.findOne(emInjuryTypes.getId());
        // Disconnect from session so that the updates on updatedEmInjuryTypes are not directly saved in db
        em.detach(updatedEmInjuryTypes);
        updatedEmInjuryTypes
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmInjuryTypesMockMvc.perform(put("/api/em-injury-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmInjuryTypes)))
            .andExpect(status().isOk());

        // Validate the EmInjuryTypes in the database
        List<EmInjuryTypes> emInjuryTypesList = emInjuryTypesRepository.findAll();
        assertThat(emInjuryTypesList).hasSize(databaseSizeBeforeUpdate);
        EmInjuryTypes testEmInjuryTypes = emInjuryTypesList.get(emInjuryTypesList.size() - 1);
        assertThat(testEmInjuryTypes.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testEmInjuryTypes.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEmInjuryTypes.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testEmInjuryTypes.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmInjuryTypes.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmInjuryTypes.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmInjuryTypes.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmInjuryTypes() throws Exception {
        int databaseSizeBeforeUpdate = emInjuryTypesRepository.findAll().size();

        // Create the EmInjuryTypes

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmInjuryTypesMockMvc.perform(put("/api/em-injury-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emInjuryTypes)))
            .andExpect(status().isCreated());

        // Validate the EmInjuryTypes in the database
        List<EmInjuryTypes> emInjuryTypesList = emInjuryTypesRepository.findAll();
        assertThat(emInjuryTypesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmInjuryTypes() throws Exception {
        // Initialize the database
        emInjuryTypesRepository.saveAndFlush(emInjuryTypes);
        int databaseSizeBeforeDelete = emInjuryTypesRepository.findAll().size();

        // Get the emInjuryTypes
        restEmInjuryTypesMockMvc.perform(delete("/api/em-injury-types/{id}", emInjuryTypes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmInjuryTypes> emInjuryTypesList = emInjuryTypesRepository.findAll();
        assertThat(emInjuryTypesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmInjuryTypes.class);
        EmInjuryTypes emInjuryTypes1 = new EmInjuryTypes();
        emInjuryTypes1.setId(1L);
        EmInjuryTypes emInjuryTypes2 = new EmInjuryTypes();
        emInjuryTypes2.setId(emInjuryTypes1.getId());
        assertThat(emInjuryTypes1).isEqualTo(emInjuryTypes2);
        emInjuryTypes2.setId(2L);
        assertThat(emInjuryTypes1).isNotEqualTo(emInjuryTypes2);
        emInjuryTypes1.setId(null);
        assertThat(emInjuryTypes1).isNotEqualTo(emInjuryTypes2);
    }
}
