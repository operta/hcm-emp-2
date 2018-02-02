package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmEmpNotes;
import com.infostudio.ba.repository.EmEmpNotesRepository;
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
 * Test class for the EmEmpNotesResource REST controller.
 *
 * @see EmEmpNotesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmEmpNotesResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DECSRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DECSRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private EmEmpNotesRepository emEmpNotesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmEmpNotesMockMvc;

    private EmEmpNotes emEmpNotes;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmEmpNotesResource emEmpNotesResource = new EmEmpNotesResource(emEmpNotesRepository);
        this.restEmEmpNotesMockMvc = MockMvcBuilders.standaloneSetup(emEmpNotesResource)
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
    public static EmEmpNotes createEntity(EntityManager em) {
        EmEmpNotes emEmpNotes = new EmEmpNotes()
            .title(DEFAULT_TITLE)
            .decsription(DEFAULT_DECSRIPTION)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emEmpNotes;
    }

    @Before
    public void initTest() {
        emEmpNotes = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmEmpNotes() throws Exception {
        int databaseSizeBeforeCreate = emEmpNotesRepository.findAll().size();

        // Create the EmEmpNotes
        restEmEmpNotesMockMvc.perform(post("/api/em-emp-notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpNotes)))
            .andExpect(status().isCreated());

        // Validate the EmEmpNotes in the database
        List<EmEmpNotes> emEmpNotesList = emEmpNotesRepository.findAll();
        assertThat(emEmpNotesList).hasSize(databaseSizeBeforeCreate + 1);
        EmEmpNotes testEmEmpNotes = emEmpNotesList.get(emEmpNotesList.size() - 1);
        assertThat(testEmEmpNotes.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testEmEmpNotes.getDecsription()).isEqualTo(DEFAULT_DECSRIPTION);
        assertThat(testEmEmpNotes.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmEmpNotes.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmEmpNotes.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmEmpNotes.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmEmpNotesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emEmpNotesRepository.findAll().size();

        // Create the EmEmpNotes with an existing ID
        emEmpNotes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmEmpNotesMockMvc.perform(post("/api/em-emp-notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpNotes)))
            .andExpect(status().isBadRequest());

        // Validate the EmEmpNotes in the database
        List<EmEmpNotes> emEmpNotesList = emEmpNotesRepository.findAll();
        assertThat(emEmpNotesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = emEmpNotesRepository.findAll().size();
        // set the field null
        emEmpNotes.setTitle(null);

        // Create the EmEmpNotes, which fails.

        restEmEmpNotesMockMvc.perform(post("/api/em-emp-notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpNotes)))
            .andExpect(status().isBadRequest());

        List<EmEmpNotes> emEmpNotesList = emEmpNotesRepository.findAll();
        assertThat(emEmpNotesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmEmpNotes() throws Exception {
        // Initialize the database
        emEmpNotesRepository.saveAndFlush(emEmpNotes);

        // Get all the emEmpNotesList
        restEmEmpNotesMockMvc.perform(get("/api/em-emp-notes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emEmpNotes.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].decsription").value(hasItem(DEFAULT_DECSRIPTION.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getEmEmpNotes() throws Exception {
        // Initialize the database
        emEmpNotesRepository.saveAndFlush(emEmpNotes);

        // Get the emEmpNotes
        restEmEmpNotesMockMvc.perform(get("/api/em-emp-notes/{id}", emEmpNotes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emEmpNotes.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.decsription").value(DEFAULT_DECSRIPTION.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmEmpNotes() throws Exception {
        // Get the emEmpNotes
        restEmEmpNotesMockMvc.perform(get("/api/em-emp-notes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmEmpNotes() throws Exception {
        // Initialize the database
        emEmpNotesRepository.saveAndFlush(emEmpNotes);
        int databaseSizeBeforeUpdate = emEmpNotesRepository.findAll().size();

        // Update the emEmpNotes
        EmEmpNotes updatedEmEmpNotes = emEmpNotesRepository.findOne(emEmpNotes.getId());
        // Disconnect from session so that the updates on updatedEmEmpNotes are not directly saved in db
        em.detach(updatedEmEmpNotes);
        updatedEmEmpNotes
            .title(UPDATED_TITLE)
            .decsription(UPDATED_DECSRIPTION)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmEmpNotesMockMvc.perform(put("/api/em-emp-notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmEmpNotes)))
            .andExpect(status().isOk());

        // Validate the EmEmpNotes in the database
        List<EmEmpNotes> emEmpNotesList = emEmpNotesRepository.findAll();
        assertThat(emEmpNotesList).hasSize(databaseSizeBeforeUpdate);
        EmEmpNotes testEmEmpNotes = emEmpNotesList.get(emEmpNotesList.size() - 1);
        assertThat(testEmEmpNotes.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testEmEmpNotes.getDecsription()).isEqualTo(UPDATED_DECSRIPTION);
        assertThat(testEmEmpNotes.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmEmpNotes.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmEmpNotes.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmEmpNotes.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmEmpNotes() throws Exception {
        int databaseSizeBeforeUpdate = emEmpNotesRepository.findAll().size();

        // Create the EmEmpNotes

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmEmpNotesMockMvc.perform(put("/api/em-emp-notes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpNotes)))
            .andExpect(status().isCreated());

        // Validate the EmEmpNotes in the database
        List<EmEmpNotes> emEmpNotesList = emEmpNotesRepository.findAll();
        assertThat(emEmpNotesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmEmpNotes() throws Exception {
        // Initialize the database
        emEmpNotesRepository.saveAndFlush(emEmpNotes);
        int databaseSizeBeforeDelete = emEmpNotesRepository.findAll().size();

        // Get the emEmpNotes
        restEmEmpNotesMockMvc.perform(delete("/api/em-emp-notes/{id}", emEmpNotes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmEmpNotes> emEmpNotesList = emEmpNotesRepository.findAll();
        assertThat(emEmpNotesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmEmpNotes.class);
        EmEmpNotes emEmpNotes1 = new EmEmpNotes();
        emEmpNotes1.setId(1L);
        EmEmpNotes emEmpNotes2 = new EmEmpNotes();
        emEmpNotes2.setId(emEmpNotes1.getId());
        assertThat(emEmpNotes1).isEqualTo(emEmpNotes2);
        emEmpNotes2.setId(2L);
        assertThat(emEmpNotes1).isNotEqualTo(emEmpNotes2);
        emEmpNotes1.setId(null);
        assertThat(emEmpNotes1).isNotEqualTo(emEmpNotes2);
    }
}
