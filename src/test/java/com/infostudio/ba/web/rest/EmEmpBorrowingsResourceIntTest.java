package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmEmpBorrowings;
import com.infostudio.ba.repository.EmEmpBorrowingsRepository;
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
 * Test class for the EmEmpBorrowingsResource REST controller.
 *
 * @see EmEmpBorrowingsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmEmpBorrowingsResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_SERIAL_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_SERIAL_NUMBER = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_FROM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_FROM = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_CHARGED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CHARGED_BY = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_TO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_TO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DISCHARGED_BY = "AAAAAAAAAA";
    private static final String UPDATED_DISCHARGED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_DAMAGE = "AAAAAAAAAA";
    private static final String UPDATED_DAMAGE = "BBBBBBBBBB";

    private static final String DEFAULT_DAMAGED_BY_EMPLOYEE = "AAAAAAAAAA";
    private static final String UPDATED_DAMAGED_BY_EMPLOYEE = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private EmEmpBorrowingsRepository emEmpBorrowingsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmEmpBorrowingsMockMvc;

    private EmEmpBorrowings emEmpBorrowings;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmEmpBorrowingsResource emEmpBorrowingsResource = new EmEmpBorrowingsResource(emEmpBorrowingsRepository);
        this.restEmEmpBorrowingsMockMvc = MockMvcBuilders.standaloneSetup(emEmpBorrowingsResource)
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
    public static EmEmpBorrowings createEntity(EntityManager em) {
        EmEmpBorrowings emEmpBorrowings = new EmEmpBorrowings()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .serialNumber(DEFAULT_SERIAL_NUMBER)
            .dateFrom(DEFAULT_DATE_FROM)
            .chargedBy(DEFAULT_CHARGED_BY)
            .dateTo(DEFAULT_DATE_TO)
            .dischargedBy(DEFAULT_DISCHARGED_BY)
            .damage(DEFAULT_DAMAGE)
            .damagedByEmployee(DEFAULT_DAMAGED_BY_EMPLOYEE)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emEmpBorrowings;
    }

    @Before
    public void initTest() {
        emEmpBorrowings = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmEmpBorrowings() throws Exception {
        int databaseSizeBeforeCreate = emEmpBorrowingsRepository.findAll().size();

        // Create the EmEmpBorrowings
        restEmEmpBorrowingsMockMvc.perform(post("/api/em-emp-borrowings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpBorrowings)))
            .andExpect(status().isCreated());

        // Validate the EmEmpBorrowings in the database
        List<EmEmpBorrowings> emEmpBorrowingsList = emEmpBorrowingsRepository.findAll();
        assertThat(emEmpBorrowingsList).hasSize(databaseSizeBeforeCreate + 1);
        EmEmpBorrowings testEmEmpBorrowings = emEmpBorrowingsList.get(emEmpBorrowingsList.size() - 1);
        assertThat(testEmEmpBorrowings.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testEmEmpBorrowings.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testEmEmpBorrowings.getSerialNumber()).isEqualTo(DEFAULT_SERIAL_NUMBER);
        assertThat(testEmEmpBorrowings.getDateFrom()).isEqualTo(DEFAULT_DATE_FROM);
        assertThat(testEmEmpBorrowings.getChargedBy()).isEqualTo(DEFAULT_CHARGED_BY);
        assertThat(testEmEmpBorrowings.getDateTo()).isEqualTo(DEFAULT_DATE_TO);
        assertThat(testEmEmpBorrowings.getDischargedBy()).isEqualTo(DEFAULT_DISCHARGED_BY);
        assertThat(testEmEmpBorrowings.getDamage()).isEqualTo(DEFAULT_DAMAGE);
        assertThat(testEmEmpBorrowings.getDamagedByEmployee()).isEqualTo(DEFAULT_DAMAGED_BY_EMPLOYEE);
        assertThat(testEmEmpBorrowings.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmEmpBorrowings.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmEmpBorrowings.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmEmpBorrowings.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmEmpBorrowingsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emEmpBorrowingsRepository.findAll().size();

        // Create the EmEmpBorrowings with an existing ID
        emEmpBorrowings.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmEmpBorrowingsMockMvc.perform(post("/api/em-emp-borrowings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpBorrowings)))
            .andExpect(status().isBadRequest());

        // Validate the EmEmpBorrowings in the database
        List<EmEmpBorrowings> emEmpBorrowingsList = emEmpBorrowingsRepository.findAll();
        assertThat(emEmpBorrowingsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = emEmpBorrowingsRepository.findAll().size();
        // set the field null
        emEmpBorrowings.setTitle(null);

        // Create the EmEmpBorrowings, which fails.

        restEmEmpBorrowingsMockMvc.perform(post("/api/em-emp-borrowings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpBorrowings)))
            .andExpect(status().isBadRequest());

        List<EmEmpBorrowings> emEmpBorrowingsList = emEmpBorrowingsRepository.findAll();
        assertThat(emEmpBorrowingsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateFromIsRequired() throws Exception {
        int databaseSizeBeforeTest = emEmpBorrowingsRepository.findAll().size();
        // set the field null
        emEmpBorrowings.setDateFrom(null);

        // Create the EmEmpBorrowings, which fails.

        restEmEmpBorrowingsMockMvc.perform(post("/api/em-emp-borrowings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpBorrowings)))
            .andExpect(status().isBadRequest());

        List<EmEmpBorrowings> emEmpBorrowingsList = emEmpBorrowingsRepository.findAll();
        assertThat(emEmpBorrowingsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmEmpBorrowings() throws Exception {
        // Initialize the database
        emEmpBorrowingsRepository.saveAndFlush(emEmpBorrowings);

        // Get all the emEmpBorrowingsList
        restEmEmpBorrowingsMockMvc.perform(get("/api/em-emp-borrowings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emEmpBorrowings.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].serialNumber").value(hasItem(DEFAULT_SERIAL_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].dateFrom").value(hasItem(DEFAULT_DATE_FROM.toString())))
            .andExpect(jsonPath("$.[*].chargedBy").value(hasItem(DEFAULT_CHARGED_BY.toString())))
            .andExpect(jsonPath("$.[*].dateTo").value(hasItem(DEFAULT_DATE_TO.toString())))
            .andExpect(jsonPath("$.[*].dischargedBy").value(hasItem(DEFAULT_DISCHARGED_BY.toString())))
            .andExpect(jsonPath("$.[*].damage").value(hasItem(DEFAULT_DAMAGE.toString())))
            .andExpect(jsonPath("$.[*].damagedByEmployee").value(hasItem(DEFAULT_DAMAGED_BY_EMPLOYEE.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getEmEmpBorrowings() throws Exception {
        // Initialize the database
        emEmpBorrowingsRepository.saveAndFlush(emEmpBorrowings);

        // Get the emEmpBorrowings
        restEmEmpBorrowingsMockMvc.perform(get("/api/em-emp-borrowings/{id}", emEmpBorrowings.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emEmpBorrowings.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.serialNumber").value(DEFAULT_SERIAL_NUMBER.toString()))
            .andExpect(jsonPath("$.dateFrom").value(DEFAULT_DATE_FROM.toString()))
            .andExpect(jsonPath("$.chargedBy").value(DEFAULT_CHARGED_BY.toString()))
            .andExpect(jsonPath("$.dateTo").value(DEFAULT_DATE_TO.toString()))
            .andExpect(jsonPath("$.dischargedBy").value(DEFAULT_DISCHARGED_BY.toString()))
            .andExpect(jsonPath("$.damage").value(DEFAULT_DAMAGE.toString()))
            .andExpect(jsonPath("$.damagedByEmployee").value(DEFAULT_DAMAGED_BY_EMPLOYEE.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmEmpBorrowings() throws Exception {
        // Get the emEmpBorrowings
        restEmEmpBorrowingsMockMvc.perform(get("/api/em-emp-borrowings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmEmpBorrowings() throws Exception {
        // Initialize the database
        emEmpBorrowingsRepository.saveAndFlush(emEmpBorrowings);
        int databaseSizeBeforeUpdate = emEmpBorrowingsRepository.findAll().size();

        // Update the emEmpBorrowings
        EmEmpBorrowings updatedEmEmpBorrowings = emEmpBorrowingsRepository.findOne(emEmpBorrowings.getId());
        // Disconnect from session so that the updates on updatedEmEmpBorrowings are not directly saved in db
        em.detach(updatedEmEmpBorrowings);
        updatedEmEmpBorrowings
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .serialNumber(UPDATED_SERIAL_NUMBER)
            .dateFrom(UPDATED_DATE_FROM)
            .chargedBy(UPDATED_CHARGED_BY)
            .dateTo(UPDATED_DATE_TO)
            .dischargedBy(UPDATED_DISCHARGED_BY)
            .damage(UPDATED_DAMAGE)
            .damagedByEmployee(UPDATED_DAMAGED_BY_EMPLOYEE)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmEmpBorrowingsMockMvc.perform(put("/api/em-emp-borrowings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmEmpBorrowings)))
            .andExpect(status().isOk());

        // Validate the EmEmpBorrowings in the database
        List<EmEmpBorrowings> emEmpBorrowingsList = emEmpBorrowingsRepository.findAll();
        assertThat(emEmpBorrowingsList).hasSize(databaseSizeBeforeUpdate);
        EmEmpBorrowings testEmEmpBorrowings = emEmpBorrowingsList.get(emEmpBorrowingsList.size() - 1);
        assertThat(testEmEmpBorrowings.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testEmEmpBorrowings.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testEmEmpBorrowings.getSerialNumber()).isEqualTo(UPDATED_SERIAL_NUMBER);
        assertThat(testEmEmpBorrowings.getDateFrom()).isEqualTo(UPDATED_DATE_FROM);
        assertThat(testEmEmpBorrowings.getChargedBy()).isEqualTo(UPDATED_CHARGED_BY);
        assertThat(testEmEmpBorrowings.getDateTo()).isEqualTo(UPDATED_DATE_TO);
        assertThat(testEmEmpBorrowings.getDischargedBy()).isEqualTo(UPDATED_DISCHARGED_BY);
        assertThat(testEmEmpBorrowings.getDamage()).isEqualTo(UPDATED_DAMAGE);
        assertThat(testEmEmpBorrowings.getDamagedByEmployee()).isEqualTo(UPDATED_DAMAGED_BY_EMPLOYEE);
        assertThat(testEmEmpBorrowings.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmEmpBorrowings.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmEmpBorrowings.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmEmpBorrowings.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmEmpBorrowings() throws Exception {
        int databaseSizeBeforeUpdate = emEmpBorrowingsRepository.findAll().size();

        // Create the EmEmpBorrowings

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmEmpBorrowingsMockMvc.perform(put("/api/em-emp-borrowings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpBorrowings)))
            .andExpect(status().isCreated());

        // Validate the EmEmpBorrowings in the database
        List<EmEmpBorrowings> emEmpBorrowingsList = emEmpBorrowingsRepository.findAll();
        assertThat(emEmpBorrowingsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmEmpBorrowings() throws Exception {
        // Initialize the database
        emEmpBorrowingsRepository.saveAndFlush(emEmpBorrowings);
        int databaseSizeBeforeDelete = emEmpBorrowingsRepository.findAll().size();

        // Get the emEmpBorrowings
        restEmEmpBorrowingsMockMvc.perform(delete("/api/em-emp-borrowings/{id}", emEmpBorrowings.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmEmpBorrowings> emEmpBorrowingsList = emEmpBorrowingsRepository.findAll();
        assertThat(emEmpBorrowingsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmEmpBorrowings.class);
        EmEmpBorrowings emEmpBorrowings1 = new EmEmpBorrowings();
        emEmpBorrowings1.setId(1L);
        EmEmpBorrowings emEmpBorrowings2 = new EmEmpBorrowings();
        emEmpBorrowings2.setId(emEmpBorrowings1.getId());
        assertThat(emEmpBorrowings1).isEqualTo(emEmpBorrowings2);
        emEmpBorrowings2.setId(2L);
        assertThat(emEmpBorrowings1).isNotEqualTo(emEmpBorrowings2);
        emEmpBorrowings1.setId(null);
        assertThat(emEmpBorrowings1).isNotEqualTo(emEmpBorrowings2);
    }
}
