package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmEmpPreviousJobs;
import com.infostudio.ba.repository.EmEmpPreviousJobsRepository;
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
 * Test class for the EmEmpPreviousJobsResource REST controller.
 *
 * @see EmEmpPreviousJobsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmEmpPreviousJobsResourceIntTest {

    private static final String DEFAULT_COMPANY = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY = "BBBBBBBBBB";

    private static final String DEFAULT_POSITION = "AAAAAAAAAA";
    private static final String UPDATED_POSITION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_FROM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_FROM = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_TO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_TO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_REASON_OF_LEAVING = "AAAAAAAAAA";
    private static final String UPDATED_REASON_OF_LEAVING = "BBBBBBBBBB";

    private static final String DEFAULT_MANAGER_POSITION = "AAAAAAAAAA";
    private static final String UPDATED_MANAGER_POSITION = "BBBBBBBBBB";

    private static final Integer DEFAULT_LENGTH_OF_SERVICE_YEARS = 1;
    private static final Integer UPDATED_LENGTH_OF_SERVICE_YEARS = 2;

    private static final Integer DEFAULT_LENGTH_OF_SERVICE_MONTHS = 1;
    private static final Integer UPDATED_LENGTH_OF_SERVICE_MONTHS = 2;

    private static final Integer DEFAULT_LENGTH_OF_SERVICE_DAYS = 1;
    private static final Integer UPDATED_LENGTH_OF_SERVICE_DAYS = 2;

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private EmEmpPreviousJobsRepository emEmpPreviousJobsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmEmpPreviousJobsMockMvc;

    private EmEmpPreviousJobs emEmpPreviousJobs;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmEmpPreviousJobsResource emEmpPreviousJobsResource = new EmEmpPreviousJobsResource(emEmpPreviousJobsRepository);
        this.restEmEmpPreviousJobsMockMvc = MockMvcBuilders.standaloneSetup(emEmpPreviousJobsResource)
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
    public static EmEmpPreviousJobs createEntity(EntityManager em) {
        EmEmpPreviousJobs emEmpPreviousJobs = new EmEmpPreviousJobs()
            .company(DEFAULT_COMPANY)
            .position(DEFAULT_POSITION)
            .dateFrom(DEFAULT_DATE_FROM)
            .dateTo(DEFAULT_DATE_TO)
            .reasonOfLeaving(DEFAULT_REASON_OF_LEAVING)
            .managerPosition(DEFAULT_MANAGER_POSITION)
            .lengthOfServiceYears(DEFAULT_LENGTH_OF_SERVICE_YEARS)
            .lengthOfServiceMonths(DEFAULT_LENGTH_OF_SERVICE_MONTHS)
            .lengthOfServiceDays(DEFAULT_LENGTH_OF_SERVICE_DAYS)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emEmpPreviousJobs;
    }

    @Before
    public void initTest() {
        emEmpPreviousJobs = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmEmpPreviousJobs() throws Exception {
        int databaseSizeBeforeCreate = emEmpPreviousJobsRepository.findAll().size();

        // Create the EmEmpPreviousJobs
        restEmEmpPreviousJobsMockMvc.perform(post("/api/em-emp-previous-jobs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpPreviousJobs)))
            .andExpect(status().isCreated());

        // Validate the EmEmpPreviousJobs in the database
        List<EmEmpPreviousJobs> emEmpPreviousJobsList = emEmpPreviousJobsRepository.findAll();
        assertThat(emEmpPreviousJobsList).hasSize(databaseSizeBeforeCreate + 1);
        EmEmpPreviousJobs testEmEmpPreviousJobs = emEmpPreviousJobsList.get(emEmpPreviousJobsList.size() - 1);
        assertThat(testEmEmpPreviousJobs.getCompany()).isEqualTo(DEFAULT_COMPANY);
        assertThat(testEmEmpPreviousJobs.getPosition()).isEqualTo(DEFAULT_POSITION);
        assertThat(testEmEmpPreviousJobs.getDateFrom()).isEqualTo(DEFAULT_DATE_FROM);
        assertThat(testEmEmpPreviousJobs.getDateTo()).isEqualTo(DEFAULT_DATE_TO);
        assertThat(testEmEmpPreviousJobs.getReasonOfLeaving()).isEqualTo(DEFAULT_REASON_OF_LEAVING);
        assertThat(testEmEmpPreviousJobs.getManagerPosition()).isEqualTo(DEFAULT_MANAGER_POSITION);
        assertThat(testEmEmpPreviousJobs.getLengthOfServiceYears()).isEqualTo(DEFAULT_LENGTH_OF_SERVICE_YEARS);
        assertThat(testEmEmpPreviousJobs.getLengthOfServiceMonths()).isEqualTo(DEFAULT_LENGTH_OF_SERVICE_MONTHS);
        assertThat(testEmEmpPreviousJobs.getLengthOfServiceDays()).isEqualTo(DEFAULT_LENGTH_OF_SERVICE_DAYS);
        assertThat(testEmEmpPreviousJobs.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmEmpPreviousJobs.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmEmpPreviousJobs.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmEmpPreviousJobs.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmEmpPreviousJobsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emEmpPreviousJobsRepository.findAll().size();

        // Create the EmEmpPreviousJobs with an existing ID
        emEmpPreviousJobs.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmEmpPreviousJobsMockMvc.perform(post("/api/em-emp-previous-jobs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpPreviousJobs)))
            .andExpect(status().isBadRequest());

        // Validate the EmEmpPreviousJobs in the database
        List<EmEmpPreviousJobs> emEmpPreviousJobsList = emEmpPreviousJobsRepository.findAll();
        assertThat(emEmpPreviousJobsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCompanyIsRequired() throws Exception {
        int databaseSizeBeforeTest = emEmpPreviousJobsRepository.findAll().size();
        // set the field null
        emEmpPreviousJobs.setCompany(null);

        // Create the EmEmpPreviousJobs, which fails.

        restEmEmpPreviousJobsMockMvc.perform(post("/api/em-emp-previous-jobs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpPreviousJobs)))
            .andExpect(status().isBadRequest());

        List<EmEmpPreviousJobs> emEmpPreviousJobsList = emEmpPreviousJobsRepository.findAll();
        assertThat(emEmpPreviousJobsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateFromIsRequired() throws Exception {
        int databaseSizeBeforeTest = emEmpPreviousJobsRepository.findAll().size();
        // set the field null
        emEmpPreviousJobs.setDateFrom(null);

        // Create the EmEmpPreviousJobs, which fails.

        restEmEmpPreviousJobsMockMvc.perform(post("/api/em-emp-previous-jobs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpPreviousJobs)))
            .andExpect(status().isBadRequest());

        List<EmEmpPreviousJobs> emEmpPreviousJobsList = emEmpPreviousJobsRepository.findAll();
        assertThat(emEmpPreviousJobsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateToIsRequired() throws Exception {
        int databaseSizeBeforeTest = emEmpPreviousJobsRepository.findAll().size();
        // set the field null
        emEmpPreviousJobs.setDateTo(null);

        // Create the EmEmpPreviousJobs, which fails.

        restEmEmpPreviousJobsMockMvc.perform(post("/api/em-emp-previous-jobs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpPreviousJobs)))
            .andExpect(status().isBadRequest());

        List<EmEmpPreviousJobs> emEmpPreviousJobsList = emEmpPreviousJobsRepository.findAll();
        assertThat(emEmpPreviousJobsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmEmpPreviousJobs() throws Exception {
        // Initialize the database
        emEmpPreviousJobsRepository.saveAndFlush(emEmpPreviousJobs);

        // Get all the emEmpPreviousJobsList
        restEmEmpPreviousJobsMockMvc.perform(get("/api/em-emp-previous-jobs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emEmpPreviousJobs.getId().intValue())))
            .andExpect(jsonPath("$.[*].company").value(hasItem(DEFAULT_COMPANY.toString())))
            .andExpect(jsonPath("$.[*].position").value(hasItem(DEFAULT_POSITION.toString())))
            .andExpect(jsonPath("$.[*].dateFrom").value(hasItem(DEFAULT_DATE_FROM.toString())))
            .andExpect(jsonPath("$.[*].dateTo").value(hasItem(DEFAULT_DATE_TO.toString())))
            .andExpect(jsonPath("$.[*].reasonOfLeaving").value(hasItem(DEFAULT_REASON_OF_LEAVING.toString())))
            .andExpect(jsonPath("$.[*].managerPosition").value(hasItem(DEFAULT_MANAGER_POSITION.toString())))
            .andExpect(jsonPath("$.[*].lengthOfServiceYears").value(hasItem(DEFAULT_LENGTH_OF_SERVICE_YEARS)))
            .andExpect(jsonPath("$.[*].lengthOfServiceMonths").value(hasItem(DEFAULT_LENGTH_OF_SERVICE_MONTHS)))
            .andExpect(jsonPath("$.[*].lengthOfServiceDays").value(hasItem(DEFAULT_LENGTH_OF_SERVICE_DAYS)))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getEmEmpPreviousJobs() throws Exception {
        // Initialize the database
        emEmpPreviousJobsRepository.saveAndFlush(emEmpPreviousJobs);

        // Get the emEmpPreviousJobs
        restEmEmpPreviousJobsMockMvc.perform(get("/api/em-emp-previous-jobs/{id}", emEmpPreviousJobs.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emEmpPreviousJobs.getId().intValue()))
            .andExpect(jsonPath("$.company").value(DEFAULT_COMPANY.toString()))
            .andExpect(jsonPath("$.position").value(DEFAULT_POSITION.toString()))
            .andExpect(jsonPath("$.dateFrom").value(DEFAULT_DATE_FROM.toString()))
            .andExpect(jsonPath("$.dateTo").value(DEFAULT_DATE_TO.toString()))
            .andExpect(jsonPath("$.reasonOfLeaving").value(DEFAULT_REASON_OF_LEAVING.toString()))
            .andExpect(jsonPath("$.managerPosition").value(DEFAULT_MANAGER_POSITION.toString()))
            .andExpect(jsonPath("$.lengthOfServiceYears").value(DEFAULT_LENGTH_OF_SERVICE_YEARS))
            .andExpect(jsonPath("$.lengthOfServiceMonths").value(DEFAULT_LENGTH_OF_SERVICE_MONTHS))
            .andExpect(jsonPath("$.lengthOfServiceDays").value(DEFAULT_LENGTH_OF_SERVICE_DAYS))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmEmpPreviousJobs() throws Exception {
        // Get the emEmpPreviousJobs
        restEmEmpPreviousJobsMockMvc.perform(get("/api/em-emp-previous-jobs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmEmpPreviousJobs() throws Exception {
        // Initialize the database
        emEmpPreviousJobsRepository.saveAndFlush(emEmpPreviousJobs);
        int databaseSizeBeforeUpdate = emEmpPreviousJobsRepository.findAll().size();

        // Update the emEmpPreviousJobs
        EmEmpPreviousJobs updatedEmEmpPreviousJobs = emEmpPreviousJobsRepository.findOne(emEmpPreviousJobs.getId());
        // Disconnect from session so that the updates on updatedEmEmpPreviousJobs are not directly saved in db
        em.detach(updatedEmEmpPreviousJobs);
        updatedEmEmpPreviousJobs
            .company(UPDATED_COMPANY)
            .position(UPDATED_POSITION)
            .dateFrom(UPDATED_DATE_FROM)
            .dateTo(UPDATED_DATE_TO)
            .reasonOfLeaving(UPDATED_REASON_OF_LEAVING)
            .managerPosition(UPDATED_MANAGER_POSITION)
            .lengthOfServiceYears(UPDATED_LENGTH_OF_SERVICE_YEARS)
            .lengthOfServiceMonths(UPDATED_LENGTH_OF_SERVICE_MONTHS)
            .lengthOfServiceDays(UPDATED_LENGTH_OF_SERVICE_DAYS)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmEmpPreviousJobsMockMvc.perform(put("/api/em-emp-previous-jobs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmEmpPreviousJobs)))
            .andExpect(status().isOk());

        // Validate the EmEmpPreviousJobs in the database
        List<EmEmpPreviousJobs> emEmpPreviousJobsList = emEmpPreviousJobsRepository.findAll();
        assertThat(emEmpPreviousJobsList).hasSize(databaseSizeBeforeUpdate);
        EmEmpPreviousJobs testEmEmpPreviousJobs = emEmpPreviousJobsList.get(emEmpPreviousJobsList.size() - 1);
        assertThat(testEmEmpPreviousJobs.getCompany()).isEqualTo(UPDATED_COMPANY);
        assertThat(testEmEmpPreviousJobs.getPosition()).isEqualTo(UPDATED_POSITION);
        assertThat(testEmEmpPreviousJobs.getDateFrom()).isEqualTo(UPDATED_DATE_FROM);
        assertThat(testEmEmpPreviousJobs.getDateTo()).isEqualTo(UPDATED_DATE_TO);
        assertThat(testEmEmpPreviousJobs.getReasonOfLeaving()).isEqualTo(UPDATED_REASON_OF_LEAVING);
        assertThat(testEmEmpPreviousJobs.getManagerPosition()).isEqualTo(UPDATED_MANAGER_POSITION);
        assertThat(testEmEmpPreviousJobs.getLengthOfServiceYears()).isEqualTo(UPDATED_LENGTH_OF_SERVICE_YEARS);
        assertThat(testEmEmpPreviousJobs.getLengthOfServiceMonths()).isEqualTo(UPDATED_LENGTH_OF_SERVICE_MONTHS);
        assertThat(testEmEmpPreviousJobs.getLengthOfServiceDays()).isEqualTo(UPDATED_LENGTH_OF_SERVICE_DAYS);
        assertThat(testEmEmpPreviousJobs.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmEmpPreviousJobs.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmEmpPreviousJobs.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmEmpPreviousJobs.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmEmpPreviousJobs() throws Exception {
        int databaseSizeBeforeUpdate = emEmpPreviousJobsRepository.findAll().size();

        // Create the EmEmpPreviousJobs

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmEmpPreviousJobsMockMvc.perform(put("/api/em-emp-previous-jobs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpPreviousJobs)))
            .andExpect(status().isCreated());

        // Validate the EmEmpPreviousJobs in the database
        List<EmEmpPreviousJobs> emEmpPreviousJobsList = emEmpPreviousJobsRepository.findAll();
        assertThat(emEmpPreviousJobsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmEmpPreviousJobs() throws Exception {
        // Initialize the database
        emEmpPreviousJobsRepository.saveAndFlush(emEmpPreviousJobs);
        int databaseSizeBeforeDelete = emEmpPreviousJobsRepository.findAll().size();

        // Get the emEmpPreviousJobs
        restEmEmpPreviousJobsMockMvc.perform(delete("/api/em-emp-previous-jobs/{id}", emEmpPreviousJobs.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmEmpPreviousJobs> emEmpPreviousJobsList = emEmpPreviousJobsRepository.findAll();
        assertThat(emEmpPreviousJobsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmEmpPreviousJobs.class);
        EmEmpPreviousJobs emEmpPreviousJobs1 = new EmEmpPreviousJobs();
        emEmpPreviousJobs1.setId(1L);
        EmEmpPreviousJobs emEmpPreviousJobs2 = new EmEmpPreviousJobs();
        emEmpPreviousJobs2.setId(emEmpPreviousJobs1.getId());
        assertThat(emEmpPreviousJobs1).isEqualTo(emEmpPreviousJobs2);
        emEmpPreviousJobs2.setId(2L);
        assertThat(emEmpPreviousJobs1).isNotEqualTo(emEmpPreviousJobs2);
        emEmpPreviousJobs1.setId(null);
        assertThat(emEmpPreviousJobs1).isNotEqualTo(emEmpPreviousJobs2);
    }
}
