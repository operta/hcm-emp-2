package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmPenalties;
import com.infostudio.ba.repository.EmPenaltiesRepository;
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
 * Test class for the EmPenaltiesResource REST controller.
 *
 * @see EmPenaltiesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmPenaltiesResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_FROM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_FROM = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_TO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_TO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private EmPenaltiesRepository emPenaltiesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmPenaltiesMockMvc;

    private EmPenalties emPenalties;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmPenaltiesResource emPenaltiesResource = new EmPenaltiesResource(emPenaltiesRepository);
        this.restEmPenaltiesMockMvc = MockMvcBuilders.standaloneSetup(emPenaltiesResource)
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
    public static EmPenalties createEntity(EntityManager em) {
        EmPenalties emPenalties = new EmPenalties()
            .description(DEFAULT_DESCRIPTION)
            .dateFrom(DEFAULT_DATE_FROM)
            .dateTo(DEFAULT_DATE_TO)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emPenalties;
    }

    @Before
    public void initTest() {
        emPenalties = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmPenalties() throws Exception {
        int databaseSizeBeforeCreate = emPenaltiesRepository.findAll().size();

        // Create the EmPenalties
        restEmPenaltiesMockMvc.perform(post("/api/em-penalties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emPenalties)))
            .andExpect(status().isCreated());

        // Validate the EmPenalties in the database
        List<EmPenalties> emPenaltiesList = emPenaltiesRepository.findAll();
        assertThat(emPenaltiesList).hasSize(databaseSizeBeforeCreate + 1);
        EmPenalties testEmPenalties = emPenaltiesList.get(emPenaltiesList.size() - 1);
        assertThat(testEmPenalties.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testEmPenalties.getDateFrom()).isEqualTo(DEFAULT_DATE_FROM);
        assertThat(testEmPenalties.getDateTo()).isEqualTo(DEFAULT_DATE_TO);
        assertThat(testEmPenalties.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmPenalties.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmPenalties.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmPenalties.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmPenaltiesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emPenaltiesRepository.findAll().size();

        // Create the EmPenalties with an existing ID
        emPenalties.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmPenaltiesMockMvc.perform(post("/api/em-penalties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emPenalties)))
            .andExpect(status().isBadRequest());

        // Validate the EmPenalties in the database
        List<EmPenalties> emPenaltiesList = emPenaltiesRepository.findAll();
        assertThat(emPenaltiesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEmPenalties() throws Exception {
        // Initialize the database
        emPenaltiesRepository.saveAndFlush(emPenalties);

        // Get all the emPenaltiesList
        restEmPenaltiesMockMvc.perform(get("/api/em-penalties?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emPenalties.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].dateFrom").value(hasItem(DEFAULT_DATE_FROM.toString())))
            .andExpect(jsonPath("$.[*].dateTo").value(hasItem(DEFAULT_DATE_TO.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getEmPenalties() throws Exception {
        // Initialize the database
        emPenaltiesRepository.saveAndFlush(emPenalties);

        // Get the emPenalties
        restEmPenaltiesMockMvc.perform(get("/api/em-penalties/{id}", emPenalties.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emPenalties.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.dateFrom").value(DEFAULT_DATE_FROM.toString()))
            .andExpect(jsonPath("$.dateTo").value(DEFAULT_DATE_TO.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmPenalties() throws Exception {
        // Get the emPenalties
        restEmPenaltiesMockMvc.perform(get("/api/em-penalties/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmPenalties() throws Exception {
        // Initialize the database
        emPenaltiesRepository.saveAndFlush(emPenalties);
        int databaseSizeBeforeUpdate = emPenaltiesRepository.findAll().size();

        // Update the emPenalties
        EmPenalties updatedEmPenalties = emPenaltiesRepository.findOne(emPenalties.getId());
        // Disconnect from session so that the updates on updatedEmPenalties are not directly saved in db
        em.detach(updatedEmPenalties);
        updatedEmPenalties
            .description(UPDATED_DESCRIPTION)
            .dateFrom(UPDATED_DATE_FROM)
            .dateTo(UPDATED_DATE_TO)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmPenaltiesMockMvc.perform(put("/api/em-penalties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmPenalties)))
            .andExpect(status().isOk());

        // Validate the EmPenalties in the database
        List<EmPenalties> emPenaltiesList = emPenaltiesRepository.findAll();
        assertThat(emPenaltiesList).hasSize(databaseSizeBeforeUpdate);
        EmPenalties testEmPenalties = emPenaltiesList.get(emPenaltiesList.size() - 1);
        assertThat(testEmPenalties.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testEmPenalties.getDateFrom()).isEqualTo(UPDATED_DATE_FROM);
        assertThat(testEmPenalties.getDateTo()).isEqualTo(UPDATED_DATE_TO);
        assertThat(testEmPenalties.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmPenalties.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmPenalties.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmPenalties.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmPenalties() throws Exception {
        int databaseSizeBeforeUpdate = emPenaltiesRepository.findAll().size();

        // Create the EmPenalties

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmPenaltiesMockMvc.perform(put("/api/em-penalties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emPenalties)))
            .andExpect(status().isCreated());

        // Validate the EmPenalties in the database
        List<EmPenalties> emPenaltiesList = emPenaltiesRepository.findAll();
        assertThat(emPenaltiesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmPenalties() throws Exception {
        // Initialize the database
        emPenaltiesRepository.saveAndFlush(emPenalties);
        int databaseSizeBeforeDelete = emPenaltiesRepository.findAll().size();

        // Get the emPenalties
        restEmPenaltiesMockMvc.perform(delete("/api/em-penalties/{id}", emPenalties.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmPenalties> emPenaltiesList = emPenaltiesRepository.findAll();
        assertThat(emPenaltiesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmPenalties.class);
        EmPenalties emPenalties1 = new EmPenalties();
        emPenalties1.setId(1L);
        EmPenalties emPenalties2 = new EmPenalties();
        emPenalties2.setId(emPenalties1.getId());
        assertThat(emPenalties1).isEqualTo(emPenalties2);
        emPenalties2.setId(2L);
        assertThat(emPenalties1).isNotEqualTo(emPenalties2);
        emPenalties1.setId(null);
        assertThat(emPenalties1).isNotEqualTo(emPenalties2);
    }
}
