package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.LeLegalEntities;
import com.infostudio.ba.repository.LeLegalEntitiesRepository;
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
 * Test class for the LeLegalEntitiesResource REST controller.
 *
 * @see LeLegalEntitiesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class LeLegalEntitiesResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_ID_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_ID_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_DUTY_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_DUTY_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_POSTAL_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_POSTAL_NUMBER = "BBBBBBBBBB";

    @Autowired
    private LeLegalEntitiesRepository leLegalEntitiesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLeLegalEntitiesMockMvc;

    private LeLegalEntities leLegalEntities;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LeLegalEntitiesResource leLegalEntitiesResource = new LeLegalEntitiesResource(leLegalEntitiesRepository);
        this.restLeLegalEntitiesMockMvc = MockMvcBuilders.standaloneSetup(leLegalEntitiesResource)
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
    public static LeLegalEntities createEntity(EntityManager em) {
        LeLegalEntities leLegalEntities = new LeLegalEntities()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT)
            .idNumber(DEFAULT_ID_NUMBER)
            .dutyNumber(DEFAULT_DUTY_NUMBER)
            .address(DEFAULT_ADDRESS)
            .postalNumber(DEFAULT_POSTAL_NUMBER);
        return leLegalEntities;
    }

    @Before
    public void initTest() {
        leLegalEntities = createEntity(em);
    }

    @Test
    @Transactional
    public void createLeLegalEntities() throws Exception {
        int databaseSizeBeforeCreate = leLegalEntitiesRepository.findAll().size();

        // Create the LeLegalEntities
        restLeLegalEntitiesMockMvc.perform(post("/api/le-legal-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leLegalEntities)))
            .andExpect(status().isCreated());

        // Validate the LeLegalEntities in the database
        List<LeLegalEntities> leLegalEntitiesList = leLegalEntitiesRepository.findAll();
        assertThat(leLegalEntitiesList).hasSize(databaseSizeBeforeCreate + 1);
        LeLegalEntities testLeLegalEntities = leLegalEntitiesList.get(leLegalEntitiesList.size() - 1);
        assertThat(testLeLegalEntities.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testLeLegalEntities.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testLeLegalEntities.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testLeLegalEntities.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testLeLegalEntities.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testLeLegalEntities.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
        assertThat(testLeLegalEntities.getIdNumber()).isEqualTo(DEFAULT_ID_NUMBER);
        assertThat(testLeLegalEntities.getDutyNumber()).isEqualTo(DEFAULT_DUTY_NUMBER);
        assertThat(testLeLegalEntities.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testLeLegalEntities.getPostalNumber()).isEqualTo(DEFAULT_POSTAL_NUMBER);
    }

    @Test
    @Transactional
    public void createLeLegalEntitiesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = leLegalEntitiesRepository.findAll().size();

        // Create the LeLegalEntities with an existing ID
        leLegalEntities.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLeLegalEntitiesMockMvc.perform(post("/api/le-legal-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leLegalEntities)))
            .andExpect(status().isBadRequest());

        // Validate the LeLegalEntities in the database
        List<LeLegalEntities> leLegalEntitiesList = leLegalEntitiesRepository.findAll();
        assertThat(leLegalEntitiesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = leLegalEntitiesRepository.findAll().size();
        // set the field null
        leLegalEntities.setCode(null);

        // Create the LeLegalEntities, which fails.

        restLeLegalEntitiesMockMvc.perform(post("/api/le-legal-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leLegalEntities)))
            .andExpect(status().isBadRequest());

        List<LeLegalEntities> leLegalEntitiesList = leLegalEntitiesRepository.findAll();
        assertThat(leLegalEntitiesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAddressIsRequired() throws Exception {
        int databaseSizeBeforeTest = leLegalEntitiesRepository.findAll().size();
        // set the field null
        leLegalEntities.setAddress(null);

        // Create the LeLegalEntities, which fails.

        restLeLegalEntitiesMockMvc.perform(post("/api/le-legal-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leLegalEntities)))
            .andExpect(status().isBadRequest());

        List<LeLegalEntities> leLegalEntitiesList = leLegalEntitiesRepository.findAll();
        assertThat(leLegalEntitiesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPostalNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = leLegalEntitiesRepository.findAll().size();
        // set the field null
        leLegalEntities.setPostalNumber(null);

        // Create the LeLegalEntities, which fails.

        restLeLegalEntitiesMockMvc.perform(post("/api/le-legal-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leLegalEntities)))
            .andExpect(status().isBadRequest());

        List<LeLegalEntities> leLegalEntitiesList = leLegalEntitiesRepository.findAll();
        assertThat(leLegalEntitiesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLeLegalEntities() throws Exception {
        // Initialize the database
        leLegalEntitiesRepository.saveAndFlush(leLegalEntities);

        // Get all the leLegalEntitiesList
        restLeLegalEntitiesMockMvc.perform(get("/api/le-legal-entities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(leLegalEntities.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())))
            .andExpect(jsonPath("$.[*].idNumber").value(hasItem(DEFAULT_ID_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].dutyNumber").value(hasItem(DEFAULT_DUTY_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].postalNumber").value(hasItem(DEFAULT_POSTAL_NUMBER.toString())));
    }

    @Test
    @Transactional
    public void getLeLegalEntities() throws Exception {
        // Initialize the database
        leLegalEntitiesRepository.saveAndFlush(leLegalEntities);

        // Get the leLegalEntities
        restLeLegalEntitiesMockMvc.perform(get("/api/le-legal-entities/{id}", leLegalEntities.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(leLegalEntities.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()))
            .andExpect(jsonPath("$.idNumber").value(DEFAULT_ID_NUMBER.toString()))
            .andExpect(jsonPath("$.dutyNumber").value(DEFAULT_DUTY_NUMBER.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.postalNumber").value(DEFAULT_POSTAL_NUMBER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLeLegalEntities() throws Exception {
        // Get the leLegalEntities
        restLeLegalEntitiesMockMvc.perform(get("/api/le-legal-entities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLeLegalEntities() throws Exception {
        // Initialize the database
        leLegalEntitiesRepository.saveAndFlush(leLegalEntities);
        int databaseSizeBeforeUpdate = leLegalEntitiesRepository.findAll().size();

        // Update the leLegalEntities
        LeLegalEntities updatedLeLegalEntities = leLegalEntitiesRepository.findOne(leLegalEntities.getId());
        // Disconnect from session so that the updates on updatedLeLegalEntities are not directly saved in db
        em.detach(updatedLeLegalEntities);
        updatedLeLegalEntities
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT)
            .idNumber(UPDATED_ID_NUMBER)
            .dutyNumber(UPDATED_DUTY_NUMBER)
            .address(UPDATED_ADDRESS)
            .postalNumber(UPDATED_POSTAL_NUMBER);

        restLeLegalEntitiesMockMvc.perform(put("/api/le-legal-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLeLegalEntities)))
            .andExpect(status().isOk());

        // Validate the LeLegalEntities in the database
        List<LeLegalEntities> leLegalEntitiesList = leLegalEntitiesRepository.findAll();
        assertThat(leLegalEntitiesList).hasSize(databaseSizeBeforeUpdate);
        LeLegalEntities testLeLegalEntities = leLegalEntitiesList.get(leLegalEntitiesList.size() - 1);
        assertThat(testLeLegalEntities.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testLeLegalEntities.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testLeLegalEntities.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testLeLegalEntities.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testLeLegalEntities.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testLeLegalEntities.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
        assertThat(testLeLegalEntities.getIdNumber()).isEqualTo(UPDATED_ID_NUMBER);
        assertThat(testLeLegalEntities.getDutyNumber()).isEqualTo(UPDATED_DUTY_NUMBER);
        assertThat(testLeLegalEntities.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testLeLegalEntities.getPostalNumber()).isEqualTo(UPDATED_POSTAL_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingLeLegalEntities() throws Exception {
        int databaseSizeBeforeUpdate = leLegalEntitiesRepository.findAll().size();

        // Create the LeLegalEntities

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLeLegalEntitiesMockMvc.perform(put("/api/le-legal-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(leLegalEntities)))
            .andExpect(status().isCreated());

        // Validate the LeLegalEntities in the database
        List<LeLegalEntities> leLegalEntitiesList = leLegalEntitiesRepository.findAll();
        assertThat(leLegalEntitiesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLeLegalEntities() throws Exception {
        // Initialize the database
        leLegalEntitiesRepository.saveAndFlush(leLegalEntities);
        int databaseSizeBeforeDelete = leLegalEntitiesRepository.findAll().size();

        // Get the leLegalEntities
        restLeLegalEntitiesMockMvc.perform(delete("/api/le-legal-entities/{id}", leLegalEntities.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<LeLegalEntities> leLegalEntitiesList = leLegalEntitiesRepository.findAll();
        assertThat(leLegalEntitiesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LeLegalEntities.class);
        LeLegalEntities leLegalEntities1 = new LeLegalEntities();
        leLegalEntities1.setId(1L);
        LeLegalEntities leLegalEntities2 = new LeLegalEntities();
        leLegalEntities2.setId(leLegalEntities1.getId());
        assertThat(leLegalEntities1).isEqualTo(leLegalEntities2);
        leLegalEntities2.setId(2L);
        assertThat(leLegalEntities1).isNotEqualTo(leLegalEntities2);
        leLegalEntities1.setId(null);
        assertThat(leLegalEntities1).isNotEqualTo(leLegalEntities2);
    }
}
