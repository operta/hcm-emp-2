package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmEmployees;
import com.infostudio.ba.repository.EmEmployeesRepository;
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
 * Test class for the EmEmployeesResource REST controller.
 *
 * @see EmEmployeesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmEmployeesResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MIDDLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MIDDLE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SURNAME = "AAAAAAAAAA";
    private static final String UPDATED_SURNAME = "BBBBBBBBBB";

    private static final String DEFAULT_MAIDEN_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MAIDEN_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_DISABILITY_DEGREE = 1;
    private static final Integer UPDATED_DISABILITY_DEGREE = 2;

    private static final String DEFAULT_ETHNIC_GROUP = "AAAAAAAAAA";
    private static final String UPDATED_ETHNIC_GROUP = "BBBBBBBBBB";

    private static final String DEFAULT_GENDER = "AAAAAAAAAA";
    private static final String UPDATED_GENDER = "BBBBBBBBBB";

    private static final String DEFAULT_RESIDENTIAL_SITUATION = "AAAAAAAAAA";
    private static final String UPDATED_RESIDENTIAL_SITUATION = "BBBBBBBBBB";

    private static final String DEFAULT_MARITAL_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_MARITAL_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_BLOOD_GROUP = "AAAAAAAAAA";
    private static final String UPDATED_BLOOD_GROUP = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_OF_BIRTH = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_OF_BIRTH = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_HIRE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_HIRE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_SSN = "AAAAAAAAAA";
    private static final String UPDATED_SSN = "BBBBBBBBBB";

    private static final String DEFAULT_TAX_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_TAX_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private EmEmployeesRepository emEmployeesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmEmployeesMockMvc;

    private EmEmployees emEmployees;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmEmployeesResource emEmployeesResource = new EmEmployeesResource(emEmployeesRepository);
        this.restEmEmployeesMockMvc = MockMvcBuilders.standaloneSetup(emEmployeesResource)
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
    public static EmEmployees createEntity(EntityManager em) {
        EmEmployees emEmployees = new EmEmployees()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .middleName(DEFAULT_MIDDLE_NAME)
            .surname(DEFAULT_SURNAME)
            .maidenName(DEFAULT_MAIDEN_NAME)
            .disabilityDegree(DEFAULT_DISABILITY_DEGREE)
            .ethnicGroup(DEFAULT_ETHNIC_GROUP)
            .gender(DEFAULT_GENDER)
            .residentialSituation(DEFAULT_RESIDENTIAL_SITUATION)
            .maritalStatus(DEFAULT_MARITAL_STATUS)
            .bloodGroup(DEFAULT_BLOOD_GROUP)
            .dateOfBirth(DEFAULT_DATE_OF_BIRTH)
            .hireDate(DEFAULT_HIRE_DATE)
            .ssn(DEFAULT_SSN)
            .taxNumber(DEFAULT_TAX_NUMBER)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emEmployees;
    }

    @Before
    public void initTest() {
        emEmployees = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmEmployees() throws Exception {
        int databaseSizeBeforeCreate = emEmployeesRepository.findAll().size();

        // Create the EmEmployees
        restEmEmployeesMockMvc.perform(post("/api/em-employees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmployees)))
            .andExpect(status().isCreated());

        // Validate the EmEmployees in the database
        List<EmEmployees> emEmployeesList = emEmployeesRepository.findAll();
        assertThat(emEmployeesList).hasSize(databaseSizeBeforeCreate + 1);
        EmEmployees testEmEmployees = emEmployeesList.get(emEmployeesList.size() - 1);
        assertThat(testEmEmployees.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testEmEmployees.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEmEmployees.getMiddleName()).isEqualTo(DEFAULT_MIDDLE_NAME);
        assertThat(testEmEmployees.getSurname()).isEqualTo(DEFAULT_SURNAME);
        assertThat(testEmEmployees.getMaidenName()).isEqualTo(DEFAULT_MAIDEN_NAME);
        assertThat(testEmEmployees.getDisabilityDegree()).isEqualTo(DEFAULT_DISABILITY_DEGREE);
        assertThat(testEmEmployees.getEthnicGroup()).isEqualTo(DEFAULT_ETHNIC_GROUP);
        assertThat(testEmEmployees.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testEmEmployees.getResidentialSituation()).isEqualTo(DEFAULT_RESIDENTIAL_SITUATION);
        assertThat(testEmEmployees.getMaritalStatus()).isEqualTo(DEFAULT_MARITAL_STATUS);
        assertThat(testEmEmployees.getBloodGroup()).isEqualTo(DEFAULT_BLOOD_GROUP);
        assertThat(testEmEmployees.getDateOfBirth()).isEqualTo(DEFAULT_DATE_OF_BIRTH);
        assertThat(testEmEmployees.getHireDate()).isEqualTo(DEFAULT_HIRE_DATE);
        assertThat(testEmEmployees.getSsn()).isEqualTo(DEFAULT_SSN);
        assertThat(testEmEmployees.getTaxNumber()).isEqualTo(DEFAULT_TAX_NUMBER);
        assertThat(testEmEmployees.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmEmployees.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmEmployees.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmEmployees.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmEmployeesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emEmployeesRepository.findAll().size();

        // Create the EmEmployees with an existing ID
        emEmployees.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmEmployeesMockMvc.perform(post("/api/em-employees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmployees)))
            .andExpect(status().isBadRequest());

        // Validate the EmEmployees in the database
        List<EmEmployees> emEmployeesList = emEmployeesRepository.findAll();
        assertThat(emEmployeesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEmEmployees() throws Exception {
        // Initialize the database
        emEmployeesRepository.saveAndFlush(emEmployees);

        // Get all the emEmployeesList
        restEmEmployeesMockMvc.perform(get("/api/em-employees?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emEmployees.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].middleName").value(hasItem(DEFAULT_MIDDLE_NAME.toString())))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME.toString())))
            .andExpect(jsonPath("$.[*].maidenName").value(hasItem(DEFAULT_MAIDEN_NAME.toString())))
            .andExpect(jsonPath("$.[*].disabilityDegree").value(hasItem(DEFAULT_DISABILITY_DEGREE)))
            .andExpect(jsonPath("$.[*].ethnicGroup").value(hasItem(DEFAULT_ETHNIC_GROUP.toString())))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())))
            .andExpect(jsonPath("$.[*].residentialSituation").value(hasItem(DEFAULT_RESIDENTIAL_SITUATION.toString())))
            .andExpect(jsonPath("$.[*].maritalStatus").value(hasItem(DEFAULT_MARITAL_STATUS.toString())))
            .andExpect(jsonPath("$.[*].bloodGroup").value(hasItem(DEFAULT_BLOOD_GROUP.toString())))
            .andExpect(jsonPath("$.[*].dateOfBirth").value(hasItem(DEFAULT_DATE_OF_BIRTH.toString())))
            .andExpect(jsonPath("$.[*].hireDate").value(hasItem(DEFAULT_HIRE_DATE.toString())))
            .andExpect(jsonPath("$.[*].ssn").value(hasItem(DEFAULT_SSN.toString())))
            .andExpect(jsonPath("$.[*].taxNumber").value(hasItem(DEFAULT_TAX_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getEmEmployees() throws Exception {
        // Initialize the database
        emEmployeesRepository.saveAndFlush(emEmployees);

        // Get the emEmployees
        restEmEmployeesMockMvc.perform(get("/api/em-employees/{id}", emEmployees.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emEmployees.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.middleName").value(DEFAULT_MIDDLE_NAME.toString()))
            .andExpect(jsonPath("$.surname").value(DEFAULT_SURNAME.toString()))
            .andExpect(jsonPath("$.maidenName").value(DEFAULT_MAIDEN_NAME.toString()))
            .andExpect(jsonPath("$.disabilityDegree").value(DEFAULT_DISABILITY_DEGREE))
            .andExpect(jsonPath("$.ethnicGroup").value(DEFAULT_ETHNIC_GROUP.toString()))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER.toString()))
            .andExpect(jsonPath("$.residentialSituation").value(DEFAULT_RESIDENTIAL_SITUATION.toString()))
            .andExpect(jsonPath("$.maritalStatus").value(DEFAULT_MARITAL_STATUS.toString()))
            .andExpect(jsonPath("$.bloodGroup").value(DEFAULT_BLOOD_GROUP.toString()))
            .andExpect(jsonPath("$.dateOfBirth").value(DEFAULT_DATE_OF_BIRTH.toString()))
            .andExpect(jsonPath("$.hireDate").value(DEFAULT_HIRE_DATE.toString()))
            .andExpect(jsonPath("$.ssn").value(DEFAULT_SSN.toString()))
            .andExpect(jsonPath("$.taxNumber").value(DEFAULT_TAX_NUMBER.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmEmployees() throws Exception {
        // Get the emEmployees
        restEmEmployeesMockMvc.perform(get("/api/em-employees/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmEmployees() throws Exception {
        // Initialize the database
        emEmployeesRepository.saveAndFlush(emEmployees);
        int databaseSizeBeforeUpdate = emEmployeesRepository.findAll().size();

        // Update the emEmployees
        EmEmployees updatedEmEmployees = emEmployeesRepository.findOne(emEmployees.getId());
        // Disconnect from session so that the updates on updatedEmEmployees are not directly saved in db
        em.detach(updatedEmEmployees);
        updatedEmEmployees
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .surname(UPDATED_SURNAME)
            .maidenName(UPDATED_MAIDEN_NAME)
            .disabilityDegree(UPDATED_DISABILITY_DEGREE)
            .ethnicGroup(UPDATED_ETHNIC_GROUP)
            .gender(UPDATED_GENDER)
            .residentialSituation(UPDATED_RESIDENTIAL_SITUATION)
            .maritalStatus(UPDATED_MARITAL_STATUS)
            .bloodGroup(UPDATED_BLOOD_GROUP)
            .dateOfBirth(UPDATED_DATE_OF_BIRTH)
            .hireDate(UPDATED_HIRE_DATE)
            .ssn(UPDATED_SSN)
            .taxNumber(UPDATED_TAX_NUMBER)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmEmployeesMockMvc.perform(put("/api/em-employees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmEmployees)))
            .andExpect(status().isOk());

        // Validate the EmEmployees in the database
        List<EmEmployees> emEmployeesList = emEmployeesRepository.findAll();
        assertThat(emEmployeesList).hasSize(databaseSizeBeforeUpdate);
        EmEmployees testEmEmployees = emEmployeesList.get(emEmployeesList.size() - 1);
        assertThat(testEmEmployees.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testEmEmployees.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEmEmployees.getMiddleName()).isEqualTo(UPDATED_MIDDLE_NAME);
        assertThat(testEmEmployees.getSurname()).isEqualTo(UPDATED_SURNAME);
        assertThat(testEmEmployees.getMaidenName()).isEqualTo(UPDATED_MAIDEN_NAME);
        assertThat(testEmEmployees.getDisabilityDegree()).isEqualTo(UPDATED_DISABILITY_DEGREE);
        assertThat(testEmEmployees.getEthnicGroup()).isEqualTo(UPDATED_ETHNIC_GROUP);
        assertThat(testEmEmployees.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testEmEmployees.getResidentialSituation()).isEqualTo(UPDATED_RESIDENTIAL_SITUATION);
        assertThat(testEmEmployees.getMaritalStatus()).isEqualTo(UPDATED_MARITAL_STATUS);
        assertThat(testEmEmployees.getBloodGroup()).isEqualTo(UPDATED_BLOOD_GROUP);
        assertThat(testEmEmployees.getDateOfBirth()).isEqualTo(UPDATED_DATE_OF_BIRTH);
        assertThat(testEmEmployees.getHireDate()).isEqualTo(UPDATED_HIRE_DATE);
        assertThat(testEmEmployees.getSsn()).isEqualTo(UPDATED_SSN);
        assertThat(testEmEmployees.getTaxNumber()).isEqualTo(UPDATED_TAX_NUMBER);
        assertThat(testEmEmployees.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmEmployees.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmEmployees.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmEmployees.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmEmployees() throws Exception {
        int databaseSizeBeforeUpdate = emEmployeesRepository.findAll().size();

        // Create the EmEmployees

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmEmployeesMockMvc.perform(put("/api/em-employees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmployees)))
            .andExpect(status().isCreated());

        // Validate the EmEmployees in the database
        List<EmEmployees> emEmployeesList = emEmployeesRepository.findAll();
        assertThat(emEmployeesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmEmployees() throws Exception {
        // Initialize the database
        emEmployeesRepository.saveAndFlush(emEmployees);
        int databaseSizeBeforeDelete = emEmployeesRepository.findAll().size();

        // Get the emEmployees
        restEmEmployeesMockMvc.perform(delete("/api/em-employees/{id}", emEmployees.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmEmployees> emEmployeesList = emEmployeesRepository.findAll();
        assertThat(emEmployeesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmEmployees.class);
        EmEmployees emEmployees1 = new EmEmployees();
        emEmployees1.setId(1L);
        EmEmployees emEmployees2 = new EmEmployees();
        emEmployees2.setId(emEmployees1.getId());
        assertThat(emEmployees1).isEqualTo(emEmployees2);
        emEmployees2.setId(2L);
        assertThat(emEmployees1).isNotEqualTo(emEmployees2);
        emEmployees1.setId(null);
        assertThat(emEmployees1).isNotEqualTo(emEmployees2);
    }
}
