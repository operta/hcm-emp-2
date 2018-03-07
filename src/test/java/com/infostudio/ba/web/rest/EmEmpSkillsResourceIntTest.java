package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmEmpSkills;
import com.infostudio.ba.repository.EmEmpSkillsRepository;
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
 * Test class for the EmEmpSkillsResource REST controller.
 *
 * @see EmEmpSkillsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmEmpSkillsResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_SKILL = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_SKILL = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private EmEmpSkillsRepository emEmpSkillsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmEmpSkillsMockMvc;

    private EmEmpSkills emEmpSkills;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmEmpSkillsResource emEmpSkillsResource = new EmEmpSkillsResource(emEmpSkillsRepository);
        this.restEmEmpSkillsMockMvc = MockMvcBuilders.standaloneSetup(emEmpSkillsResource)
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
    public static EmEmpSkills createEntity(EntityManager em) {
        EmEmpSkills emEmpSkills = new EmEmpSkills()
            .description(DEFAULT_DESCRIPTION)
            .dateSkill(DEFAULT_DATE_SKILL)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emEmpSkills;
    }

    @Before
    public void initTest() {
        emEmpSkills = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmEmpSkills() throws Exception {
        int databaseSizeBeforeCreate = emEmpSkillsRepository.findAll().size();

        // Create the EmEmpSkills
        restEmEmpSkillsMockMvc.perform(post("/api/em-emp-skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpSkills)))
            .andExpect(status().isCreated());

        // Validate the EmEmpSkills in the database
        List<EmEmpSkills> emEmpSkillsList = emEmpSkillsRepository.findAll();
        assertThat(emEmpSkillsList).hasSize(databaseSizeBeforeCreate + 1);
        EmEmpSkills testEmEmpSkills = emEmpSkillsList.get(emEmpSkillsList.size() - 1);
        assertThat(testEmEmpSkills.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testEmEmpSkills.getDateSkill()).isEqualTo(DEFAULT_DATE_SKILL);
        assertThat(testEmEmpSkills.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmEmpSkills.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmEmpSkills.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmEmpSkills.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmEmpSkillsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emEmpSkillsRepository.findAll().size();

        // Create the EmEmpSkills with an existing ID
        emEmpSkills.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmEmpSkillsMockMvc.perform(post("/api/em-emp-skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpSkills)))
            .andExpect(status().isBadRequest());

        // Validate the EmEmpSkills in the database
        List<EmEmpSkills> emEmpSkillsList = emEmpSkillsRepository.findAll();
        assertThat(emEmpSkillsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEmEmpSkills() throws Exception {
        // Initialize the database
        emEmpSkillsRepository.saveAndFlush(emEmpSkills);

        // Get all the emEmpSkillsList
        restEmEmpSkillsMockMvc.perform(get("/api/em-emp-skills?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emEmpSkills.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].dateSkill").value(hasItem(DEFAULT_DATE_SKILL.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getEmEmpSkills() throws Exception {
        // Initialize the database
        emEmpSkillsRepository.saveAndFlush(emEmpSkills);

        // Get the emEmpSkills
        restEmEmpSkillsMockMvc.perform(get("/api/em-emp-skills/{id}", emEmpSkills.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emEmpSkills.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.dateSkill").value(DEFAULT_DATE_SKILL.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmEmpSkills() throws Exception {
        // Get the emEmpSkills
        restEmEmpSkillsMockMvc.perform(get("/api/em-emp-skills/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmEmpSkills() throws Exception {
        // Initialize the database
        emEmpSkillsRepository.saveAndFlush(emEmpSkills);
        int databaseSizeBeforeUpdate = emEmpSkillsRepository.findAll().size();

        // Update the emEmpSkills
        EmEmpSkills updatedEmEmpSkills = emEmpSkillsRepository.findOne(emEmpSkills.getId());
        // Disconnect from session so that the updates on updatedEmEmpSkills are not directly saved in db
        em.detach(updatedEmEmpSkills);
        updatedEmEmpSkills
            .description(UPDATED_DESCRIPTION)
            .dateSkill(UPDATED_DATE_SKILL)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmEmpSkillsMockMvc.perform(put("/api/em-emp-skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmEmpSkills)))
            .andExpect(status().isOk());

        // Validate the EmEmpSkills in the database
        List<EmEmpSkills> emEmpSkillsList = emEmpSkillsRepository.findAll();
        assertThat(emEmpSkillsList).hasSize(databaseSizeBeforeUpdate);
        EmEmpSkills testEmEmpSkills = emEmpSkillsList.get(emEmpSkillsList.size() - 1);
        assertThat(testEmEmpSkills.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testEmEmpSkills.getDateSkill()).isEqualTo(UPDATED_DATE_SKILL);
        assertThat(testEmEmpSkills.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmEmpSkills.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmEmpSkills.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmEmpSkills.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmEmpSkills() throws Exception {
        int databaseSizeBeforeUpdate = emEmpSkillsRepository.findAll().size();

        // Create the EmEmpSkills

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmEmpSkillsMockMvc.perform(put("/api/em-emp-skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpSkills)))
            .andExpect(status().isCreated());

        // Validate the EmEmpSkills in the database
        List<EmEmpSkills> emEmpSkillsList = emEmpSkillsRepository.findAll();
        assertThat(emEmpSkillsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmEmpSkills() throws Exception {
        // Initialize the database
        emEmpSkillsRepository.saveAndFlush(emEmpSkills);
        int databaseSizeBeforeDelete = emEmpSkillsRepository.findAll().size();

        // Get the emEmpSkills
        restEmEmpSkillsMockMvc.perform(delete("/api/em-emp-skills/{id}", emEmpSkills.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmEmpSkills> emEmpSkillsList = emEmpSkillsRepository.findAll();
        assertThat(emEmpSkillsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmEmpSkills.class);
        EmEmpSkills emEmpSkills1 = new EmEmpSkills();
        emEmpSkills1.setId(1L);
        EmEmpSkills emEmpSkills2 = new EmEmpSkills();
        emEmpSkills2.setId(emEmpSkills1.getId());
        assertThat(emEmpSkills1).isEqualTo(emEmpSkills2);
        emEmpSkills2.setId(2L);
        assertThat(emEmpSkills1).isNotEqualTo(emEmpSkills2);
        emEmpSkills1.setId(null);
        assertThat(emEmpSkills1).isNotEqualTo(emEmpSkills2);
    }
}
