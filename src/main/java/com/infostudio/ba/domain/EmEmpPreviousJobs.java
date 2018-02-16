package com.infostudio.ba.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A EmEmpPreviousJobs.
 */
@Entity
@Table(name = "em_emp_previous_jobs")
public class EmEmpPreviousJobs implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "company", nullable = false)
    private String company;

    @Column(name = "position")
    private String position;

    @NotNull
    @Column(name = "date_from", nullable = false)
    private LocalDate dateFrom;

    @NotNull
    @Column(name = "date_to", nullable = false)
    private LocalDate dateTo;

    @Column(name = "reason_of_leaving")
    private String reasonOfLeaving;

    @Column(name = "manager_position")
    private String managerPosition;

    @Column(name = "length_of_service_years")
    private Integer lengthOfServiceYears;

    @Column(name = "length_of_service_months")
    private Integer lengthOfServiceMonths;

    @Column(name = "length_of_service_days")
    private Integer lengthOfServiceDays;

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

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompany() {
        return company;
    }

    public EmEmpPreviousJobs company(String company) {
        this.company = company;
        return this;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getPosition() {
        return position;
    }

    public EmEmpPreviousJobs position(String position) {
        this.position = position;
        return this;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public LocalDate getDateFrom() {
        return dateFrom;
    }

    public EmEmpPreviousJobs dateFrom(LocalDate dateFrom) {
        this.dateFrom = dateFrom;
        return this;
    }

    public void setDateFrom(LocalDate dateFrom) {
        this.dateFrom = dateFrom;
    }

    public LocalDate getDateTo() {
        return dateTo;
    }

    public EmEmpPreviousJobs dateTo(LocalDate dateTo) {
        this.dateTo = dateTo;
        return this;
    }

    public void setDateTo(LocalDate dateTo) {
        this.dateTo = dateTo;
    }

    public String getReasonOfLeaving() {
        return reasonOfLeaving;
    }

    public EmEmpPreviousJobs reasonOfLeaving(String reasonOfLeaving) {
        this.reasonOfLeaving = reasonOfLeaving;
        return this;
    }

    public void setReasonOfLeaving(String reasonOfLeaving) {
        this.reasonOfLeaving = reasonOfLeaving;
    }

    public String getManagerPosition() {
        return managerPosition;
    }

    public EmEmpPreviousJobs managerPosition(String managerPosition) {
        this.managerPosition = managerPosition;
        return this;
    }

    public void setManagerPosition(String managerPosition) {
        this.managerPosition = managerPosition;
    }

    public Integer getLengthOfServiceYears() {
        return lengthOfServiceYears;
    }

    public EmEmpPreviousJobs lengthOfServiceYears(Integer lengthOfServiceYears) {
        this.lengthOfServiceYears = lengthOfServiceYears;
        return this;
    }

    public void setLengthOfServiceYears(Integer lengthOfServiceYears) {
        this.lengthOfServiceYears = lengthOfServiceYears;
    }

    public Integer getLengthOfServiceMonths() {
        return lengthOfServiceMonths;
    }

    public EmEmpPreviousJobs lengthOfServiceMonths(Integer lengthOfServiceMonths) {
        this.lengthOfServiceMonths = lengthOfServiceMonths;
        return this;
    }

    public void setLengthOfServiceMonths(Integer lengthOfServiceMonths) {
        this.lengthOfServiceMonths = lengthOfServiceMonths;
    }

    public Integer getLengthOfServiceDays() {
        return lengthOfServiceDays;
    }

    public EmEmpPreviousJobs lengthOfServiceDays(Integer lengthOfServiceDays) {
        this.lengthOfServiceDays = lengthOfServiceDays;
        return this;
    }

    public void setLengthOfServiceDays(Integer lengthOfServiceDays) {
        this.lengthOfServiceDays = lengthOfServiceDays;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public EmEmpPreviousJobs createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public EmEmpPreviousJobs createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public EmEmpPreviousJobs updatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
        return this;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public EmEmpPreviousJobs updatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public EmEmployees getIdEmployee() {
        return idEmployee;
    }

    public EmEmpPreviousJobs idEmployee(EmEmployees emEmployees) {
        this.idEmployee = emEmployees;
        return this;
    }

    public void setIdEmployee(EmEmployees emEmployees) {
        this.idEmployee = emEmployees;
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
        EmEmpPreviousJobs emEmpPreviousJobs = (EmEmpPreviousJobs) o;
        if (emEmpPreviousJobs.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), emEmpPreviousJobs.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EmEmpPreviousJobs{" +
            "id=" + getId() +
            ", company='" + getCompany() + "'" +
            ", position='" + getPosition() + "'" +
            ", dateFrom='" + getDateFrom() + "'" +
            ", dateTo='" + getDateTo() + "'" +
            ", reasonOfLeaving='" + getReasonOfLeaving() + "'" +
            ", managerPosition='" + getManagerPosition() + "'" +
            ", lengthOfServiceYears=" + getLengthOfServiceYears() +
            ", lengthOfServiceMonths=" + getLengthOfServiceMonths() +
            ", lengthOfServiceDays=" + getLengthOfServiceDays() +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedBy='" + getUpdatedBy() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
