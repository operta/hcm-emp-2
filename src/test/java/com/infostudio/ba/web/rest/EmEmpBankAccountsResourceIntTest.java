package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmEmpBankAccounts;
import com.infostudio.ba.repository.EmEmpBankAccountsRepository;
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
 * Test class for the EmEmpBankAccountsResource REST controller.
 *
 * @see EmEmpBankAccountsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmEmpBankAccountsResourceIntTest {

    private static final String DEFAULT_ACCOUNT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private EmEmpBankAccountsRepository emEmpBankAccountsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmEmpBankAccountsMockMvc;

    private EmEmpBankAccounts emEmpBankAccounts;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmEmpBankAccountsResource emEmpBankAccountsResource = new EmEmpBankAccountsResource(emEmpBankAccountsRepository);
        this.restEmEmpBankAccountsMockMvc = MockMvcBuilders.standaloneSetup(emEmpBankAccountsResource)
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
    public static EmEmpBankAccounts createEntity(EntityManager em) {
        EmEmpBankAccounts emEmpBankAccounts = new EmEmpBankAccounts()
            .accountNumber(DEFAULT_ACCOUNT_NUMBER)
            .status(DEFAULT_STATUS)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emEmpBankAccounts;
    }

    @Before
    public void initTest() {
        emEmpBankAccounts = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmEmpBankAccounts() throws Exception {
        int databaseSizeBeforeCreate = emEmpBankAccountsRepository.findAll().size();

        // Create the EmEmpBankAccounts
        restEmEmpBankAccountsMockMvc.perform(post("/api/em-emp-bank-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpBankAccounts)))
            .andExpect(status().isCreated());

        // Validate the EmEmpBankAccounts in the database
        List<EmEmpBankAccounts> emEmpBankAccountsList = emEmpBankAccountsRepository.findAll();
        assertThat(emEmpBankAccountsList).hasSize(databaseSizeBeforeCreate + 1);
        EmEmpBankAccounts testEmEmpBankAccounts = emEmpBankAccountsList.get(emEmpBankAccountsList.size() - 1);
        assertThat(testEmEmpBankAccounts.getAccountNumber()).isEqualTo(DEFAULT_ACCOUNT_NUMBER);
        assertThat(testEmEmpBankAccounts.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testEmEmpBankAccounts.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmEmpBankAccounts.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmEmpBankAccounts.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmEmpBankAccounts.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmEmpBankAccountsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emEmpBankAccountsRepository.findAll().size();

        // Create the EmEmpBankAccounts with an existing ID
        emEmpBankAccounts.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmEmpBankAccountsMockMvc.perform(post("/api/em-emp-bank-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpBankAccounts)))
            .andExpect(status().isBadRequest());

        // Validate the EmEmpBankAccounts in the database
        List<EmEmpBankAccounts> emEmpBankAccountsList = emEmpBankAccountsRepository.findAll();
        assertThat(emEmpBankAccountsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkAccountNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = emEmpBankAccountsRepository.findAll().size();
        // set the field null
        emEmpBankAccounts.setAccountNumber(null);

        // Create the EmEmpBankAccounts, which fails.

        restEmEmpBankAccountsMockMvc.perform(post("/api/em-emp-bank-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpBankAccounts)))
            .andExpect(status().isBadRequest());

        List<EmEmpBankAccounts> emEmpBankAccountsList = emEmpBankAccountsRepository.findAll();
        assertThat(emEmpBankAccountsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmEmpBankAccounts() throws Exception {
        // Initialize the database
        emEmpBankAccountsRepository.saveAndFlush(emEmpBankAccounts);

        // Get all the emEmpBankAccountsList
        restEmEmpBankAccountsMockMvc.perform(get("/api/em-emp-bank-accounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emEmpBankAccounts.getId().intValue())))
            .andExpect(jsonPath("$.[*].accountNumber").value(hasItem(DEFAULT_ACCOUNT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getEmEmpBankAccounts() throws Exception {
        // Initialize the database
        emEmpBankAccountsRepository.saveAndFlush(emEmpBankAccounts);

        // Get the emEmpBankAccounts
        restEmEmpBankAccountsMockMvc.perform(get("/api/em-emp-bank-accounts/{id}", emEmpBankAccounts.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emEmpBankAccounts.getId().intValue()))
            .andExpect(jsonPath("$.accountNumber").value(DEFAULT_ACCOUNT_NUMBER.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmEmpBankAccounts() throws Exception {
        // Get the emEmpBankAccounts
        restEmEmpBankAccountsMockMvc.perform(get("/api/em-emp-bank-accounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmEmpBankAccounts() throws Exception {
        // Initialize the database
        emEmpBankAccountsRepository.saveAndFlush(emEmpBankAccounts);
        int databaseSizeBeforeUpdate = emEmpBankAccountsRepository.findAll().size();

        // Update the emEmpBankAccounts
        EmEmpBankAccounts updatedEmEmpBankAccounts = emEmpBankAccountsRepository.findOne(emEmpBankAccounts.getId());
        // Disconnect from session so that the updates on updatedEmEmpBankAccounts are not directly saved in db
        em.detach(updatedEmEmpBankAccounts);
        updatedEmEmpBankAccounts
            .accountNumber(UPDATED_ACCOUNT_NUMBER)
            .status(UPDATED_STATUS)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmEmpBankAccountsMockMvc.perform(put("/api/em-emp-bank-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmEmpBankAccounts)))
            .andExpect(status().isOk());

        // Validate the EmEmpBankAccounts in the database
        List<EmEmpBankAccounts> emEmpBankAccountsList = emEmpBankAccountsRepository.findAll();
        assertThat(emEmpBankAccountsList).hasSize(databaseSizeBeforeUpdate);
        EmEmpBankAccounts testEmEmpBankAccounts = emEmpBankAccountsList.get(emEmpBankAccountsList.size() - 1);
        assertThat(testEmEmpBankAccounts.getAccountNumber()).isEqualTo(UPDATED_ACCOUNT_NUMBER);
        assertThat(testEmEmpBankAccounts.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testEmEmpBankAccounts.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmEmpBankAccounts.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmEmpBankAccounts.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmEmpBankAccounts.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmEmpBankAccounts() throws Exception {
        int databaseSizeBeforeUpdate = emEmpBankAccountsRepository.findAll().size();

        // Create the EmEmpBankAccounts

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmEmpBankAccountsMockMvc.perform(put("/api/em-emp-bank-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpBankAccounts)))
            .andExpect(status().isCreated());

        // Validate the EmEmpBankAccounts in the database
        List<EmEmpBankAccounts> emEmpBankAccountsList = emEmpBankAccountsRepository.findAll();
        assertThat(emEmpBankAccountsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmEmpBankAccounts() throws Exception {
        // Initialize the database
        emEmpBankAccountsRepository.saveAndFlush(emEmpBankAccounts);
        int databaseSizeBeforeDelete = emEmpBankAccountsRepository.findAll().size();

        // Get the emEmpBankAccounts
        restEmEmpBankAccountsMockMvc.perform(delete("/api/em-emp-bank-accounts/{id}", emEmpBankAccounts.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmEmpBankAccounts> emEmpBankAccountsList = emEmpBankAccountsRepository.findAll();
        assertThat(emEmpBankAccountsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmEmpBankAccounts.class);
        EmEmpBankAccounts emEmpBankAccounts1 = new EmEmpBankAccounts();
        emEmpBankAccounts1.setId(1L);
        EmEmpBankAccounts emEmpBankAccounts2 = new EmEmpBankAccounts();
        emEmpBankAccounts2.setId(emEmpBankAccounts1.getId());
        assertThat(emEmpBankAccounts1).isEqualTo(emEmpBankAccounts2);
        emEmpBankAccounts2.setId(2L);
        assertThat(emEmpBankAccounts1).isNotEqualTo(emEmpBankAccounts2);
        emEmpBankAccounts1.setId(null);
        assertThat(emEmpBankAccounts1).isNotEqualTo(emEmpBankAccounts2);
    }
}
