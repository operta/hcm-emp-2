package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmEmpEmgContacts;
import com.infostudio.ba.repository.EmEmpEmgContactsRepository;
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
 * Test class for the EmEmpEmgContactsResource REST controller.
 *
 * @see EmEmpEmgContactsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmEmpEmgContactsResourceIntTest {

    private static final String DEFAULT_CONTACT = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT = "BBBBBBBBBB";

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
    private EmEmpEmgContactsRepository emEmpEmgContactsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmEmpEmgContactsMockMvc;

    private EmEmpEmgContacts emEmpEmgContacts;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmEmpEmgContactsResource emEmpEmgContactsResource = new EmEmpEmgContactsResource(emEmpEmgContactsRepository);
        this.restEmEmpEmgContactsMockMvc = MockMvcBuilders.standaloneSetup(emEmpEmgContactsResource)
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
    public static EmEmpEmgContacts createEntity(EntityManager em) {
        EmEmpEmgContacts emEmpEmgContacts = new EmEmpEmgContacts()
//            .contact(DEFAULT_CONTACT)
//            .description(DEFAULT_DESCRIPTION)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emEmpEmgContacts;
    }

    @Before
    public void initTest() {
        emEmpEmgContacts = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmEmpEmgContacts() throws Exception {
        int databaseSizeBeforeCreate = emEmpEmgContactsRepository.findAll().size();

        // Create the EmEmpEmgContacts
        restEmEmpEmgContactsMockMvc.perform(post("/api/em-emp-emg-contacts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpEmgContacts)))
            .andExpect(status().isCreated());

        // Validate the EmEmpEmgContacts in the database
        List<EmEmpEmgContacts> emEmpEmgContactsList = emEmpEmgContactsRepository.findAll();
        assertThat(emEmpEmgContactsList).hasSize(databaseSizeBeforeCreate + 1);
        EmEmpEmgContacts testEmEmpEmgContacts = emEmpEmgContactsList.get(emEmpEmgContactsList.size() - 1);
//        assertThat(testEmEmpEmgContacts.getContact()).isEqualTo(DEFAULT_CONTACT);
//        assertThat(testEmEmpEmgContacts.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
//        assertThat(testEmEmpEmgContacts.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmEmpEmgContacts.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmEmpEmgContacts.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmEmpEmgContacts.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmEmpEmgContactsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emEmpEmgContactsRepository.findAll().size();

        // Create the EmEmpEmgContacts with an existing ID
        emEmpEmgContacts.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmEmpEmgContactsMockMvc.perform(post("/api/em-emp-emg-contacts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpEmgContacts)))
            .andExpect(status().isBadRequest());

        // Validate the EmEmpEmgContacts in the database
        List<EmEmpEmgContacts> emEmpEmgContactsList = emEmpEmgContactsRepository.findAll();
        assertThat(emEmpEmgContactsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEmEmpEmgContacts() throws Exception {
        // Initialize the database
        emEmpEmgContactsRepository.saveAndFlush(emEmpEmgContacts);

        // Get all the emEmpEmgContactsList
        restEmEmpEmgContactsMockMvc.perform(get("/api/em-emp-emg-contacts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emEmpEmgContacts.getId().intValue())))
            .andExpect(jsonPath("$.[*].contact").value(hasItem(DEFAULT_CONTACT.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getEmEmpEmgContacts() throws Exception {
        // Initialize the database
        emEmpEmgContactsRepository.saveAndFlush(emEmpEmgContacts);

        // Get the emEmpEmgContacts
        restEmEmpEmgContactsMockMvc.perform(get("/api/em-emp-emg-contacts/{id}", emEmpEmgContacts.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emEmpEmgContacts.getId().intValue()))
            .andExpect(jsonPath("$.contact").value(DEFAULT_CONTACT.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmEmpEmgContacts() throws Exception {
        // Get the emEmpEmgContacts
        restEmEmpEmgContactsMockMvc.perform(get("/api/em-emp-emg-contacts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmEmpEmgContacts() throws Exception {
        // Initialize the database
        emEmpEmgContactsRepository.saveAndFlush(emEmpEmgContacts);
        int databaseSizeBeforeUpdate = emEmpEmgContactsRepository.findAll().size();

        // Update the emEmpEmgContacts
        EmEmpEmgContacts updatedEmEmpEmgContacts = emEmpEmgContactsRepository.findOne(emEmpEmgContacts.getId());
        // Disconnect from session so that the updates on updatedEmEmpEmgContacts are not directly saved in db
        em.detach(updatedEmEmpEmgContacts);
        updatedEmEmpEmgContacts
//            .contact(UPDATED_CONTACT)
//            .description(UPDATED_DESCRIPTION)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmEmpEmgContactsMockMvc.perform(put("/api/em-emp-emg-contacts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmEmpEmgContacts)))
            .andExpect(status().isOk());

        // Validate the EmEmpEmgContacts in the database
        List<EmEmpEmgContacts> emEmpEmgContactsList = emEmpEmgContactsRepository.findAll();
        assertThat(emEmpEmgContactsList).hasSize(databaseSizeBeforeUpdate);
        EmEmpEmgContacts testEmEmpEmgContacts = emEmpEmgContactsList.get(emEmpEmgContactsList.size() - 1);
//        assertThat(testEmEmpEmgContacts.getContact()).isEqualTo(UPDATED_CONTACT);
//        assertThat(testEmEmpEmgContacts.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testEmEmpEmgContacts.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmEmpEmgContacts.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmEmpEmgContacts.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmEmpEmgContacts.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmEmpEmgContacts() throws Exception {
        int databaseSizeBeforeUpdate = emEmpEmgContactsRepository.findAll().size();

        // Create the EmEmpEmgContacts

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmEmpEmgContactsMockMvc.perform(put("/api/em-emp-emg-contacts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpEmgContacts)))
            .andExpect(status().isCreated());

        // Validate the EmEmpEmgContacts in the database
        List<EmEmpEmgContacts> emEmpEmgContactsList = emEmpEmgContactsRepository.findAll();
        assertThat(emEmpEmgContactsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmEmpEmgContacts() throws Exception {
        // Initialize the database
        emEmpEmgContactsRepository.saveAndFlush(emEmpEmgContacts);
        int databaseSizeBeforeDelete = emEmpEmgContactsRepository.findAll().size();

        // Get the emEmpEmgContacts
        restEmEmpEmgContactsMockMvc.perform(delete("/api/em-emp-emg-contacts/{id}", emEmpEmgContacts.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmEmpEmgContacts> emEmpEmgContactsList = emEmpEmgContactsRepository.findAll();
        assertThat(emEmpEmgContactsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmEmpEmgContacts.class);
        EmEmpEmgContacts emEmpEmgContacts1 = new EmEmpEmgContacts();
        emEmpEmgContacts1.setId(1L);
        EmEmpEmgContacts emEmpEmgContacts2 = new EmEmpEmgContacts();
        emEmpEmgContacts2.setId(emEmpEmgContacts1.getId());
        assertThat(emEmpEmgContacts1).isEqualTo(emEmpEmgContacts2);
        emEmpEmgContacts2.setId(2L);
        assertThat(emEmpEmgContacts1).isNotEqualTo(emEmpEmgContacts2);
        emEmpEmgContacts1.setId(null);
        assertThat(emEmpEmgContacts1).isNotEqualTo(emEmpEmgContacts2);
    }
}
