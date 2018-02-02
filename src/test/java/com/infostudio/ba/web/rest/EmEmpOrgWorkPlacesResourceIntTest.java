package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmEmpOrgWorkPlaces;
import com.infostudio.ba.repository.EmEmpOrgWorkPlacesRepository;
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
 * Test class for the EmEmpOrgWorkPlacesResource REST controller.
 *
 * @see EmEmpOrgWorkPlacesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmEmpOrgWorkPlacesResourceIntTest {

    private static final LocalDate DEFAULT_DATE_FROM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_FROM = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_TO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_TO = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_WORK_HISTORY_COEFFICIENT = 1;
    private static final Integer UPDATED_WORK_HISTORY_COEFFICIENT = 2;

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private EmEmpOrgWorkPlacesRepository emEmpOrgWorkPlacesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmEmpOrgWorkPlacesMockMvc;

    private EmEmpOrgWorkPlaces emEmpOrgWorkPlaces;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmEmpOrgWorkPlacesResource emEmpOrgWorkPlacesResource = new EmEmpOrgWorkPlacesResource(emEmpOrgWorkPlacesRepository);
        this.restEmEmpOrgWorkPlacesMockMvc = MockMvcBuilders.standaloneSetup(emEmpOrgWorkPlacesResource)
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
    public static EmEmpOrgWorkPlaces createEntity(EntityManager em) {
        EmEmpOrgWorkPlaces emEmpOrgWorkPlaces = new EmEmpOrgWorkPlaces()
            .dateFrom(DEFAULT_DATE_FROM)
            .dateTo(DEFAULT_DATE_TO)
            .workHistoryCoefficient(DEFAULT_WORK_HISTORY_COEFFICIENT)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emEmpOrgWorkPlaces;
    }

    @Before
    public void initTest() {
        emEmpOrgWorkPlaces = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmEmpOrgWorkPlaces() throws Exception {
        int databaseSizeBeforeCreate = emEmpOrgWorkPlacesRepository.findAll().size();

        // Create the EmEmpOrgWorkPlaces
        restEmEmpOrgWorkPlacesMockMvc.perform(post("/api/em-emp-org-work-places")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpOrgWorkPlaces)))
            .andExpect(status().isCreated());

        // Validate the EmEmpOrgWorkPlaces in the database
        List<EmEmpOrgWorkPlaces> emEmpOrgWorkPlacesList = emEmpOrgWorkPlacesRepository.findAll();
        assertThat(emEmpOrgWorkPlacesList).hasSize(databaseSizeBeforeCreate + 1);
        EmEmpOrgWorkPlaces testEmEmpOrgWorkPlaces = emEmpOrgWorkPlacesList.get(emEmpOrgWorkPlacesList.size() - 1);
        assertThat(testEmEmpOrgWorkPlaces.getDateFrom()).isEqualTo(DEFAULT_DATE_FROM);
        assertThat(testEmEmpOrgWorkPlaces.getDateTo()).isEqualTo(DEFAULT_DATE_TO);
        assertThat(testEmEmpOrgWorkPlaces.getWorkHistoryCoefficient()).isEqualTo(DEFAULT_WORK_HISTORY_COEFFICIENT);
        assertThat(testEmEmpOrgWorkPlaces.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmEmpOrgWorkPlaces.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmEmpOrgWorkPlaces.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmEmpOrgWorkPlaces.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmEmpOrgWorkPlacesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emEmpOrgWorkPlacesRepository.findAll().size();

        // Create the EmEmpOrgWorkPlaces with an existing ID
        emEmpOrgWorkPlaces.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmEmpOrgWorkPlacesMockMvc.perform(post("/api/em-emp-org-work-places")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpOrgWorkPlaces)))
            .andExpect(status().isBadRequest());

        // Validate the EmEmpOrgWorkPlaces in the database
        List<EmEmpOrgWorkPlaces> emEmpOrgWorkPlacesList = emEmpOrgWorkPlacesRepository.findAll();
        assertThat(emEmpOrgWorkPlacesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateFromIsRequired() throws Exception {
        int databaseSizeBeforeTest = emEmpOrgWorkPlacesRepository.findAll().size();
        // set the field null
        emEmpOrgWorkPlaces.setDateFrom(null);

        // Create the EmEmpOrgWorkPlaces, which fails.

        restEmEmpOrgWorkPlacesMockMvc.perform(post("/api/em-emp-org-work-places")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpOrgWorkPlaces)))
            .andExpect(status().isBadRequest());

        List<EmEmpOrgWorkPlaces> emEmpOrgWorkPlacesList = emEmpOrgWorkPlacesRepository.findAll();
        assertThat(emEmpOrgWorkPlacesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmEmpOrgWorkPlaces() throws Exception {
        // Initialize the database
        emEmpOrgWorkPlacesRepository.saveAndFlush(emEmpOrgWorkPlaces);

        // Get all the emEmpOrgWorkPlacesList
        restEmEmpOrgWorkPlacesMockMvc.perform(get("/api/em-emp-org-work-places?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emEmpOrgWorkPlaces.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateFrom").value(hasItem(DEFAULT_DATE_FROM.toString())))
            .andExpect(jsonPath("$.[*].dateTo").value(hasItem(DEFAULT_DATE_TO.toString())))
            .andExpect(jsonPath("$.[*].workHistoryCoefficient").value(hasItem(DEFAULT_WORK_HISTORY_COEFFICIENT)))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getEmEmpOrgWorkPlaces() throws Exception {
        // Initialize the database
        emEmpOrgWorkPlacesRepository.saveAndFlush(emEmpOrgWorkPlaces);

        // Get the emEmpOrgWorkPlaces
        restEmEmpOrgWorkPlacesMockMvc.perform(get("/api/em-emp-org-work-places/{id}", emEmpOrgWorkPlaces.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emEmpOrgWorkPlaces.getId().intValue()))
            .andExpect(jsonPath("$.dateFrom").value(DEFAULT_DATE_FROM.toString()))
            .andExpect(jsonPath("$.dateTo").value(DEFAULT_DATE_TO.toString()))
            .andExpect(jsonPath("$.workHistoryCoefficient").value(DEFAULT_WORK_HISTORY_COEFFICIENT))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmEmpOrgWorkPlaces() throws Exception {
        // Get the emEmpOrgWorkPlaces
        restEmEmpOrgWorkPlacesMockMvc.perform(get("/api/em-emp-org-work-places/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmEmpOrgWorkPlaces() throws Exception {
        // Initialize the database
        emEmpOrgWorkPlacesRepository.saveAndFlush(emEmpOrgWorkPlaces);
        int databaseSizeBeforeUpdate = emEmpOrgWorkPlacesRepository.findAll().size();

        // Update the emEmpOrgWorkPlaces
        EmEmpOrgWorkPlaces updatedEmEmpOrgWorkPlaces = emEmpOrgWorkPlacesRepository.findOne(emEmpOrgWorkPlaces.getId());
        // Disconnect from session so that the updates on updatedEmEmpOrgWorkPlaces are not directly saved in db
        em.detach(updatedEmEmpOrgWorkPlaces);
        updatedEmEmpOrgWorkPlaces
            .dateFrom(UPDATED_DATE_FROM)
            .dateTo(UPDATED_DATE_TO)
            .workHistoryCoefficient(UPDATED_WORK_HISTORY_COEFFICIENT)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmEmpOrgWorkPlacesMockMvc.perform(put("/api/em-emp-org-work-places")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmEmpOrgWorkPlaces)))
            .andExpect(status().isOk());

        // Validate the EmEmpOrgWorkPlaces in the database
        List<EmEmpOrgWorkPlaces> emEmpOrgWorkPlacesList = emEmpOrgWorkPlacesRepository.findAll();
        assertThat(emEmpOrgWorkPlacesList).hasSize(databaseSizeBeforeUpdate);
        EmEmpOrgWorkPlaces testEmEmpOrgWorkPlaces = emEmpOrgWorkPlacesList.get(emEmpOrgWorkPlacesList.size() - 1);
        assertThat(testEmEmpOrgWorkPlaces.getDateFrom()).isEqualTo(UPDATED_DATE_FROM);
        assertThat(testEmEmpOrgWorkPlaces.getDateTo()).isEqualTo(UPDATED_DATE_TO);
        assertThat(testEmEmpOrgWorkPlaces.getWorkHistoryCoefficient()).isEqualTo(UPDATED_WORK_HISTORY_COEFFICIENT);
        assertThat(testEmEmpOrgWorkPlaces.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmEmpOrgWorkPlaces.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmEmpOrgWorkPlaces.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmEmpOrgWorkPlaces.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmEmpOrgWorkPlaces() throws Exception {
        int databaseSizeBeforeUpdate = emEmpOrgWorkPlacesRepository.findAll().size();

        // Create the EmEmpOrgWorkPlaces

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmEmpOrgWorkPlacesMockMvc.perform(put("/api/em-emp-org-work-places")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpOrgWorkPlaces)))
            .andExpect(status().isCreated());

        // Validate the EmEmpOrgWorkPlaces in the database
        List<EmEmpOrgWorkPlaces> emEmpOrgWorkPlacesList = emEmpOrgWorkPlacesRepository.findAll();
        assertThat(emEmpOrgWorkPlacesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmEmpOrgWorkPlaces() throws Exception {
        // Initialize the database
        emEmpOrgWorkPlacesRepository.saveAndFlush(emEmpOrgWorkPlaces);
        int databaseSizeBeforeDelete = emEmpOrgWorkPlacesRepository.findAll().size();

        // Get the emEmpOrgWorkPlaces
        restEmEmpOrgWorkPlacesMockMvc.perform(delete("/api/em-emp-org-work-places/{id}", emEmpOrgWorkPlaces.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmEmpOrgWorkPlaces> emEmpOrgWorkPlacesList = emEmpOrgWorkPlacesRepository.findAll();
        assertThat(emEmpOrgWorkPlacesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmEmpOrgWorkPlaces.class);
        EmEmpOrgWorkPlaces emEmpOrgWorkPlaces1 = new EmEmpOrgWorkPlaces();
        emEmpOrgWorkPlaces1.setId(1L);
        EmEmpOrgWorkPlaces emEmpOrgWorkPlaces2 = new EmEmpOrgWorkPlaces();
        emEmpOrgWorkPlaces2.setId(emEmpOrgWorkPlaces1.getId());
        assertThat(emEmpOrgWorkPlaces1).isEqualTo(emEmpOrgWorkPlaces2);
        emEmpOrgWorkPlaces2.setId(2L);
        assertThat(emEmpOrgWorkPlaces1).isNotEqualTo(emEmpOrgWorkPlaces2);
        emEmpOrgWorkPlaces1.setId(null);
        assertThat(emEmpOrgWorkPlaces1).isNotEqualTo(emEmpOrgWorkPlaces2);
    }
}
