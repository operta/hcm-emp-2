package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.OgWorkPlaceTypes;
import com.infostudio.ba.repository.OgWorkPlaceTypesRepository;
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
 * Test class for the OgWorkPlaceTypesResource REST controller.
 *
 * @see OgWorkPlaceTypesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class OgWorkPlaceTypesResourceIntTest {

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
    private OgWorkPlaceTypesRepository ogWorkPlaceTypesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOgWorkPlaceTypesMockMvc;

    private OgWorkPlaceTypes ogWorkPlaceTypes;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OgWorkPlaceTypesResource ogWorkPlaceTypesResource = new OgWorkPlaceTypesResource(ogWorkPlaceTypesRepository);
        this.restOgWorkPlaceTypesMockMvc = MockMvcBuilders.standaloneSetup(ogWorkPlaceTypesResource)
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
    public static OgWorkPlaceTypes createEntity(EntityManager em) {
        OgWorkPlaceTypes ogWorkPlaceTypes = new OgWorkPlaceTypes()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return ogWorkPlaceTypes;
    }

    @Before
    public void initTest() {
        ogWorkPlaceTypes = createEntity(em);
    }

    @Test
    @Transactional
    public void createOgWorkPlaceTypes() throws Exception {
        int databaseSizeBeforeCreate = ogWorkPlaceTypesRepository.findAll().size();

        // Create the OgWorkPlaceTypes
        restOgWorkPlaceTypesMockMvc.perform(post("/api/og-work-place-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ogWorkPlaceTypes)))
            .andExpect(status().isCreated());

        // Validate the OgWorkPlaceTypes in the database
        List<OgWorkPlaceTypes> ogWorkPlaceTypesList = ogWorkPlaceTypesRepository.findAll();
        assertThat(ogWorkPlaceTypesList).hasSize(databaseSizeBeforeCreate + 1);
        OgWorkPlaceTypes testOgWorkPlaceTypes = ogWorkPlaceTypesList.get(ogWorkPlaceTypesList.size() - 1);
        assertThat(testOgWorkPlaceTypes.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testOgWorkPlaceTypes.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testOgWorkPlaceTypes.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testOgWorkPlaceTypes.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testOgWorkPlaceTypes.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testOgWorkPlaceTypes.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testOgWorkPlaceTypes.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createOgWorkPlaceTypesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ogWorkPlaceTypesRepository.findAll().size();

        // Create the OgWorkPlaceTypes with an existing ID
        ogWorkPlaceTypes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOgWorkPlaceTypesMockMvc.perform(post("/api/og-work-place-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ogWorkPlaceTypes)))
            .andExpect(status().isBadRequest());

        // Validate the OgWorkPlaceTypes in the database
        List<OgWorkPlaceTypes> ogWorkPlaceTypesList = ogWorkPlaceTypesRepository.findAll();
        assertThat(ogWorkPlaceTypesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = ogWorkPlaceTypesRepository.findAll().size();
        // set the field null
        ogWorkPlaceTypes.setCode(null);

        // Create the OgWorkPlaceTypes, which fails.

        restOgWorkPlaceTypesMockMvc.perform(post("/api/og-work-place-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ogWorkPlaceTypes)))
            .andExpect(status().isBadRequest());

        List<OgWorkPlaceTypes> ogWorkPlaceTypesList = ogWorkPlaceTypesRepository.findAll();
        assertThat(ogWorkPlaceTypesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = ogWorkPlaceTypesRepository.findAll().size();
        // set the field null
        ogWorkPlaceTypes.setName(null);

        // Create the OgWorkPlaceTypes, which fails.

        restOgWorkPlaceTypesMockMvc.perform(post("/api/og-work-place-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ogWorkPlaceTypes)))
            .andExpect(status().isBadRequest());

        List<OgWorkPlaceTypes> ogWorkPlaceTypesList = ogWorkPlaceTypesRepository.findAll();
        assertThat(ogWorkPlaceTypesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOgWorkPlaceTypes() throws Exception {
        // Initialize the database
        ogWorkPlaceTypesRepository.saveAndFlush(ogWorkPlaceTypes);

        // Get all the ogWorkPlaceTypesList
        restOgWorkPlaceTypesMockMvc.perform(get("/api/og-work-place-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ogWorkPlaceTypes.getId().intValue())))
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
    public void getOgWorkPlaceTypes() throws Exception {
        // Initialize the database
        ogWorkPlaceTypesRepository.saveAndFlush(ogWorkPlaceTypes);

        // Get the ogWorkPlaceTypes
        restOgWorkPlaceTypesMockMvc.perform(get("/api/og-work-place-types/{id}", ogWorkPlaceTypes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ogWorkPlaceTypes.getId().intValue()))
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
    public void getNonExistingOgWorkPlaceTypes() throws Exception {
        // Get the ogWorkPlaceTypes
        restOgWorkPlaceTypesMockMvc.perform(get("/api/og-work-place-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOgWorkPlaceTypes() throws Exception {
        // Initialize the database
        ogWorkPlaceTypesRepository.saveAndFlush(ogWorkPlaceTypes);
        int databaseSizeBeforeUpdate = ogWorkPlaceTypesRepository.findAll().size();

        // Update the ogWorkPlaceTypes
        OgWorkPlaceTypes updatedOgWorkPlaceTypes = ogWorkPlaceTypesRepository.findOne(ogWorkPlaceTypes.getId());
        // Disconnect from session so that the updates on updatedOgWorkPlaceTypes are not directly saved in db
        em.detach(updatedOgWorkPlaceTypes);
        updatedOgWorkPlaceTypes
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restOgWorkPlaceTypesMockMvc.perform(put("/api/og-work-place-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOgWorkPlaceTypes)))
            .andExpect(status().isOk());

        // Validate the OgWorkPlaceTypes in the database
        List<OgWorkPlaceTypes> ogWorkPlaceTypesList = ogWorkPlaceTypesRepository.findAll();
        assertThat(ogWorkPlaceTypesList).hasSize(databaseSizeBeforeUpdate);
        OgWorkPlaceTypes testOgWorkPlaceTypes = ogWorkPlaceTypesList.get(ogWorkPlaceTypesList.size() - 1);
        assertThat(testOgWorkPlaceTypes.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testOgWorkPlaceTypes.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testOgWorkPlaceTypes.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testOgWorkPlaceTypes.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testOgWorkPlaceTypes.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testOgWorkPlaceTypes.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testOgWorkPlaceTypes.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingOgWorkPlaceTypes() throws Exception {
        int databaseSizeBeforeUpdate = ogWorkPlaceTypesRepository.findAll().size();

        // Create the OgWorkPlaceTypes

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOgWorkPlaceTypesMockMvc.perform(put("/api/og-work-place-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ogWorkPlaceTypes)))
            .andExpect(status().isCreated());

        // Validate the OgWorkPlaceTypes in the database
        List<OgWorkPlaceTypes> ogWorkPlaceTypesList = ogWorkPlaceTypesRepository.findAll();
        assertThat(ogWorkPlaceTypesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOgWorkPlaceTypes() throws Exception {
        // Initialize the database
        ogWorkPlaceTypesRepository.saveAndFlush(ogWorkPlaceTypes);
        int databaseSizeBeforeDelete = ogWorkPlaceTypesRepository.findAll().size();

        // Get the ogWorkPlaceTypes
        restOgWorkPlaceTypesMockMvc.perform(delete("/api/og-work-place-types/{id}", ogWorkPlaceTypes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OgWorkPlaceTypes> ogWorkPlaceTypesList = ogWorkPlaceTypesRepository.findAll();
        assertThat(ogWorkPlaceTypesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OgWorkPlaceTypes.class);
        OgWorkPlaceTypes ogWorkPlaceTypes1 = new OgWorkPlaceTypes();
        ogWorkPlaceTypes1.setId(1L);
        OgWorkPlaceTypes ogWorkPlaceTypes2 = new OgWorkPlaceTypes();
        ogWorkPlaceTypes2.setId(ogWorkPlaceTypes1.getId());
        assertThat(ogWorkPlaceTypes1).isEqualTo(ogWorkPlaceTypes2);
        ogWorkPlaceTypes2.setId(2L);
        assertThat(ogWorkPlaceTypes1).isNotEqualTo(ogWorkPlaceTypes2);
        ogWorkPlaceTypes1.setId(null);
        assertThat(ogWorkPlaceTypes1).isNotEqualTo(ogWorkPlaceTypes2);
    }
}
