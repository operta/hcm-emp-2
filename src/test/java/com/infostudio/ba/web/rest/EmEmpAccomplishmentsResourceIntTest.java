package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmEmpAccomplishments;
import com.infostudio.ba.repository.EmEmpAccomplishmentsRepository;
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
 * Test class for the EmEmpAccomplishmentsResource REST controller.
 *
 * @see EmEmpAccomplishmentsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmEmpAccomplishmentsResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_ORGANIZATION = "AAAAAAAAAA";
    private static final String UPDATED_ORGANIZATION = "BBBBBBBBBB";

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final String DEFAULT_ASSOCIATION = "AAAAAAAAAA";
    private static final String UPDATED_ASSOCIATION = "BBBBBBBBBB";

    private static final String DEFAULT_ONGOING = "AAAAAAAAAA";
    private static final String UPDATED_ONGOING = "BBBBBBBBBB";

    private static final String DEFAULT_LINK = "AAAAAAAAAA";
    private static final String UPDATED_LINK = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_FROM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_FROM = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_TO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_TO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_OCCUPATION = "AAAAAAAAAA";
    private static final String UPDATED_OCCUPATION = "BBBBBBBBBB";

    private static final String DEFAULT_PROFICIENCY = "AAAAAAAAAA";
    private static final String UPDATED_PROFICIENCY = "BBBBBBBBBB";

    private static final String DEFAULT_LICENCE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_LICENCE_NUMBER = "BBBBBBBBBB";

    private static final Integer DEFAULT_RATING = 1;
    private static final Integer UPDATED_RATING = 2;

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private EmEmpAccomplishmentsRepository emEmpAccomplishmentsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmEmpAccomplishmentsMockMvc;

    private EmEmpAccomplishments emEmpAccomplishments;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmEmpAccomplishmentsResource emEmpAccomplishmentsResource = new EmEmpAccomplishmentsResource(emEmpAccomplishmentsRepository);
        this.restEmEmpAccomplishmentsMockMvc = MockMvcBuilders.standaloneSetup(emEmpAccomplishmentsResource)
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
    public static EmEmpAccomplishments createEntity(EntityManager em) {
        EmEmpAccomplishments emEmpAccomplishments = new EmEmpAccomplishments()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .organization(DEFAULT_ORGANIZATION)
            .location(DEFAULT_LOCATION)
            .association(DEFAULT_ASSOCIATION)
            .ongoing(DEFAULT_ONGOING)
            .link(DEFAULT_LINK)
            .dateFrom(DEFAULT_DATE_FROM)
            .dateTo(DEFAULT_DATE_TO)
            .occupation(DEFAULT_OCCUPATION)
            .proficiency(DEFAULT_PROFICIENCY)
            .licenceNumber(DEFAULT_LICENCE_NUMBER)
            .rating(DEFAULT_RATING)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emEmpAccomplishments;
    }

    @Before
    public void initTest() {
        emEmpAccomplishments = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmEmpAccomplishments() throws Exception {
        int databaseSizeBeforeCreate = emEmpAccomplishmentsRepository.findAll().size();

        // Create the EmEmpAccomplishments
        restEmEmpAccomplishmentsMockMvc.perform(post("/api/em-emp-accomplishments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpAccomplishments)))
            .andExpect(status().isCreated());

        // Validate the EmEmpAccomplishments in the database
        List<EmEmpAccomplishments> emEmpAccomplishmentsList = emEmpAccomplishmentsRepository.findAll();
        assertThat(emEmpAccomplishmentsList).hasSize(databaseSizeBeforeCreate + 1);
        EmEmpAccomplishments testEmEmpAccomplishments = emEmpAccomplishmentsList.get(emEmpAccomplishmentsList.size() - 1);
        assertThat(testEmEmpAccomplishments.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testEmEmpAccomplishments.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testEmEmpAccomplishments.getOrganization()).isEqualTo(DEFAULT_ORGANIZATION);
        assertThat(testEmEmpAccomplishments.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testEmEmpAccomplishments.getAssociation()).isEqualTo(DEFAULT_ASSOCIATION);
        assertThat(testEmEmpAccomplishments.getOngoing()).isEqualTo(DEFAULT_ONGOING);
        assertThat(testEmEmpAccomplishments.getLink()).isEqualTo(DEFAULT_LINK);
        assertThat(testEmEmpAccomplishments.getDateFrom()).isEqualTo(DEFAULT_DATE_FROM);
        assertThat(testEmEmpAccomplishments.getDateTo()).isEqualTo(DEFAULT_DATE_TO);
        assertThat(testEmEmpAccomplishments.getOccupation()).isEqualTo(DEFAULT_OCCUPATION);
        assertThat(testEmEmpAccomplishments.getProficiency()).isEqualTo(DEFAULT_PROFICIENCY);
        assertThat(testEmEmpAccomplishments.getLicenceNumber()).isEqualTo(DEFAULT_LICENCE_NUMBER);
        assertThat(testEmEmpAccomplishments.getRating()).isEqualTo(DEFAULT_RATING);
        assertThat(testEmEmpAccomplishments.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmEmpAccomplishments.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmEmpAccomplishments.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmEmpAccomplishments.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmEmpAccomplishmentsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emEmpAccomplishmentsRepository.findAll().size();

        // Create the EmEmpAccomplishments with an existing ID
        emEmpAccomplishments.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmEmpAccomplishmentsMockMvc.perform(post("/api/em-emp-accomplishments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpAccomplishments)))
            .andExpect(status().isBadRequest());

        // Validate the EmEmpAccomplishments in the database
        List<EmEmpAccomplishments> emEmpAccomplishmentsList = emEmpAccomplishmentsRepository.findAll();
        assertThat(emEmpAccomplishmentsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = emEmpAccomplishmentsRepository.findAll().size();
        // set the field null
        emEmpAccomplishments.setTitle(null);

        // Create the EmEmpAccomplishments, which fails.

        restEmEmpAccomplishmentsMockMvc.perform(post("/api/em-emp-accomplishments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpAccomplishments)))
            .andExpect(status().isBadRequest());

        List<EmEmpAccomplishments> emEmpAccomplishmentsList = emEmpAccomplishmentsRepository.findAll();
        assertThat(emEmpAccomplishmentsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmEmpAccomplishments() throws Exception {
        // Initialize the database
        emEmpAccomplishmentsRepository.saveAndFlush(emEmpAccomplishments);

        // Get all the emEmpAccomplishmentsList
        restEmEmpAccomplishmentsMockMvc.perform(get("/api/em-emp-accomplishments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emEmpAccomplishments.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].organization").value(hasItem(DEFAULT_ORGANIZATION.toString())))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())))
            .andExpect(jsonPath("$.[*].association").value(hasItem(DEFAULT_ASSOCIATION.toString())))
            .andExpect(jsonPath("$.[*].ongoing").value(hasItem(DEFAULT_ONGOING.toString())))
            .andExpect(jsonPath("$.[*].link").value(hasItem(DEFAULT_LINK.toString())))
            .andExpect(jsonPath("$.[*].dateFrom").value(hasItem(DEFAULT_DATE_FROM.toString())))
            .andExpect(jsonPath("$.[*].dateTo").value(hasItem(DEFAULT_DATE_TO.toString())))
            .andExpect(jsonPath("$.[*].occupation").value(hasItem(DEFAULT_OCCUPATION.toString())))
            .andExpect(jsonPath("$.[*].proficiency").value(hasItem(DEFAULT_PROFICIENCY.toString())))
            .andExpect(jsonPath("$.[*].licenceNumber").value(hasItem(DEFAULT_LICENCE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING)))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getEmEmpAccomplishments() throws Exception {
        // Initialize the database
        emEmpAccomplishmentsRepository.saveAndFlush(emEmpAccomplishments);

        // Get the emEmpAccomplishments
        restEmEmpAccomplishmentsMockMvc.perform(get("/api/em-emp-accomplishments/{id}", emEmpAccomplishments.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emEmpAccomplishments.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.organization").value(DEFAULT_ORGANIZATION.toString()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()))
            .andExpect(jsonPath("$.association").value(DEFAULT_ASSOCIATION.toString()))
            .andExpect(jsonPath("$.ongoing").value(DEFAULT_ONGOING.toString()))
            .andExpect(jsonPath("$.link").value(DEFAULT_LINK.toString()))
            .andExpect(jsonPath("$.dateFrom").value(DEFAULT_DATE_FROM.toString()))
            .andExpect(jsonPath("$.dateTo").value(DEFAULT_DATE_TO.toString()))
            .andExpect(jsonPath("$.occupation").value(DEFAULT_OCCUPATION.toString()))
            .andExpect(jsonPath("$.proficiency").value(DEFAULT_PROFICIENCY.toString()))
            .andExpect(jsonPath("$.licenceNumber").value(DEFAULT_LICENCE_NUMBER.toString()))
            .andExpect(jsonPath("$.rating").value(DEFAULT_RATING))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmEmpAccomplishments() throws Exception {
        // Get the emEmpAccomplishments
        restEmEmpAccomplishmentsMockMvc.perform(get("/api/em-emp-accomplishments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmEmpAccomplishments() throws Exception {
        // Initialize the database
        emEmpAccomplishmentsRepository.saveAndFlush(emEmpAccomplishments);
        int databaseSizeBeforeUpdate = emEmpAccomplishmentsRepository.findAll().size();

        // Update the emEmpAccomplishments
        EmEmpAccomplishments updatedEmEmpAccomplishments = emEmpAccomplishmentsRepository.findOne(emEmpAccomplishments.getId());
        // Disconnect from session so that the updates on updatedEmEmpAccomplishments are not directly saved in db
        em.detach(updatedEmEmpAccomplishments);
        updatedEmEmpAccomplishments
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .organization(UPDATED_ORGANIZATION)
            .location(UPDATED_LOCATION)
            .association(UPDATED_ASSOCIATION)
            .ongoing(UPDATED_ONGOING)
            .link(UPDATED_LINK)
            .dateFrom(UPDATED_DATE_FROM)
            .dateTo(UPDATED_DATE_TO)
            .occupation(UPDATED_OCCUPATION)
            .proficiency(UPDATED_PROFICIENCY)
            .licenceNumber(UPDATED_LICENCE_NUMBER)
            .rating(UPDATED_RATING)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmEmpAccomplishmentsMockMvc.perform(put("/api/em-emp-accomplishments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmEmpAccomplishments)))
            .andExpect(status().isOk());

        // Validate the EmEmpAccomplishments in the database
        List<EmEmpAccomplishments> emEmpAccomplishmentsList = emEmpAccomplishmentsRepository.findAll();
        assertThat(emEmpAccomplishmentsList).hasSize(databaseSizeBeforeUpdate);
        EmEmpAccomplishments testEmEmpAccomplishments = emEmpAccomplishmentsList.get(emEmpAccomplishmentsList.size() - 1);
        assertThat(testEmEmpAccomplishments.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testEmEmpAccomplishments.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testEmEmpAccomplishments.getOrganization()).isEqualTo(UPDATED_ORGANIZATION);
        assertThat(testEmEmpAccomplishments.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testEmEmpAccomplishments.getAssociation()).isEqualTo(UPDATED_ASSOCIATION);
        assertThat(testEmEmpAccomplishments.getOngoing()).isEqualTo(UPDATED_ONGOING);
        assertThat(testEmEmpAccomplishments.getLink()).isEqualTo(UPDATED_LINK);
        assertThat(testEmEmpAccomplishments.getDateFrom()).isEqualTo(UPDATED_DATE_FROM);
        assertThat(testEmEmpAccomplishments.getDateTo()).isEqualTo(UPDATED_DATE_TO);
        assertThat(testEmEmpAccomplishments.getOccupation()).isEqualTo(UPDATED_OCCUPATION);
        assertThat(testEmEmpAccomplishments.getProficiency()).isEqualTo(UPDATED_PROFICIENCY);
        assertThat(testEmEmpAccomplishments.getLicenceNumber()).isEqualTo(UPDATED_LICENCE_NUMBER);
        assertThat(testEmEmpAccomplishments.getRating()).isEqualTo(UPDATED_RATING);
        assertThat(testEmEmpAccomplishments.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmEmpAccomplishments.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmEmpAccomplishments.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmEmpAccomplishments.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmEmpAccomplishments() throws Exception {
        int databaseSizeBeforeUpdate = emEmpAccomplishmentsRepository.findAll().size();

        // Create the EmEmpAccomplishments

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmEmpAccomplishmentsMockMvc.perform(put("/api/em-emp-accomplishments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpAccomplishments)))
            .andExpect(status().isCreated());

        // Validate the EmEmpAccomplishments in the database
        List<EmEmpAccomplishments> emEmpAccomplishmentsList = emEmpAccomplishmentsRepository.findAll();
        assertThat(emEmpAccomplishmentsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmEmpAccomplishments() throws Exception {
        // Initialize the database
        emEmpAccomplishmentsRepository.saveAndFlush(emEmpAccomplishments);
        int databaseSizeBeforeDelete = emEmpAccomplishmentsRepository.findAll().size();

        // Get the emEmpAccomplishments
        restEmEmpAccomplishmentsMockMvc.perform(delete("/api/em-emp-accomplishments/{id}", emEmpAccomplishments.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmEmpAccomplishments> emEmpAccomplishmentsList = emEmpAccomplishmentsRepository.findAll();
        assertThat(emEmpAccomplishmentsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmEmpAccomplishments.class);
        EmEmpAccomplishments emEmpAccomplishments1 = new EmEmpAccomplishments();
        emEmpAccomplishments1.setId(1L);
        EmEmpAccomplishments emEmpAccomplishments2 = new EmEmpAccomplishments();
        emEmpAccomplishments2.setId(emEmpAccomplishments1.getId());
        assertThat(emEmpAccomplishments1).isEqualTo(emEmpAccomplishments2);
        emEmpAccomplishments2.setId(2L);
        assertThat(emEmpAccomplishments1).isNotEqualTo(emEmpAccomplishments2);
        emEmpAccomplishments1.setId(null);
        assertThat(emEmpAccomplishments1).isNotEqualTo(emEmpAccomplishments2);
    }
}
