package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmBorrowingTypes;
import com.infostudio.ba.repository.EmBorrowingTypesRepository;
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
 * Test class for the EmBorrowingTypesResource REST controller.
 *
 * @see EmBorrowingTypesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmBorrowingTypesResourceIntTest {

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
    private EmBorrowingTypesRepository emBorrowingTypesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmBorrowingTypesMockMvc;

    private EmBorrowingTypes emBorrowingTypes;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmBorrowingTypesResource emBorrowingTypesResource = new EmBorrowingTypesResource(emBorrowingTypesRepository);
        this.restEmBorrowingTypesMockMvc = MockMvcBuilders.standaloneSetup(emBorrowingTypesResource)
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
    public static EmBorrowingTypes createEntity(EntityManager em) {
        EmBorrowingTypes emBorrowingTypes = new EmBorrowingTypes()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emBorrowingTypes;
    }

    @Before
    public void initTest() {
        emBorrowingTypes = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmBorrowingTypes() throws Exception {
        int databaseSizeBeforeCreate = emBorrowingTypesRepository.findAll().size();

        // Create the EmBorrowingTypes
        restEmBorrowingTypesMockMvc.perform(post("/api/em-borrowing-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emBorrowingTypes)))
            .andExpect(status().isCreated());

        // Validate the EmBorrowingTypes in the database
        List<EmBorrowingTypes> emBorrowingTypesList = emBorrowingTypesRepository.findAll();
        assertThat(emBorrowingTypesList).hasSize(databaseSizeBeforeCreate + 1);
        EmBorrowingTypes testEmBorrowingTypes = emBorrowingTypesList.get(emBorrowingTypesList.size() - 1);
        assertThat(testEmBorrowingTypes.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testEmBorrowingTypes.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEmBorrowingTypes.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testEmBorrowingTypes.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmBorrowingTypes.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmBorrowingTypes.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmBorrowingTypes.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmBorrowingTypesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emBorrowingTypesRepository.findAll().size();

        // Create the EmBorrowingTypes with an existing ID
        emBorrowingTypes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmBorrowingTypesMockMvc.perform(post("/api/em-borrowing-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emBorrowingTypes)))
            .andExpect(status().isBadRequest());

        // Validate the EmBorrowingTypes in the database
        List<EmBorrowingTypes> emBorrowingTypesList = emBorrowingTypesRepository.findAll();
        assertThat(emBorrowingTypesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = emBorrowingTypesRepository.findAll().size();
        // set the field null
        emBorrowingTypes.setCode(null);

        // Create the EmBorrowingTypes, which fails.

        restEmBorrowingTypesMockMvc.perform(post("/api/em-borrowing-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emBorrowingTypes)))
            .andExpect(status().isBadRequest());

        List<EmBorrowingTypes> emBorrowingTypesList = emBorrowingTypesRepository.findAll();
        assertThat(emBorrowingTypesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = emBorrowingTypesRepository.findAll().size();
        // set the field null
        emBorrowingTypes.setName(null);

        // Create the EmBorrowingTypes, which fails.

        restEmBorrowingTypesMockMvc.perform(post("/api/em-borrowing-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emBorrowingTypes)))
            .andExpect(status().isBadRequest());

        List<EmBorrowingTypes> emBorrowingTypesList = emBorrowingTypesRepository.findAll();
        assertThat(emBorrowingTypesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmBorrowingTypes() throws Exception {
        // Initialize the database
        emBorrowingTypesRepository.saveAndFlush(emBorrowingTypes);

        // Get all the emBorrowingTypesList
        restEmBorrowingTypesMockMvc.perform(get("/api/em-borrowing-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emBorrowingTypes.getId().intValue())))
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
    public void getEmBorrowingTypes() throws Exception {
        // Initialize the database
        emBorrowingTypesRepository.saveAndFlush(emBorrowingTypes);

        // Get the emBorrowingTypes
        restEmBorrowingTypesMockMvc.perform(get("/api/em-borrowing-types/{id}", emBorrowingTypes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emBorrowingTypes.getId().intValue()))
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
    public void getNonExistingEmBorrowingTypes() throws Exception {
        // Get the emBorrowingTypes
        restEmBorrowingTypesMockMvc.perform(get("/api/em-borrowing-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmBorrowingTypes() throws Exception {
        // Initialize the database
        emBorrowingTypesRepository.saveAndFlush(emBorrowingTypes);
        int databaseSizeBeforeUpdate = emBorrowingTypesRepository.findAll().size();

        // Update the emBorrowingTypes
        EmBorrowingTypes updatedEmBorrowingTypes = emBorrowingTypesRepository.findOne(emBorrowingTypes.getId());
        // Disconnect from session so that the updates on updatedEmBorrowingTypes are not directly saved in db
        em.detach(updatedEmBorrowingTypes);
        updatedEmBorrowingTypes
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmBorrowingTypesMockMvc.perform(put("/api/em-borrowing-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmBorrowingTypes)))
            .andExpect(status().isOk());

        // Validate the EmBorrowingTypes in the database
        List<EmBorrowingTypes> emBorrowingTypesList = emBorrowingTypesRepository.findAll();
        assertThat(emBorrowingTypesList).hasSize(databaseSizeBeforeUpdate);
        EmBorrowingTypes testEmBorrowingTypes = emBorrowingTypesList.get(emBorrowingTypesList.size() - 1);
        assertThat(testEmBorrowingTypes.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testEmBorrowingTypes.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEmBorrowingTypes.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testEmBorrowingTypes.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmBorrowingTypes.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmBorrowingTypes.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmBorrowingTypes.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmBorrowingTypes() throws Exception {
        int databaseSizeBeforeUpdate = emBorrowingTypesRepository.findAll().size();

        // Create the EmBorrowingTypes

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmBorrowingTypesMockMvc.perform(put("/api/em-borrowing-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emBorrowingTypes)))
            .andExpect(status().isCreated());

        // Validate the EmBorrowingTypes in the database
        List<EmBorrowingTypes> emBorrowingTypesList = emBorrowingTypesRepository.findAll();
        assertThat(emBorrowingTypesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmBorrowingTypes() throws Exception {
        // Initialize the database
        emBorrowingTypesRepository.saveAndFlush(emBorrowingTypes);
        int databaseSizeBeforeDelete = emBorrowingTypesRepository.findAll().size();

        // Get the emBorrowingTypes
        restEmBorrowingTypesMockMvc.perform(delete("/api/em-borrowing-types/{id}", emBorrowingTypes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmBorrowingTypes> emBorrowingTypesList = emBorrowingTypesRepository.findAll();
        assertThat(emBorrowingTypesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmBorrowingTypes.class);
        EmBorrowingTypes emBorrowingTypes1 = new EmBorrowingTypes();
        emBorrowingTypes1.setId(1L);
        EmBorrowingTypes emBorrowingTypes2 = new EmBorrowingTypes();
        emBorrowingTypes2.setId(emBorrowingTypes1.getId());
        assertThat(emBorrowingTypes1).isEqualTo(emBorrowingTypes2);
        emBorrowingTypes2.setId(2L);
        assertThat(emBorrowingTypes1).isNotEqualTo(emBorrowingTypes2);
        emBorrowingTypes1.setId(null);
        assertThat(emBorrowingTypes1).isNotEqualTo(emBorrowingTypes2);
    }
}
