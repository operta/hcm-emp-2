package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmEmpSchools;
import com.infostudio.ba.repository.EmEmpSchoolsRepository;
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
 * Test class for the EmEmpSchoolsResource REST controller.
 *
 * @see EmEmpSchoolsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmEmpSchoolsResourceIntTest {

    private static final LocalDate DEFAULT_DATE_FROM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_FROM = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_TO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_TO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_MAJOR = "AAAAAAAAAA";
    private static final String UPDATED_MAJOR = "BBBBBBBBBB";

    private static final String DEFAULT_DEGREE = "AAAAAAAAAA";
    private static final String UPDATED_DEGREE = "BBBBBBBBBB";

    private static final Integer DEFAULT_GRADE = 1;
    private static final Integer UPDATED_GRADE = 2;

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
    private EmEmpSchoolsRepository emEmpSchoolsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmEmpSchoolsMockMvc;

    private EmEmpSchools emEmpSchools;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmEmpSchoolsResource emEmpSchoolsResource = new EmEmpSchoolsResource(emEmpSchoolsRepository);
        this.restEmEmpSchoolsMockMvc = MockMvcBuilders.standaloneSetup(emEmpSchoolsResource)
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
    public static EmEmpSchools createEntity(EntityManager em) {
        EmEmpSchools emEmpSchools = new EmEmpSchools()
            .dateFrom(DEFAULT_DATE_FROM)
            .dateTo(DEFAULT_DATE_TO)
            .major(DEFAULT_MAJOR)
            .degree(DEFAULT_DEGREE)
            .grade(DEFAULT_GRADE)
            .description(DEFAULT_DESCRIPTION)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emEmpSchools;
    }

    @Before
    public void initTest() {
        emEmpSchools = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmEmpSchools() throws Exception {
        int databaseSizeBeforeCreate = emEmpSchoolsRepository.findAll().size();

        // Create the EmEmpSchools
        restEmEmpSchoolsMockMvc.perform(post("/api/em-emp-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpSchools)))
            .andExpect(status().isCreated());

        // Validate the EmEmpSchools in the database
        List<EmEmpSchools> emEmpSchoolsList = emEmpSchoolsRepository.findAll();
        assertThat(emEmpSchoolsList).hasSize(databaseSizeBeforeCreate + 1);
        EmEmpSchools testEmEmpSchools = emEmpSchoolsList.get(emEmpSchoolsList.size() - 1);
        assertThat(testEmEmpSchools.getDateFrom()).isEqualTo(DEFAULT_DATE_FROM);
        assertThat(testEmEmpSchools.getDateTo()).isEqualTo(DEFAULT_DATE_TO);
        assertThat(testEmEmpSchools.getMajor()).isEqualTo(DEFAULT_MAJOR);
        assertThat(testEmEmpSchools.getDegree()).isEqualTo(DEFAULT_DEGREE);
        assertThat(testEmEmpSchools.getGrade()).isEqualTo(DEFAULT_GRADE);
        assertThat(testEmEmpSchools.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testEmEmpSchools.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmEmpSchools.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmEmpSchools.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmEmpSchools.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmEmpSchoolsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emEmpSchoolsRepository.findAll().size();

        // Create the EmEmpSchools with an existing ID
        emEmpSchools.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmEmpSchoolsMockMvc.perform(post("/api/em-emp-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpSchools)))
            .andExpect(status().isBadRequest());

        // Validate the EmEmpSchools in the database
        List<EmEmpSchools> emEmpSchoolsList = emEmpSchoolsRepository.findAll();
        assertThat(emEmpSchoolsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEmEmpSchools() throws Exception {
        // Initialize the database
        emEmpSchoolsRepository.saveAndFlush(emEmpSchools);

        // Get all the emEmpSchoolsList
        restEmEmpSchoolsMockMvc.perform(get("/api/em-emp-schools?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emEmpSchools.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateFrom").value(hasItem(DEFAULT_DATE_FROM.toString())))
            .andExpect(jsonPath("$.[*].dateTo").value(hasItem(DEFAULT_DATE_TO.toString())))
            .andExpect(jsonPath("$.[*].major").value(hasItem(DEFAULT_MAJOR.toString())))
            .andExpect(jsonPath("$.[*].degree").value(hasItem(DEFAULT_DEGREE.toString())))
            .andExpect(jsonPath("$.[*].grade").value(hasItem(DEFAULT_GRADE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getEmEmpSchools() throws Exception {
        // Initialize the database
        emEmpSchoolsRepository.saveAndFlush(emEmpSchools);

        // Get the emEmpSchools
        restEmEmpSchoolsMockMvc.perform(get("/api/em-emp-schools/{id}", emEmpSchools.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emEmpSchools.getId().intValue()))
            .andExpect(jsonPath("$.dateFrom").value(DEFAULT_DATE_FROM.toString()))
            .andExpect(jsonPath("$.dateTo").value(DEFAULT_DATE_TO.toString()))
            .andExpect(jsonPath("$.major").value(DEFAULT_MAJOR.toString()))
            .andExpect(jsonPath("$.degree").value(DEFAULT_DEGREE.toString()))
            .andExpect(jsonPath("$.grade").value(DEFAULT_GRADE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmEmpSchools() throws Exception {
        // Get the emEmpSchools
        restEmEmpSchoolsMockMvc.perform(get("/api/em-emp-schools/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmEmpSchools() throws Exception {
        // Initialize the database
        emEmpSchoolsRepository.saveAndFlush(emEmpSchools);
        int databaseSizeBeforeUpdate = emEmpSchoolsRepository.findAll().size();

        // Update the emEmpSchools
        EmEmpSchools updatedEmEmpSchools = emEmpSchoolsRepository.findOne(emEmpSchools.getId());
        // Disconnect from session so that the updates on updatedEmEmpSchools are not directly saved in db
        em.detach(updatedEmEmpSchools);
        updatedEmEmpSchools
            .dateFrom(UPDATED_DATE_FROM)
            .dateTo(UPDATED_DATE_TO)
            .major(UPDATED_MAJOR)
            .degree(UPDATED_DEGREE)
            .grade(UPDATED_GRADE)
            .description(UPDATED_DESCRIPTION)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmEmpSchoolsMockMvc.perform(put("/api/em-emp-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmEmpSchools)))
            .andExpect(status().isOk());

        // Validate the EmEmpSchools in the database
        List<EmEmpSchools> emEmpSchoolsList = emEmpSchoolsRepository.findAll();
        assertThat(emEmpSchoolsList).hasSize(databaseSizeBeforeUpdate);
        EmEmpSchools testEmEmpSchools = emEmpSchoolsList.get(emEmpSchoolsList.size() - 1);
        assertThat(testEmEmpSchools.getDateFrom()).isEqualTo(UPDATED_DATE_FROM);
        assertThat(testEmEmpSchools.getDateTo()).isEqualTo(UPDATED_DATE_TO);
        assertThat(testEmEmpSchools.getMajor()).isEqualTo(UPDATED_MAJOR);
        assertThat(testEmEmpSchools.getDegree()).isEqualTo(UPDATED_DEGREE);
        assertThat(testEmEmpSchools.getGrade()).isEqualTo(UPDATED_GRADE);
        assertThat(testEmEmpSchools.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testEmEmpSchools.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmEmpSchools.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmEmpSchools.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmEmpSchools.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmEmpSchools() throws Exception {
        int databaseSizeBeforeUpdate = emEmpSchoolsRepository.findAll().size();

        // Create the EmEmpSchools

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmEmpSchoolsMockMvc.perform(put("/api/em-emp-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpSchools)))
            .andExpect(status().isCreated());

        // Validate the EmEmpSchools in the database
        List<EmEmpSchools> emEmpSchoolsList = emEmpSchoolsRepository.findAll();
        assertThat(emEmpSchoolsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmEmpSchools() throws Exception {
        // Initialize the database
        emEmpSchoolsRepository.saveAndFlush(emEmpSchools);
        int databaseSizeBeforeDelete = emEmpSchoolsRepository.findAll().size();

        // Get the emEmpSchools
        restEmEmpSchoolsMockMvc.perform(delete("/api/em-emp-schools/{id}", emEmpSchools.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmEmpSchools> emEmpSchoolsList = emEmpSchoolsRepository.findAll();
        assertThat(emEmpSchoolsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmEmpSchools.class);
        EmEmpSchools emEmpSchools1 = new EmEmpSchools();
        emEmpSchools1.setId(1L);
        EmEmpSchools emEmpSchools2 = new EmEmpSchools();
        emEmpSchools2.setId(emEmpSchools1.getId());
        assertThat(emEmpSchools1).isEqualTo(emEmpSchools2);
        emEmpSchools2.setId(2L);
        assertThat(emEmpSchools1).isNotEqualTo(emEmpSchools2);
        emEmpSchools1.setId(null);
        assertThat(emEmpSchools1).isNotEqualTo(emEmpSchools2);
    }
}
