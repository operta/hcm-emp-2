package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmRewardTypes;
import com.infostudio.ba.repository.EmRewardTypesRepository;
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
 * Test class for the EmRewardTypesResource REST controller.
 *
 * @see EmRewardTypesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmRewardTypesResourceIntTest {

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
    private EmRewardTypesRepository emRewardTypesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmRewardTypesMockMvc;

    private EmRewardTypes emRewardTypes;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmRewardTypesResource emRewardTypesResource = new EmRewardTypesResource(emRewardTypesRepository);
        this.restEmRewardTypesMockMvc = MockMvcBuilders.standaloneSetup(emRewardTypesResource)
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
    public static EmRewardTypes createEntity(EntityManager em) {
        EmRewardTypes emRewardTypes = new EmRewardTypes()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emRewardTypes;
    }

    @Before
    public void initTest() {
        emRewardTypes = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmRewardTypes() throws Exception {
        int databaseSizeBeforeCreate = emRewardTypesRepository.findAll().size();

        // Create the EmRewardTypes
        restEmRewardTypesMockMvc.perform(post("/api/em-reward-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emRewardTypes)))
            .andExpect(status().isCreated());

        // Validate the EmRewardTypes in the database
        List<EmRewardTypes> emRewardTypesList = emRewardTypesRepository.findAll();
        assertThat(emRewardTypesList).hasSize(databaseSizeBeforeCreate + 1);
        EmRewardTypes testEmRewardTypes = emRewardTypesList.get(emRewardTypesList.size() - 1);
        assertThat(testEmRewardTypes.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testEmRewardTypes.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEmRewardTypes.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testEmRewardTypes.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmRewardTypes.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmRewardTypes.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmRewardTypes.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmRewardTypesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emRewardTypesRepository.findAll().size();

        // Create the EmRewardTypes with an existing ID
        emRewardTypes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmRewardTypesMockMvc.perform(post("/api/em-reward-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emRewardTypes)))
            .andExpect(status().isBadRequest());

        // Validate the EmRewardTypes in the database
        List<EmRewardTypes> emRewardTypesList = emRewardTypesRepository.findAll();
        assertThat(emRewardTypesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = emRewardTypesRepository.findAll().size();
        // set the field null
        emRewardTypes.setCode(null);

        // Create the EmRewardTypes, which fails.

        restEmRewardTypesMockMvc.perform(post("/api/em-reward-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emRewardTypes)))
            .andExpect(status().isBadRequest());

        List<EmRewardTypes> emRewardTypesList = emRewardTypesRepository.findAll();
        assertThat(emRewardTypesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = emRewardTypesRepository.findAll().size();
        // set the field null
        emRewardTypes.setName(null);

        // Create the EmRewardTypes, which fails.

        restEmRewardTypesMockMvc.perform(post("/api/em-reward-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emRewardTypes)))
            .andExpect(status().isBadRequest());

        List<EmRewardTypes> emRewardTypesList = emRewardTypesRepository.findAll();
        assertThat(emRewardTypesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmRewardTypes() throws Exception {
        // Initialize the database
        emRewardTypesRepository.saveAndFlush(emRewardTypes);

        // Get all the emRewardTypesList
        restEmRewardTypesMockMvc.perform(get("/api/em-reward-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emRewardTypes.getId().intValue())))
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
    public void getEmRewardTypes() throws Exception {
        // Initialize the database
        emRewardTypesRepository.saveAndFlush(emRewardTypes);

        // Get the emRewardTypes
        restEmRewardTypesMockMvc.perform(get("/api/em-reward-types/{id}", emRewardTypes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emRewardTypes.getId().intValue()))
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
    public void getNonExistingEmRewardTypes() throws Exception {
        // Get the emRewardTypes
        restEmRewardTypesMockMvc.perform(get("/api/em-reward-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmRewardTypes() throws Exception {
        // Initialize the database
        emRewardTypesRepository.saveAndFlush(emRewardTypes);
        int databaseSizeBeforeUpdate = emRewardTypesRepository.findAll().size();

        // Update the emRewardTypes
        EmRewardTypes updatedEmRewardTypes = emRewardTypesRepository.findOne(emRewardTypes.getId());
        // Disconnect from session so that the updates on updatedEmRewardTypes are not directly saved in db
        em.detach(updatedEmRewardTypes);
        updatedEmRewardTypes
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmRewardTypesMockMvc.perform(put("/api/em-reward-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmRewardTypes)))
            .andExpect(status().isOk());

        // Validate the EmRewardTypes in the database
        List<EmRewardTypes> emRewardTypesList = emRewardTypesRepository.findAll();
        assertThat(emRewardTypesList).hasSize(databaseSizeBeforeUpdate);
        EmRewardTypes testEmRewardTypes = emRewardTypesList.get(emRewardTypesList.size() - 1);
        assertThat(testEmRewardTypes.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testEmRewardTypes.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEmRewardTypes.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testEmRewardTypes.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmRewardTypes.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmRewardTypes.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmRewardTypes.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmRewardTypes() throws Exception {
        int databaseSizeBeforeUpdate = emRewardTypesRepository.findAll().size();

        // Create the EmRewardTypes

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmRewardTypesMockMvc.perform(put("/api/em-reward-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emRewardTypes)))
            .andExpect(status().isCreated());

        // Validate the EmRewardTypes in the database
        List<EmRewardTypes> emRewardTypesList = emRewardTypesRepository.findAll();
        assertThat(emRewardTypesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmRewardTypes() throws Exception {
        // Initialize the database
        emRewardTypesRepository.saveAndFlush(emRewardTypes);
        int databaseSizeBeforeDelete = emRewardTypesRepository.findAll().size();

        // Get the emRewardTypes
        restEmRewardTypesMockMvc.perform(delete("/api/em-reward-types/{id}", emRewardTypes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmRewardTypes> emRewardTypesList = emRewardTypesRepository.findAll();
        assertThat(emRewardTypesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmRewardTypes.class);
        EmRewardTypes emRewardTypes1 = new EmRewardTypes();
        emRewardTypes1.setId(1L);
        EmRewardTypes emRewardTypes2 = new EmRewardTypes();
        emRewardTypes2.setId(emRewardTypes1.getId());
        assertThat(emRewardTypes1).isEqualTo(emRewardTypes2);
        emRewardTypes2.setId(2L);
        assertThat(emRewardTypes1).isNotEqualTo(emRewardTypes2);
        emRewardTypes1.setId(null);
        assertThat(emRewardTypes1).isNotEqualTo(emRewardTypes2);
    }
}
