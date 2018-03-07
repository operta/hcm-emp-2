package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmEmpIdentifications;
import com.infostudio.ba.repository.EmEmpIdentificationsRepository;
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
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.infostudio.ba.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EmEmpIdentificationsResource REST controller.
 *
 * @see EmEmpIdentificationsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmEmpIdentificationsResourceIntTest {

    private static final String DEFAULT_IDENTIFICATION_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_IDENTIFICATION_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_JURISDICTION = "AAAAAAAAAA";
    private static final String UPDATED_JURISDICTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_VALID_THROUGH = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_VALID_THROUGH = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private EmEmpIdentificationsRepository emEmpIdentificationsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmEmpIdentificationsMockMvc;

    private EmEmpIdentifications emEmpIdentifications;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmEmpIdentificationsResource emEmpIdentificationsResource = new EmEmpIdentificationsResource(emEmpIdentificationsRepository);
        this.restEmEmpIdentificationsMockMvc = MockMvcBuilders.standaloneSetup(emEmpIdentificationsResource)
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
    public static EmEmpIdentifications createEntity(EntityManager em) {
        EmEmpIdentifications emEmpIdentifications = new EmEmpIdentifications()
            .identificationNumber(DEFAULT_IDENTIFICATION_NUMBER)
            .jurisdiction(DEFAULT_JURISDICTION)
            .validThrough(DEFAULT_VALID_THROUGH)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emEmpIdentifications;
    }

    @Before
    public void initTest() {
        emEmpIdentifications = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmEmpIdentifications() throws Exception {
        int databaseSizeBeforeCreate = emEmpIdentificationsRepository.findAll().size();

        // Create the EmEmpIdentifications
        restEmEmpIdentificationsMockMvc.perform(post("/api/em-emp-identifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpIdentifications)))
            .andExpect(status().isCreated());

        // Validate the EmEmpIdentifications in the database
        List<EmEmpIdentifications> emEmpIdentificationsList = emEmpIdentificationsRepository.findAll();
        assertThat(emEmpIdentificationsList).hasSize(databaseSizeBeforeCreate + 1);
        EmEmpIdentifications testEmEmpIdentifications = emEmpIdentificationsList.get(emEmpIdentificationsList.size() - 1);
        assertThat(testEmEmpIdentifications.getIdentificationNumber()).isEqualTo(DEFAULT_IDENTIFICATION_NUMBER);
        assertThat(testEmEmpIdentifications.getJurisdiction()).isEqualTo(DEFAULT_JURISDICTION);
        assertThat(testEmEmpIdentifications.getValidThrough()).isEqualTo(DEFAULT_VALID_THROUGH);
        assertThat(testEmEmpIdentifications.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmEmpIdentifications.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmEmpIdentifications.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmEmpIdentifications.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmEmpIdentificationsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emEmpIdentificationsRepository.findAll().size();

        // Create the EmEmpIdentifications with an existing ID
        emEmpIdentifications.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmEmpIdentificationsMockMvc.perform(post("/api/em-emp-identifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpIdentifications)))
            .andExpect(status().isBadRequest());

        // Validate the EmEmpIdentifications in the database
        List<EmEmpIdentifications> emEmpIdentificationsList = emEmpIdentificationsRepository.findAll();
        assertThat(emEmpIdentificationsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkIdentificationNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = emEmpIdentificationsRepository.findAll().size();
        // set the field null
        emEmpIdentifications.setIdentificationNumber(null);

        // Create the EmEmpIdentifications, which fails.

        restEmEmpIdentificationsMockMvc.perform(post("/api/em-emp-identifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpIdentifications)))
            .andExpect(status().isBadRequest());

        List<EmEmpIdentifications> emEmpIdentificationsList = emEmpIdentificationsRepository.findAll();
        assertThat(emEmpIdentificationsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmEmpIdentifications() throws Exception {
        // Initialize the database
        emEmpIdentificationsRepository.saveAndFlush(emEmpIdentifications);

        // Get all the emEmpIdentificationsList
        restEmEmpIdentificationsMockMvc.perform(get("/api/em-emp-identifications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emEmpIdentifications.getId().intValue())))
            .andExpect(jsonPath("$.[*].identificationNumber").value(hasItem(DEFAULT_IDENTIFICATION_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].jurisdiction").value(hasItem(DEFAULT_JURISDICTION.toString())))
            .andExpect(jsonPath("$.[*].validThrough").value(hasItem(DEFAULT_VALID_THROUGH.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getEmEmpIdentifications() throws Exception {
        // Initialize the database
        emEmpIdentificationsRepository.saveAndFlush(emEmpIdentifications);

        // Get the emEmpIdentifications
        restEmEmpIdentificationsMockMvc.perform(get("/api/em-emp-identifications/{id}", emEmpIdentifications.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emEmpIdentifications.getId().intValue()))
            .andExpect(jsonPath("$.identificationNumber").value(DEFAULT_IDENTIFICATION_NUMBER.toString()))
            .andExpect(jsonPath("$.jurisdiction").value(DEFAULT_JURISDICTION.toString()))
            .andExpect(jsonPath("$.validThrough").value(DEFAULT_VALID_THROUGH.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmEmpIdentifications() throws Exception {
        // Get the emEmpIdentifications
        restEmEmpIdentificationsMockMvc.perform(get("/api/em-emp-identifications/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmEmpIdentifications() throws Exception {
        // Initialize the database
        emEmpIdentificationsRepository.saveAndFlush(emEmpIdentifications);
        int databaseSizeBeforeUpdate = emEmpIdentificationsRepository.findAll().size();

        // Update the emEmpIdentifications
        EmEmpIdentifications updatedEmEmpIdentifications = emEmpIdentificationsRepository.findOne(emEmpIdentifications.getId());
        // Disconnect from session so that the updates on updatedEmEmpIdentifications are not directly saved in db
        em.detach(updatedEmEmpIdentifications);
        updatedEmEmpIdentifications
            .identificationNumber(UPDATED_IDENTIFICATION_NUMBER)
            .jurisdiction(UPDATED_JURISDICTION)
            .validThrough(UPDATED_VALID_THROUGH)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmEmpIdentificationsMockMvc.perform(put("/api/em-emp-identifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmEmpIdentifications)))
            .andExpect(status().isOk());

        // Validate the EmEmpIdentifications in the database
        List<EmEmpIdentifications> emEmpIdentificationsList = emEmpIdentificationsRepository.findAll();
        assertThat(emEmpIdentificationsList).hasSize(databaseSizeBeforeUpdate);
        EmEmpIdentifications testEmEmpIdentifications = emEmpIdentificationsList.get(emEmpIdentificationsList.size() - 1);
        assertThat(testEmEmpIdentifications.getIdentificationNumber()).isEqualTo(UPDATED_IDENTIFICATION_NUMBER);
        assertThat(testEmEmpIdentifications.getJurisdiction()).isEqualTo(UPDATED_JURISDICTION);
        assertThat(testEmEmpIdentifications.getValidThrough()).isEqualTo(UPDATED_VALID_THROUGH);
        assertThat(testEmEmpIdentifications.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmEmpIdentifications.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmEmpIdentifications.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmEmpIdentifications.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmEmpIdentifications() throws Exception {
        int databaseSizeBeforeUpdate = emEmpIdentificationsRepository.findAll().size();

        // Create the EmEmpIdentifications

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmEmpIdentificationsMockMvc.perform(put("/api/em-emp-identifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpIdentifications)))
            .andExpect(status().isCreated());

        // Validate the EmEmpIdentifications in the database
        List<EmEmpIdentifications> emEmpIdentificationsList = emEmpIdentificationsRepository.findAll();
        assertThat(emEmpIdentificationsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmEmpIdentifications() throws Exception {
        // Initialize the database
        emEmpIdentificationsRepository.saveAndFlush(emEmpIdentifications);
        int databaseSizeBeforeDelete = emEmpIdentificationsRepository.findAll().size();

        // Get the emEmpIdentifications
        restEmEmpIdentificationsMockMvc.perform(delete("/api/em-emp-identifications/{id}", emEmpIdentifications.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmEmpIdentifications> emEmpIdentificationsList = emEmpIdentificationsRepository.findAll();
        assertThat(emEmpIdentificationsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmEmpIdentifications.class);
        EmEmpIdentifications emEmpIdentifications1 = new EmEmpIdentifications();
        emEmpIdentifications1.setId(1L);
        EmEmpIdentifications emEmpIdentifications2 = new EmEmpIdentifications();
        emEmpIdentifications2.setId(emEmpIdentifications1.getId());
        assertThat(emEmpIdentifications1).isEqualTo(emEmpIdentifications2);
        emEmpIdentifications2.setId(2L);
        assertThat(emEmpIdentifications1).isNotEqualTo(emEmpIdentifications2);
        emEmpIdentifications1.setId(null);
        assertThat(emEmpIdentifications1).isNotEqualTo(emEmpIdentifications2);
    }
}
