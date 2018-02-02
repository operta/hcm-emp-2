package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.OgOrgWorkPlaces;
import com.infostudio.ba.repository.OgOrgWorkPlacesRepository;
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
 * Test class for the OgOrgWorkPlacesResource REST controller.
 *
 * @see OgOrgWorkPlacesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class OgOrgWorkPlacesResourceIntTest {

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private OgOrgWorkPlacesRepository ogOrgWorkPlacesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOgOrgWorkPlacesMockMvc;

    private OgOrgWorkPlaces ogOrgWorkPlaces;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OgOrgWorkPlacesResource ogOrgWorkPlacesResource = new OgOrgWorkPlacesResource(ogOrgWorkPlacesRepository);
        this.restOgOrgWorkPlacesMockMvc = MockMvcBuilders.standaloneSetup(ogOrgWorkPlacesResource)
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
    public static OgOrgWorkPlaces createEntity(EntityManager em) {
        OgOrgWorkPlaces ogOrgWorkPlaces = new OgOrgWorkPlaces()
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return ogOrgWorkPlaces;
    }

    @Before
    public void initTest() {
        ogOrgWorkPlaces = createEntity(em);
    }

    @Test
    @Transactional
    public void createOgOrgWorkPlaces() throws Exception {
        int databaseSizeBeforeCreate = ogOrgWorkPlacesRepository.findAll().size();

        // Create the OgOrgWorkPlaces
        restOgOrgWorkPlacesMockMvc.perform(post("/api/og-org-work-places")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ogOrgWorkPlaces)))
            .andExpect(status().isCreated());

        // Validate the OgOrgWorkPlaces in the database
        List<OgOrgWorkPlaces> ogOrgWorkPlacesList = ogOrgWorkPlacesRepository.findAll();
        assertThat(ogOrgWorkPlacesList).hasSize(databaseSizeBeforeCreate + 1);
        OgOrgWorkPlaces testOgOrgWorkPlaces = ogOrgWorkPlacesList.get(ogOrgWorkPlacesList.size() - 1);
        assertThat(testOgOrgWorkPlaces.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testOgOrgWorkPlaces.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testOgOrgWorkPlaces.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testOgOrgWorkPlaces.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createOgOrgWorkPlacesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ogOrgWorkPlacesRepository.findAll().size();

        // Create the OgOrgWorkPlaces with an existing ID
        ogOrgWorkPlaces.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOgOrgWorkPlacesMockMvc.perform(post("/api/og-org-work-places")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ogOrgWorkPlaces)))
            .andExpect(status().isBadRequest());

        // Validate the OgOrgWorkPlaces in the database
        List<OgOrgWorkPlaces> ogOrgWorkPlacesList = ogOrgWorkPlacesRepository.findAll();
        assertThat(ogOrgWorkPlacesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOgOrgWorkPlaces() throws Exception {
        // Initialize the database
        ogOrgWorkPlacesRepository.saveAndFlush(ogOrgWorkPlaces);

        // Get all the ogOrgWorkPlacesList
        restOgOrgWorkPlacesMockMvc.perform(get("/api/og-org-work-places?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ogOrgWorkPlaces.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getOgOrgWorkPlaces() throws Exception {
        // Initialize the database
        ogOrgWorkPlacesRepository.saveAndFlush(ogOrgWorkPlaces);

        // Get the ogOrgWorkPlaces
        restOgOrgWorkPlacesMockMvc.perform(get("/api/og-org-work-places/{id}", ogOrgWorkPlaces.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ogOrgWorkPlaces.getId().intValue()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOgOrgWorkPlaces() throws Exception {
        // Get the ogOrgWorkPlaces
        restOgOrgWorkPlacesMockMvc.perform(get("/api/og-org-work-places/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOgOrgWorkPlaces() throws Exception {
        // Initialize the database
        ogOrgWorkPlacesRepository.saveAndFlush(ogOrgWorkPlaces);
        int databaseSizeBeforeUpdate = ogOrgWorkPlacesRepository.findAll().size();

        // Update the ogOrgWorkPlaces
        OgOrgWorkPlaces updatedOgOrgWorkPlaces = ogOrgWorkPlacesRepository.findOne(ogOrgWorkPlaces.getId());
        // Disconnect from session so that the updates on updatedOgOrgWorkPlaces are not directly saved in db
        em.detach(updatedOgOrgWorkPlaces);
        updatedOgOrgWorkPlaces
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restOgOrgWorkPlacesMockMvc.perform(put("/api/og-org-work-places")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOgOrgWorkPlaces)))
            .andExpect(status().isOk());

        // Validate the OgOrgWorkPlaces in the database
        List<OgOrgWorkPlaces> ogOrgWorkPlacesList = ogOrgWorkPlacesRepository.findAll();
        assertThat(ogOrgWorkPlacesList).hasSize(databaseSizeBeforeUpdate);
        OgOrgWorkPlaces testOgOrgWorkPlaces = ogOrgWorkPlacesList.get(ogOrgWorkPlacesList.size() - 1);
        assertThat(testOgOrgWorkPlaces.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testOgOrgWorkPlaces.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testOgOrgWorkPlaces.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testOgOrgWorkPlaces.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingOgOrgWorkPlaces() throws Exception {
        int databaseSizeBeforeUpdate = ogOrgWorkPlacesRepository.findAll().size();

        // Create the OgOrgWorkPlaces

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOgOrgWorkPlacesMockMvc.perform(put("/api/og-org-work-places")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ogOrgWorkPlaces)))
            .andExpect(status().isCreated());

        // Validate the OgOrgWorkPlaces in the database
        List<OgOrgWorkPlaces> ogOrgWorkPlacesList = ogOrgWorkPlacesRepository.findAll();
        assertThat(ogOrgWorkPlacesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOgOrgWorkPlaces() throws Exception {
        // Initialize the database
        ogOrgWorkPlacesRepository.saveAndFlush(ogOrgWorkPlaces);
        int databaseSizeBeforeDelete = ogOrgWorkPlacesRepository.findAll().size();

        // Get the ogOrgWorkPlaces
        restOgOrgWorkPlacesMockMvc.perform(delete("/api/og-org-work-places/{id}", ogOrgWorkPlaces.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OgOrgWorkPlaces> ogOrgWorkPlacesList = ogOrgWorkPlacesRepository.findAll();
        assertThat(ogOrgWorkPlacesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OgOrgWorkPlaces.class);
        OgOrgWorkPlaces ogOrgWorkPlaces1 = new OgOrgWorkPlaces();
        ogOrgWorkPlaces1.setId(1L);
        OgOrgWorkPlaces ogOrgWorkPlaces2 = new OgOrgWorkPlaces();
        ogOrgWorkPlaces2.setId(ogOrgWorkPlaces1.getId());
        assertThat(ogOrgWorkPlaces1).isEqualTo(ogOrgWorkPlaces2);
        ogOrgWorkPlaces2.setId(2L);
        assertThat(ogOrgWorkPlaces1).isNotEqualTo(ogOrgWorkPlaces2);
        ogOrgWorkPlaces1.setId(null);
        assertThat(ogOrgWorkPlaces1).isNotEqualTo(ogOrgWorkPlaces2);
    }
}
