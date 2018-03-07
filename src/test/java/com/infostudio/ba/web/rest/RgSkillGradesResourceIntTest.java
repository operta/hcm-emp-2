package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.RgSkillGrades;
import com.infostudio.ba.repository.RgSkillGradesRepository;
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
 * Test class for the RgSkillGradesResource REST controller.
 *
 * @see RgSkillGradesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class RgSkillGradesResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_GRADE = 1;
    private static final Integer UPDATED_GRADE = 2;

    private static final String DEFAULT_NUMERICAL = "AAAAAAAAAA";
    private static final String UPDATED_NUMERICAL = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private RgSkillGradesRepository rgSkillGradesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRgSkillGradesMockMvc;

    private RgSkillGrades rgSkillGrades;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RgSkillGradesResource rgSkillGradesResource = new RgSkillGradesResource(rgSkillGradesRepository);
        this.restRgSkillGradesMockMvc = MockMvcBuilders.standaloneSetup(rgSkillGradesResource)
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
    public static RgSkillGrades createEntity(EntityManager em) {
        RgSkillGrades rgSkillGrades = new RgSkillGrades()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .grade(DEFAULT_GRADE)
            .numerical(DEFAULT_NUMERICAL)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return rgSkillGrades;
    }

    @Before
    public void initTest() {
        rgSkillGrades = createEntity(em);
    }

    @Test
    @Transactional
    public void createRgSkillGrades() throws Exception {
        int databaseSizeBeforeCreate = rgSkillGradesRepository.findAll().size();

        // Create the RgSkillGrades
        restRgSkillGradesMockMvc.perform(post("/api/rg-skill-grades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgSkillGrades)))
            .andExpect(status().isCreated());

        // Validate the RgSkillGrades in the database
        List<RgSkillGrades> rgSkillGradesList = rgSkillGradesRepository.findAll();
        assertThat(rgSkillGradesList).hasSize(databaseSizeBeforeCreate + 1);
        RgSkillGrades testRgSkillGrades = rgSkillGradesList.get(rgSkillGradesList.size() - 1);
        assertThat(testRgSkillGrades.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testRgSkillGrades.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRgSkillGrades.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testRgSkillGrades.getGrade()).isEqualTo(DEFAULT_GRADE);
        assertThat(testRgSkillGrades.getNumerical()).isEqualTo(DEFAULT_NUMERICAL);
        assertThat(testRgSkillGrades.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testRgSkillGrades.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testRgSkillGrades.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testRgSkillGrades.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createRgSkillGradesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rgSkillGradesRepository.findAll().size();

        // Create the RgSkillGrades with an existing ID
        rgSkillGrades.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRgSkillGradesMockMvc.perform(post("/api/rg-skill-grades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgSkillGrades)))
            .andExpect(status().isBadRequest());

        // Validate the RgSkillGrades in the database
        List<RgSkillGrades> rgSkillGradesList = rgSkillGradesRepository.findAll();
        assertThat(rgSkillGradesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = rgSkillGradesRepository.findAll().size();
        // set the field null
        rgSkillGrades.setCode(null);

        // Create the RgSkillGrades, which fails.

        restRgSkillGradesMockMvc.perform(post("/api/rg-skill-grades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgSkillGrades)))
            .andExpect(status().isBadRequest());

        List<RgSkillGrades> rgSkillGradesList = rgSkillGradesRepository.findAll();
        assertThat(rgSkillGradesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = rgSkillGradesRepository.findAll().size();
        // set the field null
        rgSkillGrades.setName(null);

        // Create the RgSkillGrades, which fails.

        restRgSkillGradesMockMvc.perform(post("/api/rg-skill-grades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgSkillGrades)))
            .andExpect(status().isBadRequest());

        List<RgSkillGrades> rgSkillGradesList = rgSkillGradesRepository.findAll();
        assertThat(rgSkillGradesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGradeIsRequired() throws Exception {
        int databaseSizeBeforeTest = rgSkillGradesRepository.findAll().size();
        // set the field null
        rgSkillGrades.setGrade(null);

        // Create the RgSkillGrades, which fails.

        restRgSkillGradesMockMvc.perform(post("/api/rg-skill-grades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgSkillGrades)))
            .andExpect(status().isBadRequest());

        List<RgSkillGrades> rgSkillGradesList = rgSkillGradesRepository.findAll();
        assertThat(rgSkillGradesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRgSkillGrades() throws Exception {
        // Initialize the database
        rgSkillGradesRepository.saveAndFlush(rgSkillGrades);

        // Get all the rgSkillGradesList
        restRgSkillGradesMockMvc.perform(get("/api/rg-skill-grades?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rgSkillGrades.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].grade").value(hasItem(DEFAULT_GRADE)))
            .andExpect(jsonPath("$.[*].numerical").value(hasItem(DEFAULT_NUMERICAL.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getRgSkillGrades() throws Exception {
        // Initialize the database
        rgSkillGradesRepository.saveAndFlush(rgSkillGrades);

        // Get the rgSkillGrades
        restRgSkillGradesMockMvc.perform(get("/api/rg-skill-grades/{id}", rgSkillGrades.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rgSkillGrades.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.grade").value(DEFAULT_GRADE))
            .andExpect(jsonPath("$.numerical").value(DEFAULT_NUMERICAL.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRgSkillGrades() throws Exception {
        // Get the rgSkillGrades
        restRgSkillGradesMockMvc.perform(get("/api/rg-skill-grades/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRgSkillGrades() throws Exception {
        // Initialize the database
        rgSkillGradesRepository.saveAndFlush(rgSkillGrades);
        int databaseSizeBeforeUpdate = rgSkillGradesRepository.findAll().size();

        // Update the rgSkillGrades
        RgSkillGrades updatedRgSkillGrades = rgSkillGradesRepository.findOne(rgSkillGrades.getId());
        // Disconnect from session so that the updates on updatedRgSkillGrades are not directly saved in db
        em.detach(updatedRgSkillGrades);
        updatedRgSkillGrades
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .grade(UPDATED_GRADE)
            .numerical(UPDATED_NUMERICAL)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restRgSkillGradesMockMvc.perform(put("/api/rg-skill-grades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRgSkillGrades)))
            .andExpect(status().isOk());

        // Validate the RgSkillGrades in the database
        List<RgSkillGrades> rgSkillGradesList = rgSkillGradesRepository.findAll();
        assertThat(rgSkillGradesList).hasSize(databaseSizeBeforeUpdate);
        RgSkillGrades testRgSkillGrades = rgSkillGradesList.get(rgSkillGradesList.size() - 1);
        assertThat(testRgSkillGrades.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testRgSkillGrades.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRgSkillGrades.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testRgSkillGrades.getGrade()).isEqualTo(UPDATED_GRADE);
        assertThat(testRgSkillGrades.getNumerical()).isEqualTo(UPDATED_NUMERICAL);
        assertThat(testRgSkillGrades.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testRgSkillGrades.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testRgSkillGrades.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testRgSkillGrades.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingRgSkillGrades() throws Exception {
        int databaseSizeBeforeUpdate = rgSkillGradesRepository.findAll().size();

        // Create the RgSkillGrades

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRgSkillGradesMockMvc.perform(put("/api/rg-skill-grades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgSkillGrades)))
            .andExpect(status().isCreated());

        // Validate the RgSkillGrades in the database
        List<RgSkillGrades> rgSkillGradesList = rgSkillGradesRepository.findAll();
        assertThat(rgSkillGradesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRgSkillGrades() throws Exception {
        // Initialize the database
        rgSkillGradesRepository.saveAndFlush(rgSkillGrades);
        int databaseSizeBeforeDelete = rgSkillGradesRepository.findAll().size();

        // Get the rgSkillGrades
        restRgSkillGradesMockMvc.perform(delete("/api/rg-skill-grades/{id}", rgSkillGrades.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RgSkillGrades> rgSkillGradesList = rgSkillGradesRepository.findAll();
        assertThat(rgSkillGradesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RgSkillGrades.class);
        RgSkillGrades rgSkillGrades1 = new RgSkillGrades();
        rgSkillGrades1.setId(1L);
        RgSkillGrades rgSkillGrades2 = new RgSkillGrades();
        rgSkillGrades2.setId(rgSkillGrades1.getId());
        assertThat(rgSkillGrades1).isEqualTo(rgSkillGrades2);
        rgSkillGrades2.setId(2L);
        assertThat(rgSkillGrades1).isNotEqualTo(rgSkillGrades2);
        rgSkillGrades1.setId(null);
        assertThat(rgSkillGrades1).isNotEqualTo(rgSkillGrades2);
    }
}
