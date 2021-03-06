package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.OgOrgTypes;
import com.infostudio.ba.repository.OgOrgTypesRepository;
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
 * Test class for the OgOrgTypesResource REST controller.
 *
 * @see OgOrgTypesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class OgOrgTypesResourceIntTest {

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
    private OgOrgTypesRepository ogOrgTypesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOgOrgTypesMockMvc;

    private OgOrgTypes ogOrgTypes;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OgOrgTypesResource ogOrgTypesResource = new OgOrgTypesResource(ogOrgTypesRepository);
        this.restOgOrgTypesMockMvc = MockMvcBuilders.standaloneSetup(ogOrgTypesResource)
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
    public static OgOrgTypes createEntity(EntityManager em) {
        OgOrgTypes ogOrgTypes = new OgOrgTypes()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return ogOrgTypes;
    }

    @Before
    public void initTest() {
        ogOrgTypes = createEntity(em);
    }

    @Test
    @Transactional
    public void createOgOrgTypes() throws Exception {
        int databaseSizeBeforeCreate = ogOrgTypesRepository.findAll().size();

        // Create the OgOrgTypes
        restOgOrgTypesMockMvc.perform(post("/api/og-org-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ogOrgTypes)))
            .andExpect(status().isCreated());

        // Validate the OgOrgTypes in the database
        List<OgOrgTypes> ogOrgTypesList = ogOrgTypesRepository.findAll();
        assertThat(ogOrgTypesList).hasSize(databaseSizeBeforeCreate + 1);
        OgOrgTypes testOgOrgTypes = ogOrgTypesList.get(ogOrgTypesList.size() - 1);
        assertThat(testOgOrgTypes.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testOgOrgTypes.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testOgOrgTypes.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testOgOrgTypes.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testOgOrgTypes.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testOgOrgTypes.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testOgOrgTypes.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createOgOrgTypesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ogOrgTypesRepository.findAll().size();

        // Create the OgOrgTypes with an existing ID
        ogOrgTypes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOgOrgTypesMockMvc.perform(post("/api/og-org-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ogOrgTypes)))
            .andExpect(status().isBadRequest());

        // Validate the OgOrgTypes in the database
        List<OgOrgTypes> ogOrgTypesList = ogOrgTypesRepository.findAll();
        assertThat(ogOrgTypesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = ogOrgTypesRepository.findAll().size();
        // set the field null
        ogOrgTypes.setCode(null);

        // Create the OgOrgTypes, which fails.

        restOgOrgTypesMockMvc.perform(post("/api/og-org-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ogOrgTypes)))
            .andExpect(status().isBadRequest());

        List<OgOrgTypes> ogOrgTypesList = ogOrgTypesRepository.findAll();
        assertThat(ogOrgTypesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = ogOrgTypesRepository.findAll().size();
        // set the field null
        ogOrgTypes.setName(null);

        // Create the OgOrgTypes, which fails.

        restOgOrgTypesMockMvc.perform(post("/api/og-org-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ogOrgTypes)))
            .andExpect(status().isBadRequest());

        List<OgOrgTypes> ogOrgTypesList = ogOrgTypesRepository.findAll();
        assertThat(ogOrgTypesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOgOrgTypes() throws Exception {
        // Initialize the database
        ogOrgTypesRepository.saveAndFlush(ogOrgTypes);

        // Get all the ogOrgTypesList
        restOgOrgTypesMockMvc.perform(get("/api/og-org-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ogOrgTypes.getId().intValue())))
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
    public void getOgOrgTypes() throws Exception {
        // Initialize the database
        ogOrgTypesRepository.saveAndFlush(ogOrgTypes);

        // Get the ogOrgTypes
        restOgOrgTypesMockMvc.perform(get("/api/og-org-types/{id}", ogOrgTypes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ogOrgTypes.getId().intValue()))
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
    public void getNonExistingOgOrgTypes() throws Exception {
        // Get the ogOrgTypes
        restOgOrgTypesMockMvc.perform(get("/api/og-org-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOgOrgTypes() throws Exception {
        // Initialize the database
        ogOrgTypesRepository.saveAndFlush(ogOrgTypes);
        int databaseSizeBeforeUpdate = ogOrgTypesRepository.findAll().size();

        // Update the ogOrgTypes
        OgOrgTypes updatedOgOrgTypes = ogOrgTypesRepository.findOne(ogOrgTypes.getId());
        // Disconnect from session so that the updates on updatedOgOrgTypes are not directly saved in db
        em.detach(updatedOgOrgTypes);
        updatedOgOrgTypes
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restOgOrgTypesMockMvc.perform(put("/api/og-org-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOgOrgTypes)))
            .andExpect(status().isOk());

        // Validate the OgOrgTypes in the database
        List<OgOrgTypes> ogOrgTypesList = ogOrgTypesRepository.findAll();
        assertThat(ogOrgTypesList).hasSize(databaseSizeBeforeUpdate);
        OgOrgTypes testOgOrgTypes = ogOrgTypesList.get(ogOrgTypesList.size() - 1);
        assertThat(testOgOrgTypes.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testOgOrgTypes.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testOgOrgTypes.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testOgOrgTypes.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testOgOrgTypes.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testOgOrgTypes.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testOgOrgTypes.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingOgOrgTypes() throws Exception {
        int databaseSizeBeforeUpdate = ogOrgTypesRepository.findAll().size();

        // Create the OgOrgTypes

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOgOrgTypesMockMvc.perform(put("/api/og-org-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ogOrgTypes)))
            .andExpect(status().isCreated());

        // Validate the OgOrgTypes in the database
        List<OgOrgTypes> ogOrgTypesList = ogOrgTypesRepository.findAll();
        assertThat(ogOrgTypesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOgOrgTypes() throws Exception {
        // Initialize the database
        ogOrgTypesRepository.saveAndFlush(ogOrgTypes);
        int databaseSizeBeforeDelete = ogOrgTypesRepository.findAll().size();

        // Get the ogOrgTypes
        restOgOrgTypesMockMvc.perform(delete("/api/og-org-types/{id}", ogOrgTypes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OgOrgTypes> ogOrgTypesList = ogOrgTypesRepository.findAll();
        assertThat(ogOrgTypesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OgOrgTypes.class);
        OgOrgTypes ogOrgTypes1 = new OgOrgTypes();
        ogOrgTypes1.setId(1L);
        OgOrgTypes ogOrgTypes2 = new OgOrgTypes();
        ogOrgTypes2.setId(ogOrgTypes1.getId());
        assertThat(ogOrgTypes1).isEqualTo(ogOrgTypes2);
        ogOrgTypes2.setId(2L);
        assertThat(ogOrgTypes1).isNotEqualTo(ogOrgTypes2);
        ogOrgTypes1.setId(null);
        assertThat(ogOrgTypes1).isNotEqualTo(ogOrgTypes2);
    }
}
