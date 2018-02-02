package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.RgQualifications;
import com.infostudio.ba.repository.RgQualificationsRepository;
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
 * Test class for the RgQualificationsResource REST controller.
 *
 * @see RgQualificationsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class RgQualificationsResourceIntTest {

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
    private RgQualificationsRepository rgQualificationsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRgQualificationsMockMvc;

    private RgQualifications rgQualifications;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RgQualificationsResource rgQualificationsResource = new RgQualificationsResource(rgQualificationsRepository);
        this.restRgQualificationsMockMvc = MockMvcBuilders.standaloneSetup(rgQualificationsResource)
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
    public static RgQualifications createEntity(EntityManager em) {
        RgQualifications rgQualifications = new RgQualifications()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return rgQualifications;
    }

    @Before
    public void initTest() {
        rgQualifications = createEntity(em);
    }

    @Test
    @Transactional
    public void createRgQualifications() throws Exception {
        int databaseSizeBeforeCreate = rgQualificationsRepository.findAll().size();

        // Create the RgQualifications
        restRgQualificationsMockMvc.perform(post("/api/rg-qualifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgQualifications)))
            .andExpect(status().isCreated());

        // Validate the RgQualifications in the database
        List<RgQualifications> rgQualificationsList = rgQualificationsRepository.findAll();
        assertThat(rgQualificationsList).hasSize(databaseSizeBeforeCreate + 1);
        RgQualifications testRgQualifications = rgQualificationsList.get(rgQualificationsList.size() - 1);
        assertThat(testRgQualifications.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testRgQualifications.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRgQualifications.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testRgQualifications.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testRgQualifications.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testRgQualifications.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testRgQualifications.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createRgQualificationsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rgQualificationsRepository.findAll().size();

        // Create the RgQualifications with an existing ID
        rgQualifications.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRgQualificationsMockMvc.perform(post("/api/rg-qualifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgQualifications)))
            .andExpect(status().isBadRequest());

        // Validate the RgQualifications in the database
        List<RgQualifications> rgQualificationsList = rgQualificationsRepository.findAll();
        assertThat(rgQualificationsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRgQualifications() throws Exception {
        // Initialize the database
        rgQualificationsRepository.saveAndFlush(rgQualifications);

        // Get all the rgQualificationsList
        restRgQualificationsMockMvc.perform(get("/api/rg-qualifications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rgQualifications.getId().intValue())))
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
    public void getRgQualifications() throws Exception {
        // Initialize the database
        rgQualificationsRepository.saveAndFlush(rgQualifications);

        // Get the rgQualifications
        restRgQualificationsMockMvc.perform(get("/api/rg-qualifications/{id}", rgQualifications.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rgQualifications.getId().intValue()))
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
    public void getNonExistingRgQualifications() throws Exception {
        // Get the rgQualifications
        restRgQualificationsMockMvc.perform(get("/api/rg-qualifications/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRgQualifications() throws Exception {
        // Initialize the database
        rgQualificationsRepository.saveAndFlush(rgQualifications);
        int databaseSizeBeforeUpdate = rgQualificationsRepository.findAll().size();

        // Update the rgQualifications
        RgQualifications updatedRgQualifications = rgQualificationsRepository.findOne(rgQualifications.getId());
        // Disconnect from session so that the updates on updatedRgQualifications are not directly saved in db
        em.detach(updatedRgQualifications);
        updatedRgQualifications
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restRgQualificationsMockMvc.perform(put("/api/rg-qualifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRgQualifications)))
            .andExpect(status().isOk());

        // Validate the RgQualifications in the database
        List<RgQualifications> rgQualificationsList = rgQualificationsRepository.findAll();
        assertThat(rgQualificationsList).hasSize(databaseSizeBeforeUpdate);
        RgQualifications testRgQualifications = rgQualificationsList.get(rgQualificationsList.size() - 1);
        assertThat(testRgQualifications.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testRgQualifications.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRgQualifications.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testRgQualifications.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testRgQualifications.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testRgQualifications.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testRgQualifications.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingRgQualifications() throws Exception {
        int databaseSizeBeforeUpdate = rgQualificationsRepository.findAll().size();

        // Create the RgQualifications

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRgQualificationsMockMvc.perform(put("/api/rg-qualifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgQualifications)))
            .andExpect(status().isCreated());

        // Validate the RgQualifications in the database
        List<RgQualifications> rgQualificationsList = rgQualificationsRepository.findAll();
        assertThat(rgQualificationsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRgQualifications() throws Exception {
        // Initialize the database
        rgQualificationsRepository.saveAndFlush(rgQualifications);
        int databaseSizeBeforeDelete = rgQualificationsRepository.findAll().size();

        // Get the rgQualifications
        restRgQualificationsMockMvc.perform(delete("/api/rg-qualifications/{id}", rgQualifications.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RgQualifications> rgQualificationsList = rgQualificationsRepository.findAll();
        assertThat(rgQualificationsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RgQualifications.class);
        RgQualifications rgQualifications1 = new RgQualifications();
        rgQualifications1.setId(1L);
        RgQualifications rgQualifications2 = new RgQualifications();
        rgQualifications2.setId(rgQualifications1.getId());
        assertThat(rgQualifications1).isEqualTo(rgQualifications2);
        rgQualifications2.setId(2L);
        assertThat(rgQualifications1).isNotEqualTo(rgQualifications2);
        rgQualifications1.setId(null);
        assertThat(rgQualifications1).isNotEqualTo(rgQualifications2);
    }
}
