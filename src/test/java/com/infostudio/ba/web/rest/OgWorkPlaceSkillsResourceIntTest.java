package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.OgWorkPlaceSkills;
import com.infostudio.ba.repository.OgWorkPlaceSkillsRepository;
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
 * Test class for the OgWorkPlaceSkillsResource REST controller.
 *
 * @see OgWorkPlaceSkillsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class OgWorkPlaceSkillsResourceIntTest {

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
    private OgWorkPlaceSkillsRepository ogWorkPlaceSkillsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOgWorkPlaceSkillsMockMvc;

    private OgWorkPlaceSkills ogWorkPlaceSkills;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OgWorkPlaceSkillsResource ogWorkPlaceSkillsResource = new OgWorkPlaceSkillsResource(ogWorkPlaceSkillsRepository);
        this.restOgWorkPlaceSkillsMockMvc = MockMvcBuilders.standaloneSetup(ogWorkPlaceSkillsResource)
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
    public static OgWorkPlaceSkills createEntity(EntityManager em) {
        OgWorkPlaceSkills ogWorkPlaceSkills = new OgWorkPlaceSkills()
            .description(DEFAULT_DESCRIPTION)
            .dateSkill(DEFAULT_DATE_SKILL)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return ogWorkPlaceSkills;
    }

    @Before
    public void initTest() {
        ogWorkPlaceSkills = createEntity(em);
    }

    @Test
    @Transactional
    public void createOgWorkPlaceSkills() throws Exception {
        int databaseSizeBeforeCreate = ogWorkPlaceSkillsRepository.findAll().size();

        // Create the OgWorkPlaceSkills
        restOgWorkPlaceSkillsMockMvc.perform(post("/api/og-work-place-skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ogWorkPlaceSkills)))
            .andExpect(status().isCreated());

        // Validate the OgWorkPlaceSkills in the database
        List<OgWorkPlaceSkills> ogWorkPlaceSkillsList = ogWorkPlaceSkillsRepository.findAll();
        assertThat(ogWorkPlaceSkillsList).hasSize(databaseSizeBeforeCreate + 1);
        OgWorkPlaceSkills testOgWorkPlaceSkills = ogWorkPlaceSkillsList.get(ogWorkPlaceSkillsList.size() - 1);
        assertThat(testOgWorkPlaceSkills.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testOgWorkPlaceSkills.getDateSkill()).isEqualTo(DEFAULT_DATE_SKILL);
        assertThat(testOgWorkPlaceSkills.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testOgWorkPlaceSkills.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testOgWorkPlaceSkills.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testOgWorkPlaceSkills.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createOgWorkPlaceSkillsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ogWorkPlaceSkillsRepository.findAll().size();

        // Create the OgWorkPlaceSkills with an existing ID
        ogWorkPlaceSkills.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOgWorkPlaceSkillsMockMvc.perform(post("/api/og-work-place-skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ogWorkPlaceSkills)))
            .andExpect(status().isBadRequest());

        // Validate the OgWorkPlaceSkills in the database
        List<OgWorkPlaceSkills> ogWorkPlaceSkillsList = ogWorkPlaceSkillsRepository.findAll();
        assertThat(ogWorkPlaceSkillsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOgWorkPlaceSkills() throws Exception {
        // Initialize the database
        ogWorkPlaceSkillsRepository.saveAndFlush(ogWorkPlaceSkills);

        // Get all the ogWorkPlaceSkillsList
        restOgWorkPlaceSkillsMockMvc.perform(get("/api/og-work-place-skills?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ogWorkPlaceSkills.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].dateSkill").value(hasItem(DEFAULT_DATE_SKILL.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getOgWorkPlaceSkills() throws Exception {
        // Initialize the database
        ogWorkPlaceSkillsRepository.saveAndFlush(ogWorkPlaceSkills);

        // Get the ogWorkPlaceSkills
        restOgWorkPlaceSkillsMockMvc.perform(get("/api/og-work-place-skills/{id}", ogWorkPlaceSkills.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ogWorkPlaceSkills.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.dateSkill").value(DEFAULT_DATE_SKILL.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOgWorkPlaceSkills() throws Exception {
        // Get the ogWorkPlaceSkills
        restOgWorkPlaceSkillsMockMvc.perform(get("/api/og-work-place-skills/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOgWorkPlaceSkills() throws Exception {
        // Initialize the database
        ogWorkPlaceSkillsRepository.saveAndFlush(ogWorkPlaceSkills);
        int databaseSizeBeforeUpdate = ogWorkPlaceSkillsRepository.findAll().size();

        // Update the ogWorkPlaceSkills
        OgWorkPlaceSkills updatedOgWorkPlaceSkills = ogWorkPlaceSkillsRepository.findOne(ogWorkPlaceSkills.getId());
        // Disconnect from session so that the updates on updatedOgWorkPlaceSkills are not directly saved in db
        em.detach(updatedOgWorkPlaceSkills);
        updatedOgWorkPlaceSkills
            .description(UPDATED_DESCRIPTION)
            .dateSkill(UPDATED_DATE_SKILL)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restOgWorkPlaceSkillsMockMvc.perform(put("/api/og-work-place-skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOgWorkPlaceSkills)))
            .andExpect(status().isOk());

        // Validate the OgWorkPlaceSkills in the database
        List<OgWorkPlaceSkills> ogWorkPlaceSkillsList = ogWorkPlaceSkillsRepository.findAll();
        assertThat(ogWorkPlaceSkillsList).hasSize(databaseSizeBeforeUpdate);
        OgWorkPlaceSkills testOgWorkPlaceSkills = ogWorkPlaceSkillsList.get(ogWorkPlaceSkillsList.size() - 1);
        assertThat(testOgWorkPlaceSkills.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testOgWorkPlaceSkills.getDateSkill()).isEqualTo(UPDATED_DATE_SKILL);
        assertThat(testOgWorkPlaceSkills.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testOgWorkPlaceSkills.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testOgWorkPlaceSkills.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testOgWorkPlaceSkills.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingOgWorkPlaceSkills() throws Exception {
        int databaseSizeBeforeUpdate = ogWorkPlaceSkillsRepository.findAll().size();

        // Create the OgWorkPlaceSkills

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOgWorkPlaceSkillsMockMvc.perform(put("/api/og-work-place-skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ogWorkPlaceSkills)))
            .andExpect(status().isCreated());

        // Validate the OgWorkPlaceSkills in the database
        List<OgWorkPlaceSkills> ogWorkPlaceSkillsList = ogWorkPlaceSkillsRepository.findAll();
        assertThat(ogWorkPlaceSkillsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOgWorkPlaceSkills() throws Exception {
        // Initialize the database
        ogWorkPlaceSkillsRepository.saveAndFlush(ogWorkPlaceSkills);
        int databaseSizeBeforeDelete = ogWorkPlaceSkillsRepository.findAll().size();

        // Get the ogWorkPlaceSkills
        restOgWorkPlaceSkillsMockMvc.perform(delete("/api/og-work-place-skills/{id}", ogWorkPlaceSkills.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OgWorkPlaceSkills> ogWorkPlaceSkillsList = ogWorkPlaceSkillsRepository.findAll();
        assertThat(ogWorkPlaceSkillsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OgWorkPlaceSkills.class);
        OgWorkPlaceSkills ogWorkPlaceSkills1 = new OgWorkPlaceSkills();
        ogWorkPlaceSkills1.setId(1L);
        OgWorkPlaceSkills ogWorkPlaceSkills2 = new OgWorkPlaceSkills();
        ogWorkPlaceSkills2.setId(ogWorkPlaceSkills1.getId());
        assertThat(ogWorkPlaceSkills1).isEqualTo(ogWorkPlaceSkills2);
        ogWorkPlaceSkills2.setId(2L);
        assertThat(ogWorkPlaceSkills1).isNotEqualTo(ogWorkPlaceSkills2);
        ogWorkPlaceSkills1.setId(null);
        assertThat(ogWorkPlaceSkills1).isNotEqualTo(ogWorkPlaceSkills2);
    }
}
