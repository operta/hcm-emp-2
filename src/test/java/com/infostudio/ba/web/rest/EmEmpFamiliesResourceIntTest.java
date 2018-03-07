package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmEmpFamilies;
import com.infostudio.ba.repository.EmEmpFamiliesRepository;
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
 * Test class for the EmEmpFamiliesResource REST controller.
 *
 * @see EmEmpFamiliesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmEmpFamiliesResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MIDDLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MIDDLE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SURNAME = "AAAAAAAAAA";
    private static final String UPDATED_SURNAME = "BBBBBBBBBB";

    private static final String DEFAULT_MAIDEN_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MAIDEN_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_IDENTIFICATION_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_IDENTIFICATION_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private EmEmpFamiliesRepository emEmpFamiliesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmEmpFamiliesMockMvc;

    private EmEmpFamilies emEmpFamilies;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmEmpFamiliesResource emEmpFamiliesResource = new EmEmpFamiliesResource(emEmpFamiliesRepository);
        this.restEmEmpFamiliesMockMvc = MockMvcBuilders.standaloneSetup(emEmpFamiliesResource)
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
    public static EmEmpFamilies createEntity(EntityManager em) {
        EmEmpFamilies emEmpFamilies = new EmEmpFamilies()
            .name(DEFAULT_NAME)
            .middleName(DEFAULT_MIDDLE_NAME)
            .surname(DEFAULT_SURNAME)
            .maidenName(DEFAULT_MAIDEN_NAME)
            .identificationNumber(DEFAULT_IDENTIFICATION_NUMBER)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emEmpFamilies;
    }

    @Before
    public void initTest() {
        emEmpFamilies = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmEmpFamilies() throws Exception {
        int databaseSizeBeforeCreate = emEmpFamiliesRepository.findAll().size();

        // Create the EmEmpFamilies
        restEmEmpFamiliesMockMvc.perform(post("/api/em-emp-families")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpFamilies)))
            .andExpect(status().isCreated());

        // Validate the EmEmpFamilies in the database
        List<EmEmpFamilies> emEmpFamiliesList = emEmpFamiliesRepository.findAll();
        assertThat(emEmpFamiliesList).hasSize(databaseSizeBeforeCreate + 1);
        EmEmpFamilies testEmEmpFamilies = emEmpFamiliesList.get(emEmpFamiliesList.size() - 1);
        assertThat(testEmEmpFamilies.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEmEmpFamilies.getMiddleName()).isEqualTo(DEFAULT_MIDDLE_NAME);
        assertThat(testEmEmpFamilies.getSurname()).isEqualTo(DEFAULT_SURNAME);
        assertThat(testEmEmpFamilies.getMaidenName()).isEqualTo(DEFAULT_MAIDEN_NAME);
        assertThat(testEmEmpFamilies.getIdentificationNumber()).isEqualTo(DEFAULT_IDENTIFICATION_NUMBER);
        assertThat(testEmEmpFamilies.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmEmpFamilies.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmEmpFamilies.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmEmpFamilies.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmEmpFamiliesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emEmpFamiliesRepository.findAll().size();

        // Create the EmEmpFamilies with an existing ID
        emEmpFamilies.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmEmpFamiliesMockMvc.perform(post("/api/em-emp-families")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpFamilies)))
            .andExpect(status().isBadRequest());

        // Validate the EmEmpFamilies in the database
        List<EmEmpFamilies> emEmpFamiliesList = emEmpFamiliesRepository.findAll();
        assertThat(emEmpFamiliesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = emEmpFamiliesRepository.findAll().size();
        // set the field null
        emEmpFamilies.setName(null);

        // Create the EmEmpFamilies, which fails.

        restEmEmpFamiliesMockMvc.perform(post("/api/em-emp-families")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpFamilies)))
            .andExpect(status().isBadRequest());

        List<EmEmpFamilies> emEmpFamiliesList = emEmpFamiliesRepository.findAll();
        assertThat(emEmpFamiliesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmEmpFamilies() throws Exception {
        // Initialize the database
        emEmpFamiliesRepository.saveAndFlush(emEmpFamilies);

        // Get all the emEmpFamiliesList
        restEmEmpFamiliesMockMvc.perform(get("/api/em-emp-families?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emEmpFamilies.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].middleName").value(hasItem(DEFAULT_MIDDLE_NAME.toString())))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME.toString())))
            .andExpect(jsonPath("$.[*].maidenName").value(hasItem(DEFAULT_MAIDEN_NAME.toString())))
            .andExpect(jsonPath("$.[*].identificationNumber").value(hasItem(DEFAULT_IDENTIFICATION_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getEmEmpFamilies() throws Exception {
        // Initialize the database
        emEmpFamiliesRepository.saveAndFlush(emEmpFamilies);

        // Get the emEmpFamilies
        restEmEmpFamiliesMockMvc.perform(get("/api/em-emp-families/{id}", emEmpFamilies.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emEmpFamilies.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.middleName").value(DEFAULT_MIDDLE_NAME.toString()))
            .andExpect(jsonPath("$.surname").value(DEFAULT_SURNAME.toString()))
            .andExpect(jsonPath("$.maidenName").value(DEFAULT_MAIDEN_NAME.toString()))
            .andExpect(jsonPath("$.identificationNumber").value(DEFAULT_IDENTIFICATION_NUMBER.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmEmpFamilies() throws Exception {
        // Get the emEmpFamilies
        restEmEmpFamiliesMockMvc.perform(get("/api/em-emp-families/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmEmpFamilies() throws Exception {
        // Initialize the database
        emEmpFamiliesRepository.saveAndFlush(emEmpFamilies);
        int databaseSizeBeforeUpdate = emEmpFamiliesRepository.findAll().size();

        // Update the emEmpFamilies
        EmEmpFamilies updatedEmEmpFamilies = emEmpFamiliesRepository.findOne(emEmpFamilies.getId());
        // Disconnect from session so that the updates on updatedEmEmpFamilies are not directly saved in db
        em.detach(updatedEmEmpFamilies);
        updatedEmEmpFamilies
            .name(UPDATED_NAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .surname(UPDATED_SURNAME)
            .maidenName(UPDATED_MAIDEN_NAME)
            .identificationNumber(UPDATED_IDENTIFICATION_NUMBER)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmEmpFamiliesMockMvc.perform(put("/api/em-emp-families")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmEmpFamilies)))
            .andExpect(status().isOk());

        // Validate the EmEmpFamilies in the database
        List<EmEmpFamilies> emEmpFamiliesList = emEmpFamiliesRepository.findAll();
        assertThat(emEmpFamiliesList).hasSize(databaseSizeBeforeUpdate);
        EmEmpFamilies testEmEmpFamilies = emEmpFamiliesList.get(emEmpFamiliesList.size() - 1);
        assertThat(testEmEmpFamilies.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEmEmpFamilies.getMiddleName()).isEqualTo(UPDATED_MIDDLE_NAME);
        assertThat(testEmEmpFamilies.getSurname()).isEqualTo(UPDATED_SURNAME);
        assertThat(testEmEmpFamilies.getMaidenName()).isEqualTo(UPDATED_MAIDEN_NAME);
        assertThat(testEmEmpFamilies.getIdentificationNumber()).isEqualTo(UPDATED_IDENTIFICATION_NUMBER);
        assertThat(testEmEmpFamilies.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmEmpFamilies.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmEmpFamilies.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmEmpFamilies.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmEmpFamilies() throws Exception {
        int databaseSizeBeforeUpdate = emEmpFamiliesRepository.findAll().size();

        // Create the EmEmpFamilies

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmEmpFamiliesMockMvc.perform(put("/api/em-emp-families")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpFamilies)))
            .andExpect(status().isCreated());

        // Validate the EmEmpFamilies in the database
        List<EmEmpFamilies> emEmpFamiliesList = emEmpFamiliesRepository.findAll();
        assertThat(emEmpFamiliesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmEmpFamilies() throws Exception {
        // Initialize the database
        emEmpFamiliesRepository.saveAndFlush(emEmpFamilies);
        int databaseSizeBeforeDelete = emEmpFamiliesRepository.findAll().size();

        // Get the emEmpFamilies
        restEmEmpFamiliesMockMvc.perform(delete("/api/em-emp-families/{id}", emEmpFamilies.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmEmpFamilies> emEmpFamiliesList = emEmpFamiliesRepository.findAll();
        assertThat(emEmpFamiliesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmEmpFamilies.class);
        EmEmpFamilies emEmpFamilies1 = new EmEmpFamilies();
        emEmpFamilies1.setId(1L);
        EmEmpFamilies emEmpFamilies2 = new EmEmpFamilies();
        emEmpFamilies2.setId(emEmpFamilies1.getId());
        assertThat(emEmpFamilies1).isEqualTo(emEmpFamilies2);
        emEmpFamilies2.setId(2L);
        assertThat(emEmpFamilies1).isNotEqualTo(emEmpFamilies2);
        emEmpFamilies1.setId(null);
        assertThat(emEmpFamilies1).isNotEqualTo(emEmpFamilies2);
    }
}
