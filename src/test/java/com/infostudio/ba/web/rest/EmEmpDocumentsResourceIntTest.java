package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmEmpDocuments;
import com.infostudio.ba.repository.EmEmpDocumentsRepository;
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
 * Test class for the EmEmpDocumentsResource REST controller.
 *
 * @see EmEmpDocumentsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmEmpDocumentsResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_CREATED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_CREATED = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_VALID_FROM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_VALID_FROM = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_VALID_TO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_VALID_TO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private EmEmpDocumentsRepository emEmpDocumentsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmEmpDocumentsMockMvc;

    private EmEmpDocuments emEmpDocuments;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmEmpDocumentsResource emEmpDocumentsResource = new EmEmpDocumentsResource(emEmpDocumentsRepository);
        this.restEmEmpDocumentsMockMvc = MockMvcBuilders.standaloneSetup(emEmpDocumentsResource)
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
    public static EmEmpDocuments createEntity(EntityManager em) {
        EmEmpDocuments emEmpDocuments = new EmEmpDocuments()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .dateCreated(DEFAULT_DATE_CREATED)
            .validFrom(DEFAULT_VALID_FROM)
            .validTo(DEFAULT_VALID_TO)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emEmpDocuments;
    }

    @Before
    public void initTest() {
        emEmpDocuments = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmEmpDocuments() throws Exception {
        int databaseSizeBeforeCreate = emEmpDocumentsRepository.findAll().size();

        // Create the EmEmpDocuments
        restEmEmpDocumentsMockMvc.perform(post("/api/em-emp-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpDocuments)))
            .andExpect(status().isCreated());

        // Validate the EmEmpDocuments in the database
        List<EmEmpDocuments> emEmpDocumentsList = emEmpDocumentsRepository.findAll();
        assertThat(emEmpDocumentsList).hasSize(databaseSizeBeforeCreate + 1);
        EmEmpDocuments testEmEmpDocuments = emEmpDocumentsList.get(emEmpDocumentsList.size() - 1);
        assertThat(testEmEmpDocuments.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEmEmpDocuments.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testEmEmpDocuments.getDateCreated()).isEqualTo(DEFAULT_DATE_CREATED);
        assertThat(testEmEmpDocuments.getValidFrom()).isEqualTo(DEFAULT_VALID_FROM);
        assertThat(testEmEmpDocuments.getValidTo()).isEqualTo(DEFAULT_VALID_TO);
        assertThat(testEmEmpDocuments.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmEmpDocuments.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmEmpDocuments.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmEmpDocuments.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmEmpDocumentsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emEmpDocumentsRepository.findAll().size();

        // Create the EmEmpDocuments with an existing ID
        emEmpDocuments.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmEmpDocumentsMockMvc.perform(post("/api/em-emp-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpDocuments)))
            .andExpect(status().isBadRequest());

        // Validate the EmEmpDocuments in the database
        List<EmEmpDocuments> emEmpDocumentsList = emEmpDocumentsRepository.findAll();
        assertThat(emEmpDocumentsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = emEmpDocumentsRepository.findAll().size();
        // set the field null
        emEmpDocuments.setName(null);

        // Create the EmEmpDocuments, which fails.

        restEmEmpDocumentsMockMvc.perform(post("/api/em-emp-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpDocuments)))
            .andExpect(status().isBadRequest());

        List<EmEmpDocuments> emEmpDocumentsList = emEmpDocumentsRepository.findAll();
        assertThat(emEmpDocumentsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateCreatedIsRequired() throws Exception {
        int databaseSizeBeforeTest = emEmpDocumentsRepository.findAll().size();
        // set the field null
        emEmpDocuments.setDateCreated(null);

        // Create the EmEmpDocuments, which fails.

        restEmEmpDocumentsMockMvc.perform(post("/api/em-emp-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpDocuments)))
            .andExpect(status().isBadRequest());

        List<EmEmpDocuments> emEmpDocumentsList = emEmpDocumentsRepository.findAll();
        assertThat(emEmpDocumentsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmEmpDocuments() throws Exception {
        // Initialize the database
        emEmpDocumentsRepository.saveAndFlush(emEmpDocuments);

        // Get all the emEmpDocumentsList
        restEmEmpDocumentsMockMvc.perform(get("/api/em-emp-documents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emEmpDocuments.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].dateCreated").value(hasItem(DEFAULT_DATE_CREATED.toString())))
            .andExpect(jsonPath("$.[*].validFrom").value(hasItem(DEFAULT_VALID_FROM.toString())))
            .andExpect(jsonPath("$.[*].validTo").value(hasItem(DEFAULT_VALID_TO.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getEmEmpDocuments() throws Exception {
        // Initialize the database
        emEmpDocumentsRepository.saveAndFlush(emEmpDocuments);

        // Get the emEmpDocuments
        restEmEmpDocumentsMockMvc.perform(get("/api/em-emp-documents/{id}", emEmpDocuments.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emEmpDocuments.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.dateCreated").value(DEFAULT_DATE_CREATED.toString()))
            .andExpect(jsonPath("$.validFrom").value(DEFAULT_VALID_FROM.toString()))
            .andExpect(jsonPath("$.validTo").value(DEFAULT_VALID_TO.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmEmpDocuments() throws Exception {
        // Get the emEmpDocuments
        restEmEmpDocumentsMockMvc.perform(get("/api/em-emp-documents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmEmpDocuments() throws Exception {
        // Initialize the database
        emEmpDocumentsRepository.saveAndFlush(emEmpDocuments);
        int databaseSizeBeforeUpdate = emEmpDocumentsRepository.findAll().size();

        // Update the emEmpDocuments
        EmEmpDocuments updatedEmEmpDocuments = emEmpDocumentsRepository.findOne(emEmpDocuments.getId());
        // Disconnect from session so that the updates on updatedEmEmpDocuments are not directly saved in db
        em.detach(updatedEmEmpDocuments);
        updatedEmEmpDocuments
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .dateCreated(UPDATED_DATE_CREATED)
            .validFrom(UPDATED_VALID_FROM)
            .validTo(UPDATED_VALID_TO)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmEmpDocumentsMockMvc.perform(put("/api/em-emp-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmEmpDocuments)))
            .andExpect(status().isOk());

        // Validate the EmEmpDocuments in the database
        List<EmEmpDocuments> emEmpDocumentsList = emEmpDocumentsRepository.findAll();
        assertThat(emEmpDocumentsList).hasSize(databaseSizeBeforeUpdate);
        EmEmpDocuments testEmEmpDocuments = emEmpDocumentsList.get(emEmpDocumentsList.size() - 1);
        assertThat(testEmEmpDocuments.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEmEmpDocuments.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testEmEmpDocuments.getDateCreated()).isEqualTo(UPDATED_DATE_CREATED);
        assertThat(testEmEmpDocuments.getValidFrom()).isEqualTo(UPDATED_VALID_FROM);
        assertThat(testEmEmpDocuments.getValidTo()).isEqualTo(UPDATED_VALID_TO);
        assertThat(testEmEmpDocuments.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmEmpDocuments.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmEmpDocuments.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmEmpDocuments.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmEmpDocuments() throws Exception {
        int databaseSizeBeforeUpdate = emEmpDocumentsRepository.findAll().size();

        // Create the EmEmpDocuments

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmEmpDocumentsMockMvc.perform(put("/api/em-emp-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpDocuments)))
            .andExpect(status().isCreated());

        // Validate the EmEmpDocuments in the database
        List<EmEmpDocuments> emEmpDocumentsList = emEmpDocumentsRepository.findAll();
        assertThat(emEmpDocumentsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmEmpDocuments() throws Exception {
        // Initialize the database
        emEmpDocumentsRepository.saveAndFlush(emEmpDocuments);
        int databaseSizeBeforeDelete = emEmpDocumentsRepository.findAll().size();

        // Get the emEmpDocuments
        restEmEmpDocumentsMockMvc.perform(delete("/api/em-emp-documents/{id}", emEmpDocuments.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmEmpDocuments> emEmpDocumentsList = emEmpDocumentsRepository.findAll();
        assertThat(emEmpDocumentsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmEmpDocuments.class);
        EmEmpDocuments emEmpDocuments1 = new EmEmpDocuments();
        emEmpDocuments1.setId(1L);
        EmEmpDocuments emEmpDocuments2 = new EmEmpDocuments();
        emEmpDocuments2.setId(emEmpDocuments1.getId());
        assertThat(emEmpDocuments1).isEqualTo(emEmpDocuments2);
        emEmpDocuments2.setId(2L);
        assertThat(emEmpDocuments1).isNotEqualTo(emEmpDocuments2);
        emEmpDocuments1.setId(null);
        assertThat(emEmpDocuments1).isNotEqualTo(emEmpDocuments2);
    }
}
