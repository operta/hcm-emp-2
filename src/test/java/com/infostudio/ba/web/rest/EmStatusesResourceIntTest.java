package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmStatuses;
import com.infostudio.ba.repository.EmStatusesRepository;
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
 * Test class for the EmStatusesResource REST controller.
 *
 * @see EmStatusesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmStatusesResourceIntTest {

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
    private EmStatusesRepository emStatusesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmStatusesMockMvc;

    private EmStatuses emStatuses;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmStatusesResource emStatusesResource = new EmStatusesResource(emStatusesRepository);
        this.restEmStatusesMockMvc = MockMvcBuilders.standaloneSetup(emStatusesResource)
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
    public static EmStatuses createEntity(EntityManager em) {
        EmStatuses emStatuses = new EmStatuses()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emStatuses;
    }

    @Before
    public void initTest() {
        emStatuses = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmStatuses() throws Exception {
        int databaseSizeBeforeCreate = emStatusesRepository.findAll().size();

        // Create the EmStatuses
        restEmStatusesMockMvc.perform(post("/api/em-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emStatuses)))
            .andExpect(status().isCreated());

        // Validate the EmStatuses in the database
        List<EmStatuses> emStatusesList = emStatusesRepository.findAll();
        assertThat(emStatusesList).hasSize(databaseSizeBeforeCreate + 1);
        EmStatuses testEmStatuses = emStatusesList.get(emStatusesList.size() - 1);
        assertThat(testEmStatuses.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testEmStatuses.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEmStatuses.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testEmStatuses.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmStatuses.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmStatuses.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmStatuses.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmStatusesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emStatusesRepository.findAll().size();

        // Create the EmStatuses with an existing ID
        emStatuses.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmStatusesMockMvc.perform(post("/api/em-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emStatuses)))
            .andExpect(status().isBadRequest());

        // Validate the EmStatuses in the database
        List<EmStatuses> emStatusesList = emStatusesRepository.findAll();
        assertThat(emStatusesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = emStatusesRepository.findAll().size();
        // set the field null
        emStatuses.setCode(null);

        // Create the EmStatuses, which fails.

        restEmStatusesMockMvc.perform(post("/api/em-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emStatuses)))
            .andExpect(status().isBadRequest());

        List<EmStatuses> emStatusesList = emStatusesRepository.findAll();
        assertThat(emStatusesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = emStatusesRepository.findAll().size();
        // set the field null
        emStatuses.setName(null);

        // Create the EmStatuses, which fails.

        restEmStatusesMockMvc.perform(post("/api/em-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emStatuses)))
            .andExpect(status().isBadRequest());

        List<EmStatuses> emStatusesList = emStatusesRepository.findAll();
        assertThat(emStatusesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmStatuses() throws Exception {
        // Initialize the database
        emStatusesRepository.saveAndFlush(emStatuses);

        // Get all the emStatusesList
        restEmStatusesMockMvc.perform(get("/api/em-statuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emStatuses.getId().intValue())))
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
    public void getEmStatuses() throws Exception {
        // Initialize the database
        emStatusesRepository.saveAndFlush(emStatuses);

        // Get the emStatuses
        restEmStatusesMockMvc.perform(get("/api/em-statuses/{id}", emStatuses.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emStatuses.getId().intValue()))
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
    public void getNonExistingEmStatuses() throws Exception {
        // Get the emStatuses
        restEmStatusesMockMvc.perform(get("/api/em-statuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmStatuses() throws Exception {
        // Initialize the database
        emStatusesRepository.saveAndFlush(emStatuses);
        int databaseSizeBeforeUpdate = emStatusesRepository.findAll().size();

        // Update the emStatuses
        EmStatuses updatedEmStatuses = emStatusesRepository.findOne(emStatuses.getId());
        // Disconnect from session so that the updates on updatedEmStatuses are not directly saved in db
        em.detach(updatedEmStatuses);
        updatedEmStatuses
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmStatusesMockMvc.perform(put("/api/em-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmStatuses)))
            .andExpect(status().isOk());

        // Validate the EmStatuses in the database
        List<EmStatuses> emStatusesList = emStatusesRepository.findAll();
        assertThat(emStatusesList).hasSize(databaseSizeBeforeUpdate);
        EmStatuses testEmStatuses = emStatusesList.get(emStatusesList.size() - 1);
        assertThat(testEmStatuses.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testEmStatuses.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEmStatuses.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testEmStatuses.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmStatuses.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmStatuses.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmStatuses.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmStatuses() throws Exception {
        int databaseSizeBeforeUpdate = emStatusesRepository.findAll().size();

        // Create the EmStatuses

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmStatusesMockMvc.perform(put("/api/em-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emStatuses)))
            .andExpect(status().isCreated());

        // Validate the EmStatuses in the database
        List<EmStatuses> emStatusesList = emStatusesRepository.findAll();
        assertThat(emStatusesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmStatuses() throws Exception {
        // Initialize the database
        emStatusesRepository.saveAndFlush(emStatuses);
        int databaseSizeBeforeDelete = emStatusesRepository.findAll().size();

        // Get the emStatuses
        restEmStatusesMockMvc.perform(delete("/api/em-statuses/{id}", emStatuses.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmStatuses> emStatusesList = emStatusesRepository.findAll();
        assertThat(emStatusesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmStatuses.class);
        EmStatuses emStatuses1 = new EmStatuses();
        emStatuses1.setId(1L);
        EmStatuses emStatuses2 = new EmStatuses();
        emStatuses2.setId(emStatuses1.getId());
        assertThat(emStatuses1).isEqualTo(emStatuses2);
        emStatuses2.setId(2L);
        assertThat(emStatuses1).isNotEqualTo(emStatuses2);
        emStatuses1.setId(null);
        assertThat(emStatuses1).isNotEqualTo(emStatuses2);
    }
}
