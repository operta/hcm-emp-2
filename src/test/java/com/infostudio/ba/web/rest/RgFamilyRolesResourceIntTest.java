package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.RgFamilyRoles;
import com.infostudio.ba.repository.RgFamilyRolesRepository;
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
 * Test class for the RgFamilyRolesResource REST controller.
 *
 * @see RgFamilyRolesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class RgFamilyRolesResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_UNIQUE_RELATION = "AAAAAAAAAA";
    private static final String UPDATED_UNIQUE_RELATION = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private RgFamilyRolesRepository rgFamilyRolesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRgFamilyRolesMockMvc;

    private RgFamilyRoles rgFamilyRoles;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RgFamilyRolesResource rgFamilyRolesResource = new RgFamilyRolesResource(rgFamilyRolesRepository);
        this.restRgFamilyRolesMockMvc = MockMvcBuilders.standaloneSetup(rgFamilyRolesResource)
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
    public static RgFamilyRoles createEntity(EntityManager em) {
        RgFamilyRoles rgFamilyRoles = new RgFamilyRoles()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .uniqueRelation(DEFAULT_UNIQUE_RELATION)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return rgFamilyRoles;
    }

    @Before
    public void initTest() {
        rgFamilyRoles = createEntity(em);
    }

    @Test
    @Transactional
    public void createRgFamilyRoles() throws Exception {
        int databaseSizeBeforeCreate = rgFamilyRolesRepository.findAll().size();

        // Create the RgFamilyRoles
        restRgFamilyRolesMockMvc.perform(post("/api/rg-family-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgFamilyRoles)))
            .andExpect(status().isCreated());

        // Validate the RgFamilyRoles in the database
        List<RgFamilyRoles> rgFamilyRolesList = rgFamilyRolesRepository.findAll();
        assertThat(rgFamilyRolesList).hasSize(databaseSizeBeforeCreate + 1);
        RgFamilyRoles testRgFamilyRoles = rgFamilyRolesList.get(rgFamilyRolesList.size() - 1);
        assertThat(testRgFamilyRoles.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testRgFamilyRoles.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRgFamilyRoles.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testRgFamilyRoles.getUniqueRelation()).isEqualTo(DEFAULT_UNIQUE_RELATION);
        assertThat(testRgFamilyRoles.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testRgFamilyRoles.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testRgFamilyRoles.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testRgFamilyRoles.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createRgFamilyRolesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rgFamilyRolesRepository.findAll().size();

        // Create the RgFamilyRoles with an existing ID
        rgFamilyRoles.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRgFamilyRolesMockMvc.perform(post("/api/rg-family-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgFamilyRoles)))
            .andExpect(status().isBadRequest());

        // Validate the RgFamilyRoles in the database
        List<RgFamilyRoles> rgFamilyRolesList = rgFamilyRolesRepository.findAll();
        assertThat(rgFamilyRolesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = rgFamilyRolesRepository.findAll().size();
        // set the field null
        rgFamilyRoles.setCode(null);

        // Create the RgFamilyRoles, which fails.

        restRgFamilyRolesMockMvc.perform(post("/api/rg-family-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgFamilyRoles)))
            .andExpect(status().isBadRequest());

        List<RgFamilyRoles> rgFamilyRolesList = rgFamilyRolesRepository.findAll();
        assertThat(rgFamilyRolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = rgFamilyRolesRepository.findAll().size();
        // set the field null
        rgFamilyRoles.setName(null);

        // Create the RgFamilyRoles, which fails.

        restRgFamilyRolesMockMvc.perform(post("/api/rg-family-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgFamilyRoles)))
            .andExpect(status().isBadRequest());

        List<RgFamilyRoles> rgFamilyRolesList = rgFamilyRolesRepository.findAll();
        assertThat(rgFamilyRolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRgFamilyRoles() throws Exception {
        // Initialize the database
        rgFamilyRolesRepository.saveAndFlush(rgFamilyRoles);

        // Get all the rgFamilyRolesList
        restRgFamilyRolesMockMvc.perform(get("/api/rg-family-roles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rgFamilyRoles.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].uniqueRelation").value(hasItem(DEFAULT_UNIQUE_RELATION.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getRgFamilyRoles() throws Exception {
        // Initialize the database
        rgFamilyRolesRepository.saveAndFlush(rgFamilyRoles);

        // Get the rgFamilyRoles
        restRgFamilyRolesMockMvc.perform(get("/api/rg-family-roles/{id}", rgFamilyRoles.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rgFamilyRoles.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.uniqueRelation").value(DEFAULT_UNIQUE_RELATION.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRgFamilyRoles() throws Exception {
        // Get the rgFamilyRoles
        restRgFamilyRolesMockMvc.perform(get("/api/rg-family-roles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRgFamilyRoles() throws Exception {
        // Initialize the database
        rgFamilyRolesRepository.saveAndFlush(rgFamilyRoles);
        int databaseSizeBeforeUpdate = rgFamilyRolesRepository.findAll().size();

        // Update the rgFamilyRoles
        RgFamilyRoles updatedRgFamilyRoles = rgFamilyRolesRepository.findOne(rgFamilyRoles.getId());
        // Disconnect from session so that the updates on updatedRgFamilyRoles are not directly saved in db
        em.detach(updatedRgFamilyRoles);
        updatedRgFamilyRoles
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .uniqueRelation(UPDATED_UNIQUE_RELATION)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restRgFamilyRolesMockMvc.perform(put("/api/rg-family-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRgFamilyRoles)))
            .andExpect(status().isOk());

        // Validate the RgFamilyRoles in the database
        List<RgFamilyRoles> rgFamilyRolesList = rgFamilyRolesRepository.findAll();
        assertThat(rgFamilyRolesList).hasSize(databaseSizeBeforeUpdate);
        RgFamilyRoles testRgFamilyRoles = rgFamilyRolesList.get(rgFamilyRolesList.size() - 1);
        assertThat(testRgFamilyRoles.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testRgFamilyRoles.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRgFamilyRoles.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testRgFamilyRoles.getUniqueRelation()).isEqualTo(UPDATED_UNIQUE_RELATION);
        assertThat(testRgFamilyRoles.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testRgFamilyRoles.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testRgFamilyRoles.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testRgFamilyRoles.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingRgFamilyRoles() throws Exception {
        int databaseSizeBeforeUpdate = rgFamilyRolesRepository.findAll().size();

        // Create the RgFamilyRoles

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRgFamilyRolesMockMvc.perform(put("/api/rg-family-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rgFamilyRoles)))
            .andExpect(status().isCreated());

        // Validate the RgFamilyRoles in the database
        List<RgFamilyRoles> rgFamilyRolesList = rgFamilyRolesRepository.findAll();
        assertThat(rgFamilyRolesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRgFamilyRoles() throws Exception {
        // Initialize the database
        rgFamilyRolesRepository.saveAndFlush(rgFamilyRoles);
        int databaseSizeBeforeDelete = rgFamilyRolesRepository.findAll().size();

        // Get the rgFamilyRoles
        restRgFamilyRolesMockMvc.perform(delete("/api/rg-family-roles/{id}", rgFamilyRoles.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RgFamilyRoles> rgFamilyRolesList = rgFamilyRolesRepository.findAll();
        assertThat(rgFamilyRolesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RgFamilyRoles.class);
        RgFamilyRoles rgFamilyRoles1 = new RgFamilyRoles();
        rgFamilyRoles1.setId(1L);
        RgFamilyRoles rgFamilyRoles2 = new RgFamilyRoles();
        rgFamilyRoles2.setId(rgFamilyRoles1.getId());
        assertThat(rgFamilyRoles1).isEqualTo(rgFamilyRoles2);
        rgFamilyRoles2.setId(2L);
        assertThat(rgFamilyRoles1).isNotEqualTo(rgFamilyRoles2);
        rgFamilyRoles1.setId(null);
        assertThat(rgFamilyRoles1).isNotEqualTo(rgFamilyRoles2);
    }
}
