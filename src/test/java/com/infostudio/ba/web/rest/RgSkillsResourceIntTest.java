package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.RgSkills;
import com.infostudio.ba.repository.RgSkillsRepository;
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
 * Test class for the RgSkillsResource REST controller.
 *
 * @see RgSkillsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class RgSkillsResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_FIELD = "AAAAAAAAAA";
    private static final String UPDATED_FIELD = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private RgSkillsRepository rgSkillsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRgSkillsMockMvc;

    private RgSkills rgSkills;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RgSkillsResource rgSkillsResource = new RgSkillsResource(rgSkillsRepository);
        this.restRgSkillsMockMvc = MockMvcBuilders.standaloneSetup(rgSkillsResource)
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
    public static RgSkills createEntity(EntityManager em) {
        RgSkills rgSkills = new RgSkills()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .field(DEFAULT_FIELD)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return rgSkills;
    }

    @Before
    public void initTest() {
        rgSkills = createEntity(em);
    }

    @Test
    @Transactional
    public void createRgSkills() throws Exception {
        int databaseSizeBeforeCreate = rgSkillsRepository.findAll().size();

        // Create the RgSkills
        restRgSkillsMockMvc.perform(post("/api/rg-skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgSkills)))
            .andExpect(status().isCreated());

        // Validate the RgSkills in the database
        List<RgSkills> rgSkillsList = rgSkillsRepository.findAll();
        assertThat(rgSkillsList).hasSize(databaseSizeBeforeCreate + 1);
        RgSkills testRgSkills = rgSkillsList.get(rgSkillsList.size() - 1);
        assertThat(testRgSkills.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testRgSkills.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRgSkills.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testRgSkills.getField()).isEqualTo(DEFAULT_FIELD);
        assertThat(testRgSkills.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testRgSkills.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testRgSkills.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testRgSkills.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createRgSkillsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rgSkillsRepository.findAll().size();

        // Create the RgSkills with an existing ID
        rgSkills.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRgSkillsMockMvc.perform(post("/api/rg-skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgSkills)))
            .andExpect(status().isBadRequest());

        // Validate the RgSkills in the database
        List<RgSkills> rgSkillsList = rgSkillsRepository.findAll();
        assertThat(rgSkillsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = rgSkillsRepository.findAll().size();
        // set the field null
        rgSkills.setCode(null);

        // Create the RgSkills, which fails.

        restRgSkillsMockMvc.perform(post("/api/rg-skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgSkills)))
            .andExpect(status().isBadRequest());

        List<RgSkills> rgSkillsList = rgSkillsRepository.findAll();
        assertThat(rgSkillsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = rgSkillsRepository.findAll().size();
        // set the field null
        rgSkills.setName(null);

        // Create the RgSkills, which fails.

        restRgSkillsMockMvc.perform(post("/api/rg-skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgSkills)))
            .andExpect(status().isBadRequest());

        List<RgSkills> rgSkillsList = rgSkillsRepository.findAll();
        assertThat(rgSkillsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRgSkills() throws Exception {
        // Initialize the database
        rgSkillsRepository.saveAndFlush(rgSkills);

        // Get all the rgSkillsList
        restRgSkillsMockMvc.perform(get("/api/rg-skills?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rgSkills.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].field").value(hasItem(DEFAULT_FIELD.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getRgSkills() throws Exception {
        // Initialize the database
        rgSkillsRepository.saveAndFlush(rgSkills);

        // Get the rgSkills
        restRgSkillsMockMvc.perform(get("/api/rg-skills/{id}", rgSkills.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rgSkills.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.field").value(DEFAULT_FIELD.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRgSkills() throws Exception {
        // Get the rgSkills
        restRgSkillsMockMvc.perform(get("/api/rg-skills/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRgSkills() throws Exception {
        // Initialize the database
        rgSkillsRepository.saveAndFlush(rgSkills);
        int databaseSizeBeforeUpdate = rgSkillsRepository.findAll().size();

        // Update the rgSkills
        RgSkills updatedRgSkills = rgSkillsRepository.findOne(rgSkills.getId());
        // Disconnect from session so that the updates on updatedRgSkills are not directly saved in db
        em.detach(updatedRgSkills);
        updatedRgSkills
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .field(UPDATED_FIELD)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restRgSkillsMockMvc.perform(put("/api/rg-skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRgSkills)))
            .andExpect(status().isOk());

        // Validate the RgSkills in the database
        List<RgSkills> rgSkillsList = rgSkillsRepository.findAll();
        assertThat(rgSkillsList).hasSize(databaseSizeBeforeUpdate);
        RgSkills testRgSkills = rgSkillsList.get(rgSkillsList.size() - 1);
        assertThat(testRgSkills.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testRgSkills.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRgSkills.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testRgSkills.getField()).isEqualTo(UPDATED_FIELD);
        assertThat(testRgSkills.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testRgSkills.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testRgSkills.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testRgSkills.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingRgSkills() throws Exception {
        int databaseSizeBeforeUpdate = rgSkillsRepository.findAll().size();

        // Create the RgSkills

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRgSkillsMockMvc.perform(put("/api/rg-skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgSkills)))
            .andExpect(status().isCreated());

        // Validate the RgSkills in the database
        List<RgSkills> rgSkillsList = rgSkillsRepository.findAll();
        assertThat(rgSkillsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRgSkills() throws Exception {
        // Initialize the database
        rgSkillsRepository.saveAndFlush(rgSkills);
        int databaseSizeBeforeDelete = rgSkillsRepository.findAll().size();

        // Get the rgSkills
        restRgSkillsMockMvc.perform(delete("/api/rg-skills/{id}", rgSkills.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RgSkills> rgSkillsList = rgSkillsRepository.findAll();
        assertThat(rgSkillsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RgSkills.class);
        RgSkills rgSkills1 = new RgSkills();
        rgSkills1.setId(1L);
        RgSkills rgSkills2 = new RgSkills();
        rgSkills2.setId(rgSkills1.getId());
        assertThat(rgSkills1).isEqualTo(rgSkills2);
        rgSkills2.setId(2L);
        assertThat(rgSkills1).isNotEqualTo(rgSkills2);
        rgSkills1.setId(null);
        assertThat(rgSkills1).isNotEqualTo(rgSkills2);
    }
}
