package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.RgContactTypes;
import com.infostudio.ba.repository.RgContactTypesRepository;
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
 * Test class for the RgContactTypesResource REST controller.
 *
 * @see RgContactTypesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class RgContactTypesResourceIntTest {

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
    private RgContactTypesRepository rgContactTypesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRgContactTypesMockMvc;

    private RgContactTypes rgContactTypes;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RgContactTypesResource rgContactTypesResource = new RgContactTypesResource(rgContactTypesRepository);
        this.restRgContactTypesMockMvc = MockMvcBuilders.standaloneSetup(rgContactTypesResource)
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
    public static RgContactTypes createEntity(EntityManager em) {
        RgContactTypes rgContactTypes = new RgContactTypes()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return rgContactTypes;
    }

    @Before
    public void initTest() {
        rgContactTypes = createEntity(em);
    }

    @Test
    @Transactional
    public void createRgContactTypes() throws Exception {
        int databaseSizeBeforeCreate = rgContactTypesRepository.findAll().size();

        // Create the RgContactTypes
        restRgContactTypesMockMvc.perform(post("/api/rg-contact-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgContactTypes)))
            .andExpect(status().isCreated());

        // Validate the RgContactTypes in the database
        List<RgContactTypes> rgContactTypesList = rgContactTypesRepository.findAll();
        assertThat(rgContactTypesList).hasSize(databaseSizeBeforeCreate + 1);
        RgContactTypes testRgContactTypes = rgContactTypesList.get(rgContactTypesList.size() - 1);
        assertThat(testRgContactTypes.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testRgContactTypes.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRgContactTypes.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testRgContactTypes.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testRgContactTypes.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testRgContactTypes.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testRgContactTypes.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createRgContactTypesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rgContactTypesRepository.findAll().size();

        // Create the RgContactTypes with an existing ID
        rgContactTypes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRgContactTypesMockMvc.perform(post("/api/rg-contact-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgContactTypes)))
            .andExpect(status().isBadRequest());

        // Validate the RgContactTypes in the database
        List<RgContactTypes> rgContactTypesList = rgContactTypesRepository.findAll();
        assertThat(rgContactTypesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = rgContactTypesRepository.findAll().size();
        // set the field null
        rgContactTypes.setName(null);

        // Create the RgContactTypes, which fails.

        restRgContactTypesMockMvc.perform(post("/api/rg-contact-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgContactTypes)))
            .andExpect(status().isBadRequest());

        List<RgContactTypes> rgContactTypesList = rgContactTypesRepository.findAll();
        assertThat(rgContactTypesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRgContactTypes() throws Exception {
        // Initialize the database
        rgContactTypesRepository.saveAndFlush(rgContactTypes);

        // Get all the rgContactTypesList
        restRgContactTypesMockMvc.perform(get("/api/rg-contact-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rgContactTypes.getId().intValue())))
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
    public void getRgContactTypes() throws Exception {
        // Initialize the database
        rgContactTypesRepository.saveAndFlush(rgContactTypes);

        // Get the rgContactTypes
        restRgContactTypesMockMvc.perform(get("/api/rg-contact-types/{id}", rgContactTypes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rgContactTypes.getId().intValue()))
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
    public void getNonExistingRgContactTypes() throws Exception {
        // Get the rgContactTypes
        restRgContactTypesMockMvc.perform(get("/api/rg-contact-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRgContactTypes() throws Exception {
        // Initialize the database
        rgContactTypesRepository.saveAndFlush(rgContactTypes);
        int databaseSizeBeforeUpdate = rgContactTypesRepository.findAll().size();

        // Update the rgContactTypes
        RgContactTypes updatedRgContactTypes = rgContactTypesRepository.findOne(rgContactTypes.getId());
        // Disconnect from session so that the updates on updatedRgContactTypes are not directly saved in db
        em.detach(updatedRgContactTypes);
        updatedRgContactTypes
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restRgContactTypesMockMvc.perform(put("/api/rg-contact-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRgContactTypes)))
            .andExpect(status().isOk());

        // Validate the RgContactTypes in the database
        List<RgContactTypes> rgContactTypesList = rgContactTypesRepository.findAll();
        assertThat(rgContactTypesList).hasSize(databaseSizeBeforeUpdate);
        RgContactTypes testRgContactTypes = rgContactTypesList.get(rgContactTypesList.size() - 1);
        assertThat(testRgContactTypes.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testRgContactTypes.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRgContactTypes.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testRgContactTypes.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testRgContactTypes.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testRgContactTypes.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testRgContactTypes.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingRgContactTypes() throws Exception {
        int databaseSizeBeforeUpdate = rgContactTypesRepository.findAll().size();

        // Create the RgContactTypes

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRgContactTypesMockMvc.perform(put("/api/rg-contact-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgContactTypes)))
            .andExpect(status().isCreated());

        // Validate the RgContactTypes in the database
        List<RgContactTypes> rgContactTypesList = rgContactTypesRepository.findAll();
        assertThat(rgContactTypesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRgContactTypes() throws Exception {
        // Initialize the database
        rgContactTypesRepository.saveAndFlush(rgContactTypes);
        int databaseSizeBeforeDelete = rgContactTypesRepository.findAll().size();

        // Get the rgContactTypes
        restRgContactTypesMockMvc.perform(delete("/api/rg-contact-types/{id}", rgContactTypes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RgContactTypes> rgContactTypesList = rgContactTypesRepository.findAll();
        assertThat(rgContactTypesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RgContactTypes.class);
        RgContactTypes rgContactTypes1 = new RgContactTypes();
        rgContactTypes1.setId(1L);
        RgContactTypes rgContactTypes2 = new RgContactTypes();
        rgContactTypes2.setId(rgContactTypes1.getId());
        assertThat(rgContactTypes1).isEqualTo(rgContactTypes2);
        rgContactTypes2.setId(2L);
        assertThat(rgContactTypes1).isNotEqualTo(rgContactTypes2);
        rgContactTypes1.setId(null);
        assertThat(rgContactTypes1).isNotEqualTo(rgContactTypes2);
    }
}
