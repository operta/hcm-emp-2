package com.infostudio.ba.web.rest;

import com.infostudio.ba.HcmEmpApp;

import com.infostudio.ba.domain.EmEmpRewards;
import com.infostudio.ba.repository.EmEmpRewardsRepository;
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
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.infostudio.ba.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EmEmpRewardsResource REST controller.
 *
 * @see EmEmpRewardsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HcmEmpApp.class)
public class EmEmpRewardsResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_REWARD = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_REWARD = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_AMOUNT = 1;
    private static final Integer UPDATED_AMOUNT = 2;

    private static final String DEFAULT_REWARDED_BY = "AAAAAAAAAA";
    private static final String UPDATED_REWARDED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPDATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private EmEmpRewardsRepository emEmpRewardsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmEmpRewardsMockMvc;

    private EmEmpRewards emEmpRewards;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmEmpRewardsResource emEmpRewardsResource = new EmEmpRewardsResource(emEmpRewardsRepository);
        this.restEmEmpRewardsMockMvc = MockMvcBuilders.standaloneSetup(emEmpRewardsResource)
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
    public static EmEmpRewards createEntity(EntityManager em) {
        EmEmpRewards emEmpRewards = new EmEmpRewards()
            .description(DEFAULT_DESCRIPTION)
            .dateReward(DEFAULT_DATE_REWARD)
            .amount(DEFAULT_AMOUNT)
            .rewardedBy(DEFAULT_REWARDED_BY)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedBy(DEFAULT_UPDATED_BY)
            .updatedAt(DEFAULT_UPDATED_AT);
        return emEmpRewards;
    }

    @Before
    public void initTest() {
        emEmpRewards = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmEmpRewards() throws Exception {
        int databaseSizeBeforeCreate = emEmpRewardsRepository.findAll().size();

        // Create the EmEmpRewards
        restEmEmpRewardsMockMvc.perform(post("/api/em-emp-rewards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpRewards)))
            .andExpect(status().isCreated());

        // Validate the EmEmpRewards in the database
        List<EmEmpRewards> emEmpRewardsList = emEmpRewardsRepository.findAll();
        assertThat(emEmpRewardsList).hasSize(databaseSizeBeforeCreate + 1);
        EmEmpRewards testEmEmpRewards = emEmpRewardsList.get(emEmpRewardsList.size() - 1);
        assertThat(testEmEmpRewards.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testEmEmpRewards.getDateReward()).isEqualTo(DEFAULT_DATE_REWARD);
        assertThat(testEmEmpRewards.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testEmEmpRewards.getRewardedBy()).isEqualTo(DEFAULT_REWARDED_BY);
        assertThat(testEmEmpRewards.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmEmpRewards.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testEmEmpRewards.getUpdatedBy()).isEqualTo(DEFAULT_UPDATED_BY);
        assertThat(testEmEmpRewards.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createEmEmpRewardsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emEmpRewardsRepository.findAll().size();

        // Create the EmEmpRewards with an existing ID
        emEmpRewards.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmEmpRewardsMockMvc.perform(post("/api/em-emp-rewards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpRewards)))
            .andExpect(status().isBadRequest());

        // Validate the EmEmpRewards in the database
        List<EmEmpRewards> emEmpRewardsList = emEmpRewardsRepository.findAll();
        assertThat(emEmpRewardsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEmEmpRewards() throws Exception {
        // Initialize the database
        emEmpRewardsRepository.saveAndFlush(emEmpRewards);

        // Get all the emEmpRewardsList
        restEmEmpRewardsMockMvc.perform(get("/api/em-emp-rewards?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emEmpRewards.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].dateReward").value(hasItem(DEFAULT_DATE_REWARD.toString())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)))
            .andExpect(jsonPath("$.[*].rewardedBy").value(hasItem(DEFAULT_REWARDED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedBy").value(hasItem(DEFAULT_UPDATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getEmEmpRewards() throws Exception {
        // Initialize the database
        emEmpRewardsRepository.saveAndFlush(emEmpRewards);

        // Get the emEmpRewards
        restEmEmpRewardsMockMvc.perform(get("/api/em-emp-rewards/{id}", emEmpRewards.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emEmpRewards.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.dateReward").value(DEFAULT_DATE_REWARD.toString()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT))
            .andExpect(jsonPath("$.rewardedBy").value(DEFAULT_REWARDED_BY.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedBy").value(DEFAULT_UPDATED_BY.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmEmpRewards() throws Exception {
        // Get the emEmpRewards
        restEmEmpRewardsMockMvc.perform(get("/api/em-emp-rewards/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmEmpRewards() throws Exception {
        // Initialize the database
        emEmpRewardsRepository.saveAndFlush(emEmpRewards);
        int databaseSizeBeforeUpdate = emEmpRewardsRepository.findAll().size();

        // Update the emEmpRewards
        EmEmpRewards updatedEmEmpRewards = emEmpRewardsRepository.findOne(emEmpRewards.getId());
        // Disconnect from session so that the updates on updatedEmEmpRewards are not directly saved in db
        em.detach(updatedEmEmpRewards);
        updatedEmEmpRewards
            .description(UPDATED_DESCRIPTION)
            .dateReward(UPDATED_DATE_REWARD)
            .amount(UPDATED_AMOUNT)
            .rewardedBy(UPDATED_REWARDED_BY)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .updatedBy(UPDATED_UPDATED_BY)
            .updatedAt(UPDATED_UPDATED_AT);

        restEmEmpRewardsMockMvc.perform(put("/api/em-emp-rewards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmEmpRewards)))
            .andExpect(status().isOk());

        // Validate the EmEmpRewards in the database
        List<EmEmpRewards> emEmpRewardsList = emEmpRewardsRepository.findAll();
        assertThat(emEmpRewardsList).hasSize(databaseSizeBeforeUpdate);
        EmEmpRewards testEmEmpRewards = emEmpRewardsList.get(emEmpRewardsList.size() - 1);
        assertThat(testEmEmpRewards.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testEmEmpRewards.getDateReward()).isEqualTo(UPDATED_DATE_REWARD);
        assertThat(testEmEmpRewards.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testEmEmpRewards.getRewardedBy()).isEqualTo(UPDATED_REWARDED_BY);
        assertThat(testEmEmpRewards.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmEmpRewards.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testEmEmpRewards.getUpdatedBy()).isEqualTo(UPDATED_UPDATED_BY);
        assertThat(testEmEmpRewards.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingEmEmpRewards() throws Exception {
        int databaseSizeBeforeUpdate = emEmpRewardsRepository.findAll().size();

        // Create the EmEmpRewards

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmEmpRewardsMockMvc.perform(put("/api/em-emp-rewards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emEmpRewards)))
            .andExpect(status().isCreated());

        // Validate the EmEmpRewards in the database
        List<EmEmpRewards> emEmpRewardsList = emEmpRewardsRepository.findAll();
        assertThat(emEmpRewardsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmEmpRewards() throws Exception {
        // Initialize the database
        emEmpRewardsRepository.saveAndFlush(emEmpRewards);
        int databaseSizeBeforeDelete = emEmpRewardsRepository.findAll().size();

        // Get the emEmpRewards
        restEmEmpRewardsMockMvc.perform(delete("/api/em-emp-rewards/{id}", emEmpRewards.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmEmpRewards> emEmpRewardsList = emEmpRewardsRepository.findAll();
        assertThat(emEmpRewardsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmEmpRewards.class);
        EmEmpRewards emEmpRewards1 = new EmEmpRewards();
        emEmpRewards1.setId(1L);
        EmEmpRewards emEmpRewards2 = new EmEmpRewards();
        emEmpRewards2.setId(emEmpRewards1.getId());
        assertThat(emEmpRewards1).isEqualTo(emEmpRewards2);
        emEmpRewards2.setId(2L);
        assertThat(emEmpRewards1).isNotEqualTo(emEmpRewards2);
        emEmpRewards1.setId(null);
        assertThat(emEmpRewards1).isNotEqualTo(emEmpRewards2);
    }
}
