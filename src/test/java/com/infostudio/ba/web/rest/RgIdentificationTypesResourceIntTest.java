package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.RgIdentificationTypes;
import com.infostudio.ba.repository.RgIdentificationTypesRepository;
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
 * Test class for the RgIdentificationTypesResource REST controller.
 *
 * @see RgIdentificationTypesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class RgIdentificationTypesResourceIntTest {

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
    private RgIdentificationTypesRepository rgIdentificationTypesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRgIdentificationTypesMockMvc;

    private RgIdentificationTypes rgIdentificationTypes;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RgIdentificationTypesResource rgIdentificationTypesResource = new RgIdentificationTypesResource(rgIdentificationTypesRepository);
        this.restRgIdentificationTypesMockMvc = MockMvcBuilders.standaloneSetup(rgIdentificationTypesResource)
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
    public static RgIdentificationTypes createEntity(EntityManager em) {
        RgIdentificationTypes rgIdentificationTypes = new RgIdentificationTypes()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return rgIdentificationTypes;
    }

    @Before
    public void initTest() {
        rgIdentificationTypes = createEntity(em);
    }

    @Test
    @Transactional
    public void createRgIdentificationTypes() throws Exception {
        int databaseSizeBeforeCreate = rgIdentificationTypesRepository.findAll().size();

        // Create the RgIdentificationTypes
        restRgIdentificationTypesMockMvc.perform(post("/api/rg-identification-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgIdentificationTypes)))
            .andExpect(status().isCreated());

        // Validate the RgIdentificationTypes in the database
        List<RgIdentificationTypes> rgIdentificationTypesList = rgIdentificationTypesRepository.findAll();
        assertThat(rgIdentificationTypesList).hasSize(databaseSizeBeforeCreate + 1);
        RgIdentificationTypes testRgIdentificationTypes = rgIdentificationTypesList.get(rgIdentificationTypesList.size() - 1);
        assertThat(testRgIdentificationTypes.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testRgIdentificationTypes.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRgIdentificationTypes.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testRgIdentificationTypes.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testRgIdentificationTypes.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testRgIdentificationTypes.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testRgIdentificationTypes.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createRgIdentificationTypesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rgIdentificationTypesRepository.findAll().size();

        // Create the RgIdentificationTypes with an existing ID
        rgIdentificationTypes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRgIdentificationTypesMockMvc.perform(post("/api/rg-identification-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgIdentificationTypes)))
            .andExpect(status().isBadRequest());

        // Validate the RgIdentificationTypes in the database
        List<RgIdentificationTypes> rgIdentificationTypesList = rgIdentificationTypesRepository.findAll();
        assertThat(rgIdentificationTypesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = rgIdentificationTypesRepository.findAll().size();
        // set the field null
        rgIdentificationTypes.setCode(null);

        // Create the RgIdentificationTypes, which fails.

        restRgIdentificationTypesMockMvc.perform(post("/api/rg-identification-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgIdentificationTypes)))
            .andExpect(status().isBadRequest());

        List<RgIdentificationTypes> rgIdentificationTypesList = rgIdentificationTypesRepository.findAll();
        assertThat(rgIdentificationTypesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = rgIdentificationTypesRepository.findAll().size();
        // set the field null
        rgIdentificationTypes.setName(null);

        // Create the RgIdentificationTypes, which fails.

        restRgIdentificationTypesMockMvc.perform(post("/api/rg-identification-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgIdentificationTypes)))
            .andExpect(status().isBadRequest());

        List<RgIdentificationTypes> rgIdentificationTypesList = rgIdentificationTypesRepository.findAll();
        assertThat(rgIdentificationTypesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRgIdentificationTypes() throws Exception {
        // Initialize the database
        rgIdentificationTypesRepository.saveAndFlush(rgIdentificationTypes);

        // Get all the rgIdentificationTypesList
        restRgIdentificationTypesMockMvc.perform(get("/api/rg-identification-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rgIdentificationTypes.getId().intValue())))
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
    public void getRgIdentificationTypes() throws Exception {
        // Initialize the database
        rgIdentificationTypesRepository.saveAndFlush(rgIdentificationTypes);

        // Get the rgIdentificationTypes
        restRgIdentificationTypesMockMvc.perform(get("/api/rg-identification-types/{id}", rgIdentificationTypes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rgIdentificationTypes.getId().intValue()))
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
    public void getNonExistingRgIdentificationTypes() throws Exception {
        // Get the rgIdentificationTypes
        restRgIdentificationTypesMockMvc.perform(get("/api/rg-identification-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRgIdentificationTypes() throws Exception {
        // Initialize the database
        rgIdentificationTypesRepository.saveAndFlush(rgIdentificationTypes);
        int databaseSizeBeforeUpdate = rgIdentificationTypesRepository.findAll().size();

        // Update the rgIdentificationTypes
        RgIdentificationTypes updatedRgIdentificationTypes = rgIdentificationTypesRepository.findOne(rgIdentificationTypes.getId());
        // Disconnect from session so that the updates on updatedRgIdentificationTypes are not directly saved in db
        em.detach(updatedRgIdentificationTypes);
        updatedRgIdentificationTypes
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restRgIdentificationTypesMockMvc.perform(put("/api/rg-identification-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRgIdentificationTypes)))
            .andExpect(status().isOk());

        // Validate the RgIdentificationTypes in the database
        List<RgIdentificationTypes> rgIdentificationTypesList = rgIdentificationTypesRepository.findAll();
        assertThat(rgIdentificationTypesList).hasSize(databaseSizeBeforeUpdate);
        RgIdentificationTypes testRgIdentificationTypes = rgIdentificationTypesList.get(rgIdentificationTypesList.size() - 1);
        assertThat(testRgIdentificationTypes.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testRgIdentificationTypes.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRgIdentificationTypes.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testRgIdentificationTypes.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testRgIdentificationTypes.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testRgIdentificationTypes.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testRgIdentificationTypes.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingRgIdentificationTypes() throws Exception {
        int databaseSizeBeforeUpdate = rgIdentificationTypesRepository.findAll().size();

        // Create the RgIdentificationTypes

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRgIdentificationTypesMockMvc.perform(put("/api/rg-identification-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgIdentificationTypes)))
            .andExpect(status().isCreated());

        // Validate the RgIdentificationTypes in the database
        List<RgIdentificationTypes> rgIdentificationTypesList = rgIdentificationTypesRepository.findAll();
        assertThat(rgIdentificationTypesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRgIdentificationTypes() throws Exception {
        // Initialize the database
        rgIdentificationTypesRepository.saveAndFlush(rgIdentificationTypes);
        int databaseSizeBeforeDelete = rgIdentificationTypesRepository.findAll().size();

        // Get the rgIdentificationTypes
        restRgIdentificationTypesMockMvc.perform(delete("/api/rg-identification-types/{id}", rgIdentificationTypes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RgIdentificationTypes> rgIdentificationTypesList = rgIdentificationTypesRepository.findAll();
        assertThat(rgIdentificationTypesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RgIdentificationTypes.class);
        RgIdentificationTypes rgIdentificationTypes1 = new RgIdentificationTypes();
        rgIdentificationTypes1.setId(1L);
        RgIdentificationTypes rgIdentificationTypes2 = new RgIdentificationTypes();
        rgIdentificationTypes2.setId(rgIdentificationTypes1.getId());
        assertThat(rgIdentificationTypes1).isEqualTo(rgIdentificationTypes2);
        rgIdentificationTypes2.setId(2L);
        assertThat(rgIdentificationTypes1).isNotEqualTo(rgIdentificationTypes2);
        rgIdentificationTypes1.setId(null);
        assertThat(rgIdentificationTypes1).isNotEqualTo(rgIdentificationTypes2);
    }
}
