package com.infostudio.ba.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A EmEmpInjuries.
 */
@Entity
@Table(name = "em_emp_injuries")
public class EmEmpInjuries implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "description")
    private String description;

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
    @JoinColumn(name = "id_injury")
    private EmInjuryTypes idInjury;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public EmEmpInjuries description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public EmEmpInjuries createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public EmEmpInjuries createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public EmEmpInjuries updatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
        return this;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public EmEmpInjuries updatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public EmEmployees getIdEmployee() {
        return idEmployee;
    }

    public EmEmpInjuries idEmployee(EmEmployees emEmployees) {
        this.idEmployee = emEmployees;
        return this;
    }

    public void setIdEmployee(EmEmployees emEmployees) {
        this.idEmployee = emEmployees;
    }

    public EmInjuryTypes getIdInjury() {
        return idInjury;
    }

    public EmEmpInjuries idInjury(EmInjuryTypes emInjuryTypes) {
        this.idInjury = emInjuryTypes;
        return this;
    }

    public void setIdInjury(EmInjuryTypes emInjuryTypes) {
        this.idInjury = emInjuryTypes;
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
        EmEmpInjuries emEmpInjuries = (EmEmpInjuries) o;
        if (emEmpInjuries.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), emEmpInjuries.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EmEmpInjuries{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedBy='" + getUpdatedBy() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
