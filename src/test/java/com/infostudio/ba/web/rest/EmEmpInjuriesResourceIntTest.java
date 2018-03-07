package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmEmpInjuries;
import com.infostudio.ba.repository.EmEmpInjuriesRepository;
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
 * Test class for the EmEmpInjuriesResource REST controller.
 *
 * @see EmEmpInjuriesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmEmpInjuriesResourceIntTest {

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
    private EmEmpInjuriesRepository emEmpInjuriesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmEmpInjuriesMockMvc;

    private EmEmpInjuries emEmpInjuries;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmEmpInjuriesResource emEmpInjuriesResource = new EmEmpInjuriesResource(emEmpInjuriesRepository);
        this.restEmEmpInjuriesMockMvc = MockMvcBuilders.standaloneSetup(emEmpInjuriesResource)
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
    public static EmEmpInjuries createEntity(EntityManager em) {
        EmEmpInjuries emEmpInjuries = new EmEmpInjuries()
            .description(DEFAULT_DESCRIPTION)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emEmpInjuries;
    }

    @Before
    public void initTest() {
        emEmpInjuries = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmEmpInjuries() throws Exception {
        int databaseSizeBeforeCreate = emEmpInjuriesRepository.findAll().size();

        // Create the EmEmpInjuries
        restEmEmpInjuriesMockMvc.perform(post("/api/em-emp-injuries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpInjuries)))
            .andExpect(status().isCreated());

        // Validate the EmEmpInjuries in the database
        List<EmEmpInjuries> emEmpInjuriesList = emEmpInjuriesRepository.findAll();
        assertThat(emEmpInjuriesList).hasSize(databaseSizeBeforeCreate + 1);
        EmEmpInjuries testEmEmpInjuries = emEmpInjuriesList.get(emEmpInjuriesList.size() - 1);
        assertThat(testEmEmpInjuries.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testEmEmpInjuries.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmEmpInjuries.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmEmpInjuries.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmEmpInjuries.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmEmpInjuriesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emEmpInjuriesRepository.findAll().size();

        // Create the EmEmpInjuries with an existing ID
        emEmpInjuries.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmEmpInjuriesMockMvc.perform(post("/api/em-emp-injuries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpInjuries)))
            .andExpect(status().isBadRequest());

        // Validate the EmEmpInjuries in the database
        List<EmEmpInjuries> emEmpInjuriesList = emEmpInjuriesRepository.findAll();
        assertThat(emEmpInjuriesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEmEmpInjuries() throws Exception {
        // Initialize the database
        emEmpInjuriesRepository.saveAndFlush(emEmpInjuries);

        // Get all the emEmpInjuriesList
        restEmEmpInjuriesMockMvc.perform(get("/api/em-emp-injuries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emEmpInjuries.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getEmEmpInjuries() throws Exception {
        // Initialize the database
        emEmpInjuriesRepository.saveAndFlush(emEmpInjuries);

        // Get the emEmpInjuries
        restEmEmpInjuriesMockMvc.perform(get("/api/em-emp-injuries/{id}", emEmpInjuries.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emEmpInjuries.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmEmpInjuries() throws Exception {
        // Get the emEmpInjuries
        restEmEmpInjuriesMockMvc.perform(get("/api/em-emp-injuries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmEmpInjuries() throws Exception {
        // Initialize the database
        emEmpInjuriesRepository.saveAndFlush(emEmpInjuries);
        int databaseSizeBeforeUpdate = emEmpInjuriesRepository.findAll().size();

        // Update the emEmpInjuries
        EmEmpInjuries updatedEmEmpInjuries = emEmpInjuriesRepository.findOne(emEmpInjuries.getId());
        // Disconnect from session so that the updates on updatedEmEmpInjuries are not directly saved in db
        em.detach(updatedEmEmpInjuries);
        updatedEmEmpInjuries
            .description(UPDATED_DESCRIPTION)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmEmpInjuriesMockMvc.perform(put("/api/em-emp-injuries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmEmpInjuries)))
            .andExpect(status().isOk());

        // Validate the EmEmpInjuries in the database
        List<EmEmpInjuries> emEmpInjuriesList = emEmpInjuriesRepository.findAll();
        assertThat(emEmpInjuriesList).hasSize(databaseSizeBeforeUpdate);
        EmEmpInjuries testEmEmpInjuries = emEmpInjuriesList.get(emEmpInjuriesList.size() - 1);
        assertThat(testEmEmpInjuries.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testEmEmpInjuries.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmEmpInjuries.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmEmpInjuries.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmEmpInjuries.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmEmpInjuries() throws Exception {
        int databaseSizeBeforeUpdate = emEmpInjuriesRepository.findAll().size();

        // Create the EmEmpInjuries

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmEmpInjuriesMockMvc.perform(put("/api/em-emp-injuries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpInjuries)))
            .andExpect(status().isCreated());

        // Validate the EmEmpInjuries in the database
        List<EmEmpInjuries> emEmpInjuriesList = emEmpInjuriesRepository.findAll();
        assertThat(emEmpInjuriesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmEmpInjuries() throws Exception {
        // Initialize the database
        emEmpInjuriesRepository.saveAndFlush(emEmpInjuries);
        int databaseSizeBeforeDelete = emEmpInjuriesRepository.findAll().size();

        // Get the emEmpInjuries
        restEmEmpInjuriesMockMvc.perform(delete("/api/em-emp-injuries/{id}", emEmpInjuries.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmEmpInjuries> emEmpInjuriesList = emEmpInjuriesRepository.findAll();
        assertThat(emEmpInjuriesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmEmpInjuries.class);
        EmEmpInjuries emEmpInjuries1 = new EmEmpInjuries();
        emEmpInjuries1.setId(1L);
        EmEmpInjuries emEmpInjuries2 = new EmEmpInjuries();
        emEmpInjuries2.setId(emEmpInjuries1.getId());
        assertThat(emEmpInjuries1).isEqualTo(emEmpInjuries2);
        emEmpInjuries2.setId(2L);
        assertThat(emEmpInjuries1).isNotEqualTo(emEmpInjuries2);
        emEmpInjuries1.setId(null);
        assertThat(emEmpInjuries1).isNotEqualTo(emEmpInjuries2);
    }
}
