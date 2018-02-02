package com.infostudio.ba.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A LeLegalEntities.
 */
@Entity
@Table(name = "le_legal_entities")
public class LeLegalEntities implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "id_number")
    private String idNumber;

    @Column(name = "duty_number")
    private String dutyNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "postal_number")
    private String postalNumber;

    @OneToOne
    @JoinColumn(name = "id_entity_type")
    private LeLegalEntityTypes idEntityType;

    @OneToOne
    @JoinColumn(name = "region")
    private RgRegions region;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public LeLegalEntities code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public LeLegalEntities name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public LeLegalEntities createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public LeLegalEntities createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public LeLegalEntities updatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
        return this;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public LeLegalEntities updatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public LeLegalEntities idNumber(String idNumber) {
        this.idNumber = idNumber;
        return this;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public String getDutyNumber() {
        return dutyNumber;
    }

    public LeLegalEntities dutyNumber(String dutyNumber) {
        this.dutyNumber = dutyNumber;
        return this;
    }

    public void setDutyNumber(String dutyNumber) {
        this.dutyNumber = dutyNumber;
    }

    public String getAddress() {
        return address;
    }

    public LeLegalEntities address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostalNumber() {
        return postalNumber;
    }

    public LeLegalEntities postalNumber(String postalNumber) {
        this.postalNumber = postalNumber;
        return this;
    }

    public void setPostalNumber(String postalNumber) {
        this.postalNumber = postalNumber;
    }

    public LeLegalEntityTypes getIdEntityType() {
        return idEntityType;
    }

    public LeLegalEntities idEntityType(LeLegalEntityTypes leLegalEntityTypes) {
        this.idEntityType = leLegalEntityTypes;
        return this;
    }

    public void setIdEntityType(LeLegalEntityTypes leLegalEntityTypes) {
        this.idEntityType = leLegalEntityTypes;
    }

    public RgRegions getRegion() {
        return region;
    }

    public LeLegalEntities region(RgRegions rgRegions) {
        this.region = rgRegions;
        return this;
    }

    public void setRegion(RgRegions rgRegions) {
        this.region = rgRegions;
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
        LeLegalEntities leLegalEntities = (LeLegalEntities) o;
        if (leLegalEntities.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), leLegalEntities.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LeLegalEntities{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", name='" + getName() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedBy='" + getUpdatedBy() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            ", idNumber='" + getIdNumber() + "'" +
            ", dutyNumber='" + getDutyNumber() + "'" +
            ", address='" + getAddress() + "'" +
            ", postalNumber='" + getPostalNumber() + "'" +
            "}";
    }
}
