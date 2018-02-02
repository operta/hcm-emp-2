package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmEmpSalaries;
import com.infostudio.ba.repository.EmEmpSalariesRepository;
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
 * Test class for the EmEmpSalariesResource REST controller.
 *
 * @see EmEmpSalariesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmEmpSalariesResourceIntTest {

    private static final LocalDate DEFAULT_DATE_FROM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_FROM = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_TO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_TO = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_SALARY_AMOUNT = 1;
    private static final Integer UPDATED_SALARY_AMOUNT = 2;

    private static final Integer DEFAULT_SALARY_COEFFICIENT = 1;
    private static final Integer UPDATED_SALARY_COEFFICIENT = 2;

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
    private EmEmpSalariesRepository emEmpSalariesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmEmpSalariesMockMvc;

    private EmEmpSalaries emEmpSalaries;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmEmpSalariesResource emEmpSalariesResource = new EmEmpSalariesResource(emEmpSalariesRepository);
        this.restEmEmpSalariesMockMvc = MockMvcBuilders.standaloneSetup(emEmpSalariesResource)
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
    public static EmEmpSalaries createEntity(EntityManager em) {
        EmEmpSalaries emEmpSalaries = new EmEmpSalaries()
            .dateFrom(DEFAULT_DATE_FROM)
            .dateTo(DEFAULT_DATE_TO)
            .salaryAmount(DEFAULT_SALARY_AMOUNT)
            .salaryCoefficient(DEFAULT_SALARY_COEFFICIENT)
            .workHistoryCoefficient(DEFAULT_WORK_HISTORY_COEFFICIENT)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emEmpSalaries;
    }

    @Before
    public void initTest() {
        emEmpSalaries = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmEmpSalaries() throws Exception {
        int databaseSizeBeforeCreate = emEmpSalariesRepository.findAll().size();

        // Create the EmEmpSalaries
        restEmEmpSalariesMockMvc.perform(post("/api/em-emp-salaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpSalaries)))
            .andExpect(status().isCreated());

        // Validate the EmEmpSalaries in the database
        List<EmEmpSalaries> emEmpSalariesList = emEmpSalariesRepository.findAll();
        assertThat(emEmpSalariesList).hasSize(databaseSizeBeforeCreate + 1);
        EmEmpSalaries testEmEmpSalaries = emEmpSalariesList.get(emEmpSalariesList.size() - 1);
        assertThat(testEmEmpSalaries.getDateFrom()).isEqualTo(DEFAULT_DATE_FROM);
        assertThat(testEmEmpSalaries.getDateTo()).isEqualTo(DEFAULT_DATE_TO);
        assertThat(testEmEmpSalaries.getSalaryAmount()).isEqualTo(DEFAULT_SALARY_AMOUNT);
        assertThat(testEmEmpSalaries.getSalaryCoefficient()).isEqualTo(DEFAULT_SALARY_COEFFICIENT);
        assertThat(testEmEmpSalaries.getWorkHistoryCoefficient()).isEqualTo(DEFAULT_WORK_HISTORY_COEFFICIENT);
        assertThat(testEmEmpSalaries.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmEmpSalaries.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmEmpSalaries.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmEmpSalaries.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmEmpSalariesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emEmpSalariesRepository.findAll().size();

        // Create the EmEmpSalaries with an existing ID
        emEmpSalaries.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmEmpSalariesMockMvc.perform(post("/api/em-emp-salaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpSalaries)))
            .andExpect(status().isBadRequest());

        // Validate the EmEmpSalaries in the database
        List<EmEmpSalaries> emEmpSalariesList = emEmpSalariesRepository.findAll();
        assertThat(emEmpSalariesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateFromIsRequired() throws Exception {
        int databaseSizeBeforeTest = emEmpSalariesRepository.findAll().size();
        // set the field null
        emEmpSalaries.setDateFrom(null);

        // Create the EmEmpSalaries, which fails.

        restEmEmpSalariesMockMvc.perform(post("/api/em-emp-salaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpSalaries)))
            .andExpect(status().isBadRequest());

        List<EmEmpSalaries> emEmpSalariesList = emEmpSalariesRepository.findAll();
        assertThat(emEmpSalariesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmEmpSalaries() throws Exception {
        // Initialize the database
        emEmpSalariesRepository.saveAndFlush(emEmpSalaries);

        // Get all the emEmpSalariesList
        restEmEmpSalariesMockMvc.perform(get("/api/em-emp-salaries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emEmpSalaries.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateFrom").value(hasItem(DEFAULT_DATE_FROM.toString())))
            .andExpect(jsonPath("$.[*].dateTo").value(hasItem(DEFAULT_DATE_TO.toString())))
            .andExpect(jsonPath("$.[*].salaryAmount").value(hasItem(DEFAULT_SALARY_AMOUNT)))
            .andExpect(jsonPath("$.[*].salaryCoefficient").value(hasItem(DEFAULT_SALARY_COEFFICIENT)))
            .andExpect(jsonPath("$.[*].workHistoryCoefficient").value(hasItem(DEFAULT_WORK_HISTORY_COEFFICIENT)))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getEmEmpSalaries() throws Exception {
        // Initialize the database
        emEmpSalariesRepository.saveAndFlush(emEmpSalaries);

        // Get the emEmpSalaries
        restEmEmpSalariesMockMvc.perform(get("/api/em-emp-salaries/{id}", emEmpSalaries.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emEmpSalaries.getId().intValue()))
            .andExpect(jsonPath("$.dateFrom").value(DEFAULT_DATE_FROM.toString()))
            .andExpect(jsonPath("$.dateTo").value(DEFAULT_DATE_TO.toString()))
            .andExpect(jsonPath("$.salaryAmount").value(DEFAULT_SALARY_AMOUNT))
            .andExpect(jsonPath("$.salaryCoefficient").value(DEFAULT_SALARY_COEFFICIENT))
            .andExpect(jsonPath("$.workHistoryCoefficient").value(DEFAULT_WORK_HISTORY_COEFFICIENT))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmEmpSalaries() throws Exception {
        // Get the emEmpSalaries
        restEmEmpSalariesMockMvc.perform(get("/api/em-emp-salaries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmEmpSalaries() throws Exception {
        // Initialize the database
        emEmpSalariesRepository.saveAndFlush(emEmpSalaries);
        int databaseSizeBeforeUpdate = emEmpSalariesRepository.findAll().size();

        // Update the emEmpSalaries
        EmEmpSalaries updatedEmEmpSalaries = emEmpSalariesRepository.findOne(emEmpSalaries.getId());
        // Disconnect from session so that the updates on updatedEmEmpSalaries are not directly saved in db
        em.detach(updatedEmEmpSalaries);
        updatedEmEmpSalaries
            .dateFrom(UPDATED_DATE_FROM)
            .dateTo(UPDATED_DATE_TO)
            .salaryAmount(UPDATED_SALARY_AMOUNT)
            .salaryCoefficient(UPDATED_SALARY_COEFFICIENT)
            .workHistoryCoefficient(UPDATED_WORK_HISTORY_COEFFICIENT)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmEmpSalariesMockMvc.perform(put("/api/em-emp-salaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmEmpSalaries)))
            .andExpect(status().isOk());

        // Validate the EmEmpSalaries in the database
        List<EmEmpSalaries> emEmpSalariesList = emEmpSalariesRepository.findAll();
        assertThat(emEmpSalariesList).hasSize(databaseSizeBeforeUpdate);
        EmEmpSalaries testEmEmpSalaries = emEmpSalariesList.get(emEmpSalariesList.size() - 1);
        assertThat(testEmEmpSalaries.getDateFrom()).isEqualTo(UPDATED_DATE_FROM);
        assertThat(testEmEmpSalaries.getDateTo()).isEqualTo(UPDATED_DATE_TO);
        assertThat(testEmEmpSalaries.getSalaryAmount()).isEqualTo(UPDATED_SALARY_AMOUNT);
        assertThat(testEmEmpSalaries.getSalaryCoefficient()).isEqualTo(UPDATED_SALARY_COEFFICIENT);
        assertThat(testEmEmpSalaries.getWorkHistoryCoefficient()).isEqualTo(UPDATED_WORK_HISTORY_COEFFICIENT);
        assertThat(testEmEmpSalaries.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmEmpSalaries.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmEmpSalaries.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmEmpSalaries.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmEmpSalaries() throws Exception {
        int databaseSizeBeforeUpdate = emEmpSalariesRepository.findAll().size();

        // Create the EmEmpSalaries

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmEmpSalariesMockMvc.perform(put("/api/em-emp-salaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpSalaries)))
            .andExpect(status().isCreated());

        // Validate the EmEmpSalaries in the database
        List<EmEmpSalaries> emEmpSalariesList = emEmpSalariesRepository.findAll();
        assertThat(emEmpSalariesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmEmpSalaries() throws Exception {
        // Initialize the database
        emEmpSalariesRepository.saveAndFlush(emEmpSalaries);
        int databaseSizeBeforeDelete = emEmpSalariesRepository.findAll().size();

        // Get the emEmpSalaries
        restEmEmpSalariesMockMvc.perform(delete("/api/em-emp-salaries/{id}", emEmpSalaries.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmEmpSalaries> emEmpSalariesList = emEmpSalariesRepository.findAll();
        assertThat(emEmpSalariesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmEmpSalaries.class);
        EmEmpSalaries emEmpSalaries1 = new EmEmpSalaries();
        emEmpSalaries1.setId(1L);
        EmEmpSalaries emEmpSalaries2 = new EmEmpSalaries();
        emEmpSalaries2.setId(emEmpSalaries1.getId());
        assertThat(emEmpSalaries1).isEqualTo(emEmpSalaries2);
        emEmpSalaries2.setId(2L);
        assertThat(emEmpSalaries1).isNotEqualTo(emEmpSalaries2);
        emEmpSalaries1.setId(null);
        assertThat(emEmpSalaries1).isNotEqualTo(emEmpSalaries2);
    }
}
