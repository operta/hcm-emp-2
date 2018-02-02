package com.infostudio.ba.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A EmEmpOrgWorkPlaces.
 */
@Entity
@Table(name = "em_emp_org_work_places")
public class EmEmpOrgWorkPlaces implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "date_from", nullable = false)
    private LocalDate dateFrom;

    @Column(name = "date_to")
    private LocalDate dateTo;

    @Column(name = "work_history_coefficient")
    private Integer workHistoryCoefficient;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @OneToOne
    @JoinColumn(name = "id_employee")
    private EmEmployees idEmployee;

    @OneToOne
    @JoinColumn(name = "id_contract_type")
    private EmContractTypes idContractType;

    @OneToOne
    @JoinColumn(name = "id_org_work_place")
    private OgOrgWorkPlaces idOrgWorkPlace;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateFrom() {
        return dateFrom;
    }

    public EmEmpOrgWorkPlaces dateFrom(LocalDate dateFrom) {
        this.dateFrom = dateFrom;
        return this;
    }

    public void setDateFrom(LocalDate dateFrom) {
        this.dateFrom = dateFrom;
    }

    public LocalDate getDateTo() {
        return dateTo;
    }

    public EmEmpOrgWorkPlaces dateTo(LocalDate dateTo) {
        this.dateTo = dateTo;
        return this;
    }

    public void setDateTo(LocalDate dateTo) {
        this.dateTo = dateTo;
    }

    public Integer getWorkHistoryCoefficient() {
        return workHistoryCoefficient;
    }

    public EmEmpOrgWorkPlaces workHistoryCoefficient(Integer workHistoryCoefficient) {
        this.workHistoryCoefficient = workHistoryCoefficient;
        return this;
    }

    public void setWorkHistoryCoefficient(Integer workHistoryCoefficient) {
        this.workHistoryCoefficient = workHistoryCoefficient;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public EmEmpOrgWorkPlaces createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public EmEmpOrgWorkPlaces createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public EmEmpOrgWorkPlaces updatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
        return this;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public EmEmpOrgWorkPlaces updatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public EmEmployees getIdEmployee() {
        return idEmployee;
    }

    public EmEmpOrgWorkPlaces idEmployee(EmEmployees emEmployees) {
        this.idEmployee = emEmployees;
        return this;
    }

    public void setIdEmployee(EmEmployees emEmployees) {
        this.idEmployee = emEmployees;
    }

    public EmContractTypes getIdContractType() {
        return idContractType;
    }

    public EmEmpOrgWorkPlaces idContractType(EmContractTypes emContractTypes) {
        this.idContractType = emContractTypes;
        return this;
    }

    public void setIdContractType(EmContractTypes emContractTypes) {
        this.idContractType = emContractTypes;
    }

    public OgOrgWorkPlaces getIdOrgWorkPlace() {
        return idOrgWorkPlace;
    }

    public EmEmpOrgWorkPlaces idOrgWorkPlace(OgOrgWorkPlaces ogOrgWorkPlaces) {
        this.idOrgWorkPlace = ogOrgWorkPlaces;
        return this;
    }

    public void setIdOrgWorkPlace(OgOrgWorkPlaces ogOrgWorkPlaces) {
        this.idOrgWorkPlace = ogOrgWorkPlaces;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        EmEmpOrgWorkPlaces emEmpOrgWorkPlaces = (EmEmpOrgWorkPlaces) o;
        if (emEmpOrgWorkPlaces.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), emEmpOrgWorkPlaces.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EmEmpOrgWorkPlaces{" +
            "id=" + getId() +
            ", dateFrom='" + getDateFrom() + "'" +
            ", dateTo='" + getDateTo() + "'" +
            ", workHistoryCoefficient=" + getWorkHistoryCoefficient() +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedBy='" + getUpdatedBy() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
