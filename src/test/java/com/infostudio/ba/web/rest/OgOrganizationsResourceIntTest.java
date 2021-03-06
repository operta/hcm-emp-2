package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.OgOrganizations;
import com.infostudio.ba.repository.OgOrganizationsRepository;
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
 * Test class for the OgOrganizationsResource REST controller.
 *
 * @see OgOrganizationsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class OgOrganizationsResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

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
    private OgOrganizationsRepository ogOrganizationsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOgOrganizationsMockMvc;

    private OgOrganizations ogOrganizations;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OgOrganizationsResource ogOrganizationsResource = new OgOrganizationsResource(ogOrganizationsRepository);
        this.restOgOrganizationsMockMvc = MockMvcBuilders.standaloneSetup(ogOrganizationsResource)
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
    public static OgOrganizations createEntity(EntityManager em) {
        OgOrganizations ogOrganizations = new OgOrganizations()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return ogOrganizations;
    }

    @Before
    public void initTest() {
        ogOrganizations = createEntity(em);
    }

    @Test
    @Transactional
    public void createOgOrganizations() throws Exception {
        int databaseSizeBeforeCreate = ogOrganizationsRepository.findAll().size();

        // Create the OgOrganizations
        restOgOrganizationsMockMvc.perform(post("/api/og-organizations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ogOrganizations)))
            .andExpect(status().isCreated());

        // Validate the OgOrganizations in the database
        List<OgOrganizations> ogOrganizationsList = ogOrganizationsRepository.findAll();
        assertThat(ogOrganizationsList).hasSize(databaseSizeBeforeCreate + 1);
        OgOrganizations testOgOrganizations = ogOrganizationsList.get(ogOrganizationsList.size() - 1);
        assertThat(testOgOrganizations.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testOgOrganizations.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testOgOrganizations.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testOgOrganizations.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testOgOrganizations.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testOgOrganizations.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testOgOrganizations.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createOgOrganizationsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ogOrganizationsRepository.findAll().size();

        // Create the OgOrganizations with an existing ID
        ogOrganizations.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOgOrganizationsMockMvc.perform(post("/api/og-organizations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ogOrganizations)))
            .andExpect(status().isBadRequest());

        // Validate the OgOrganizations in the database
        List<OgOrganizations> ogOrganizationsList = ogOrganizationsRepository.findAll();
        assertThat(ogOrganizationsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = ogOrganizationsRepository.findAll().size();
        // set the field null
        ogOrganizations.setCode(null);

        // Create the OgOrganizations, which fails.

        restOgOrganizationsMockMvc.perform(post("/api/og-organizations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ogOrganizations)))
            .andExpect(status().isBadRequest());

        List<OgOrganizations> ogOrganizationsList = ogOrganizationsRepository.findAll();
        assertThat(ogOrganizationsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = ogOrganizationsRepository.findAll().size();
        // set the field null
        ogOrganizations.setName(null);

        // Create the OgOrganizations, which fails.

        restOgOrganizationsMockMvc.perform(post("/api/og-organizations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ogOrganizations)))
            .andExpect(status().isBadRequest());

        List<OgOrganizations> ogOrganizationsList = ogOrganizationsRepository.findAll();
        assertThat(ogOrganizationsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOgOrganizations() throws Exception {
        // Initialize the database
        ogOrganizationsRepository.saveAndFlush(ogOrganizations);

        // Get all the ogOrganizationsList
        restOgOrganizationsMockMvc.perform(get("/api/og-organizations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ogOrganizations.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getOgOrganizations() throws Exception {
        // Initialize the database
        ogOrganizationsRepository.saveAndFlush(ogOrganizations);

        // Get the ogOrganizations
        restOgOrganizationsMockMvc.perform(get("/api/og-organizations/{id}", ogOrganizations.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ogOrganizations.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOgOrganizations() throws Exception {
        // Get the ogOrganizations
        restOgOrganizationsMockMvc.perform(get("/api/og-organizations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOgOrganizations() throws Exception {
        // Initialize the database
        ogOrganizationsRepository.saveAndFlush(ogOrganizations);
        int databaseSizeBeforeUpdate = ogOrganizationsRepository.findAll().size();

        // Update the ogOrganizations
        OgOrganizations updatedOgOrganizations = ogOrganizationsRepository.findOne(ogOrganizations.getId());
        // Disconnect from session so that the updates on updatedOgOrganizations are not directly saved in db
        em.detach(updatedOgOrganizations);
        updatedOgOrganizations
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restOgOrganizationsMockMvc.perform(put("/api/og-organizations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOgOrganizations)))
            .andExpect(status().isOk());

        // Validate the OgOrganizations in the database
        List<OgOrganizations> ogOrganizationsList = ogOrganizationsRepository.findAll();
        assertThat(ogOrganizationsList).hasSize(databaseSizeBeforeUpdate);
        OgOrganizations testOgOrganizations = ogOrganizationsList.get(ogOrganizationsList.size() - 1);
        assertThat(testOgOrganizations.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testOgOrganizations.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testOgOrganizations.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testOgOrganizations.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testOgOrganizations.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testOgOrganizations.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testOgOrganizations.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingOgOrganizations() throws Exception {
        int databaseSizeBeforeUpdate = ogOrganizationsRepository.findAll().size();

        // Create the OgOrganizations

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOgOrganizationsMockMvc.perform(put("/api/og-organizations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ogOrganizations)))
            .andExpect(status().isCreated());

        // Validate the OgOrganizations in the database
        List<OgOrganizations> ogOrganizationsList = ogOrganizationsRepository.findAll();
        assertThat(ogOrganizationsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOgOrganizations() throws Exception {
        // Initialize the database
        ogOrganizationsRepository.saveAndFlush(ogOrganizations);
        int databaseSizeBeforeDelete = ogOrganizationsRepository.findAll().size();

        // Get the ogOrganizations
        restOgOrganizationsMockMvc.perform(delete("/api/og-organizations/{id}", ogOrganizations.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OgOrganizations> ogOrganizationsList = ogOrganizationsRepository.findAll();
        assertThat(ogOrganizationsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OgOrganizations.class);
        OgOrganizations ogOrganizations1 = new OgOrganizations();
        ogOrganizations1.setId(1L);
        OgOrganizations ogOrganizations2 = new OgOrganizations();
        ogOrganizations2.setId(ogOrganizations1.getId());
        assertThat(ogOrganizations1).isEqualTo(ogOrganizations2);
        ogOrganizations2.setId(2L);
        assertThat(ogOrganizations1).isNotEqualTo(ogOrganizations2);
        ogOrganizations1.setId(null);
        assertThat(ogOrganizations1).isNotEqualTo(ogOrganizations2);
    }
}
