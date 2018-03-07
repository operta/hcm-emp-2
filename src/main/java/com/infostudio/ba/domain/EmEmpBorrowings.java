package com.infostudio.ba.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A EmEmpBorrowings.
 */
@Entity
@Table(name = "em_emp_borrowings")
public class EmEmpBorrowings implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "serial_number")
    private String serialNumber;

    @NotNull
    @Column(name = "date_from", nullable = false)
    private LocalDate dateFrom;

    @Column(name = "charged_by")
    private String chargedBy;

    @Column(name = "date_to")
    private LocalDate dateTo;

    @Column(name = "discharged_by")
    private String dischargedBy;

    @Column(name = "damage")
    private String damage;

    @Column(name = "damaged_by_employee")
    private String damagedByEmployee;

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
    @JoinColumn(name = "id_borrowing")
    private EmBorrowingTypes idBorrowing;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public EmEmpBorrowings title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public EmEmpBorrowings description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public EmEmpBorrowings serialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
        return this;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public LocalDate getDateFrom() {
        return dateFrom;
    }

    public EmEmpBorrowings dateFrom(LocalDate dateFrom) {
        this.dateFrom = dateFrom;
        return this;
    }

    public void setDateFrom(LocalDate dateFrom) {
        this.dateFrom = dateFrom;
    }

    public String getChargedBy() {
        return chargedBy;
    }

    public EmEmpBorrowings chargedBy(String chargedBy) {
        this.chargedBy = chargedBy;
        return this;
    }

    public void setChargedBy(String chargedBy) {
        this.chargedBy = chargedBy;
    }

    public LocalDate getDateTo() {
        return dateTo;
    }

    public EmEmpBorrowings dateTo(LocalDate dateTo) {
        this.dateTo = dateTo;
        return this;
    }

    public void setDateTo(LocalDate dateTo) {
        this.dateTo = dateTo;
    }

    public String getDischargedBy() {
        return dischargedBy;
    }

    public EmEmpBorrowings dischargedBy(String dischargedBy) {
        this.dischargedBy = dischargedBy;
        return this;
    }

    public void setDischargedBy(String dischargedBy) {
        this.dischargedBy = dischargedBy;
    }

    public String getDamage() {
        return damage;
    }

    public EmEmpBorrowings damage(String damage) {
        this.damage = damage;
        return this;
    }

    public void setDamage(String damage) {
        this.damage = damage;
    }

    public String getDamagedByEmployee() {
        return damagedByEmployee;
    }

    public EmEmpBorrowings damagedByEmployee(String damagedByEmployee) {
        this.damagedByEmployee = damagedByEmployee;
        return this;
    }

    public void setDamagedByEmployee(String damagedByEmployee) {
        this.damagedByEmployee = damagedByEmployee;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public EmEmpBorrowings createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public EmEmpBorrowings createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public EmEmpBorrowings updatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
        return this;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public EmEmpBorrowings updatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public EmEmployees getIdEmployee() {
        return idEmployee;
    }

    public EmEmpBorrowings idEmployee(EmEmployees emEmployees) {
        this.idEmployee = emEmployees;
        return this;
    }

    public void setIdEmployee(EmEmployees emEmployees) {
        this.idEmployee = emEmployees;
    }

    public EmBorrowingTypes getIdBorrowing() {
        return idBorrowing;
    }

    public EmEmpBorrowings idBorrowing(EmBorrowingTypes emBorrowingTypes) {
        this.idBorrowing = emBorrowingTypes;
        return this;
    }

    public void setIdBorrowing(EmBorrowingTypes emBorrowingTypes) {
        this.idBorrowing = emBorrowingTypes;
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
        EmEmpBorrowings emEmpBorrowings = (EmEmpBorrowings) o;
        if (emEmpBorrowings.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), emEmpBorrowings.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EmEmpBorrowings{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", serialNumber='" + getSerialNumber() + "'" +
            ", dateFrom='" + getDateFrom() + "'" +
            ", chargedBy='" + getChargedBy() + "'" +
            ", dateTo='" + getDateTo() + "'" +
            ", dischargedBy='" + getDischargedBy() + "'" +
            ", damage='" + getDamage() + "'" +
            ", damagedByEmployee='" + getDamagedByEmployee() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedBy='" + getUpdatedBy() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
