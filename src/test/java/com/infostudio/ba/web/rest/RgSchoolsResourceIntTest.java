package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.RgSchools;
import com.infostudio.ba.repository.RgSchoolsRepository;
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
 * Test class for the RgSchoolsResource REST controller.
 *
 * @see RgSchoolsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class RgSchoolsResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private RgSchoolsRepository rgSchoolsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRgSchoolsMockMvc;

    private RgSchools rgSchools;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RgSchoolsResource rgSchoolsResource = new RgSchoolsResource(rgSchoolsRepository);
        this.restRgSchoolsMockMvc = MockMvcBuilders.standaloneSetup(rgSchoolsResource)
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
    public static RgSchools createEntity(EntityManager em) {
        RgSchools rgSchools = new RgSchools()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .address(DEFAULT_ADDRESS)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return rgSchools;
    }

    @Before
    public void initTest() {
        rgSchools = createEntity(em);
    }

    @Test
    @Transactional
    public void createRgSchools() throws Exception {
        int databaseSizeBeforeCreate = rgSchoolsRepository.findAll().size();

        // Create the RgSchools
        restRgSchoolsMockMvc.perform(post("/api/rg-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgSchools)))
            .andExpect(status().isCreated());

        // Validate the RgSchools in the database
        List<RgSchools> rgSchoolsList = rgSchoolsRepository.findAll();
        assertThat(rgSchoolsList).hasSize(databaseSizeBeforeCreate + 1);
        RgSchools testRgSchools = rgSchoolsList.get(rgSchoolsList.size() - 1);
        assertThat(testRgSchools.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testRgSchools.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRgSchools.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testRgSchools.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testRgSchools.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testRgSchools.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testRgSchools.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testRgSchools.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createRgSchoolsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rgSchoolsRepository.findAll().size();

        // Create the RgSchools with an existing ID
        rgSchools.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRgSchoolsMockMvc.perform(post("/api/rg-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgSchools)))
            .andExpect(status().isBadRequest());

        // Validate the RgSchools in the database
        List<RgSchools> rgSchoolsList = rgSchoolsRepository.findAll();
        assertThat(rgSchoolsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = rgSchoolsRepository.findAll().size();
        // set the field null
        rgSchools.setCode(null);

        // Create the RgSchools, which fails.

        restRgSchoolsMockMvc.perform(post("/api/rg-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgSchools)))
            .andExpect(status().isBadRequest());

        List<RgSchools> rgSchoolsList = rgSchoolsRepository.findAll();
        assertThat(rgSchoolsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = rgSchoolsRepository.findAll().size();
        // set the field null
        rgSchools.setName(null);

        // Create the RgSchools, which fails.

        restRgSchoolsMockMvc.perform(post("/api/rg-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgSchools)))
            .andExpect(status().isBadRequest());

        List<RgSchools> rgSchoolsList = rgSchoolsRepository.findAll();
        assertThat(rgSchoolsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAddressIsRequired() throws Exception {
        int databaseSizeBeforeTest = rgSchoolsRepository.findAll().size();
        // set the field null
        rgSchools.setAddress(null);

        // Create the RgSchools, which fails.

        restRgSchoolsMockMvc.perform(post("/api/rg-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgSchools)))
            .andExpect(status().isBadRequest());

        List<RgSchools> rgSchoolsList = rgSchoolsRepository.findAll();
        assertThat(rgSchoolsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRgSchools() throws Exception {
        // Initialize the database
        rgSchoolsRepository.saveAndFlush(rgSchools);

        // Get all the rgSchoolsList
        restRgSchoolsMockMvc.perform(get("/api/rg-schools?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rgSchools.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getRgSchools() throws Exception {
        // Initialize the database
        rgSchoolsRepository.saveAndFlush(rgSchools);

        // Get the rgSchools
        restRgSchoolsMockMvc.perform(get("/api/rg-schools/{id}", rgSchools.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rgSchools.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRgSchools() throws Exception {
        // Get the rgSchools
        restRgSchoolsMockMvc.perform(get("/api/rg-schools/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRgSchools() throws Exception {
        // Initialize the database
        rgSchoolsRepository.saveAndFlush(rgSchools);
        int databaseSizeBeforeUpdate = rgSchoolsRepository.findAll().size();

        // Update the rgSchools
        RgSchools updatedRgSchools = rgSchoolsRepository.findOne(rgSchools.getId());
        // Disconnect from session so that the updates on updatedRgSchools are not directly saved in db
        em.detach(updatedRgSchools);
        updatedRgSchools
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .address(UPDATED_ADDRESS)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restRgSchoolsMockMvc.perform(put("/api/rg-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRgSchools)))
            .andExpect(status().isOk());

        // Validate the RgSchools in the database
        List<RgSchools> rgSchoolsList = rgSchoolsRepository.findAll();
        assertThat(rgSchoolsList).hasSize(databaseSizeBeforeUpdate);
        RgSchools testRgSchools = rgSchoolsList.get(rgSchoolsList.size() - 1);
        assertThat(testRgSchools.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testRgSchools.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRgSchools.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testRgSchools.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testRgSchools.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testRgSchools.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testRgSchools.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testRgSchools.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingRgSchools() throws Exception {
        int databaseSizeBeforeUpdate = rgSchoolsRepository.findAll().size();

        // Create the RgSchools

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRgSchoolsMockMvc.perform(put("/api/rg-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgSchools)))
            .andExpect(status().isCreated());

        // Validate the RgSchools in the database
        List<RgSchools> rgSchoolsList = rgSchoolsRepository.findAll();
        assertThat(rgSchoolsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRgSchools() throws Exception {
        // Initialize the database
        rgSchoolsRepository.saveAndFlush(rgSchools);
        int databaseSizeBeforeDelete = rgSchoolsRepository.findAll().size();

        // Get the rgSchools
        restRgSchoolsMockMvc.perform(delete("/api/rg-schools/{id}", rgSchools.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RgSchools> rgSchoolsList = rgSchoolsRepository.findAll();
        assertThat(rgSchoolsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RgSchools.class);
        RgSchools rgSchools1 = new RgSchools();
        rgSchools1.setId(1L);
        RgSchools rgSchools2 = new RgSchools();
        rgSchools2.setId(rgSchools1.getId());
        assertThat(rgSchools1).isEqualTo(rgSchools2);
        rgSchools2.setId(2L);
        assertThat(rgSchools1).isNotEqualTo(rgSchools2);
        rgSchools1.setId(null);
        assertThat(rgSchools1).isNotEqualTo(rgSchools2);
    }
}
