package com.infostudio.ba.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the LeLegalEntities entity.
 */
public class LeLegalEntitiesDTO implements Serializable {

    private Long id;

    private String code;

    private String name;

    private String createdBy;

    private Instant createdAt;

    private String updatedBy;

    private Instant updatedAt;

    private String idNumber;

    private String dutyNumber;

    private String address;

    private String postalNumber;

    private Long idEntityTypeId;

    private Long regionId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public String getDutyNumber() {
        return dutyNumber;
    }

    public void setDutyNumber(String dutyNumber) {
        this.dutyNumber = dutyNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostalNumber() {
        return postalNumber;
    }

    public void setPostalNumber(String postalNumber) {
        this.postalNumber = postalNumber;
    }

    public Long getIdEntityTypeId() {
        return idEntityTypeId;
    }

    public void setIdEntityTypeId(Long leLegalEntityTypesId) {
        this.idEntityTypeId = leLegalEntityTypesId;
    }

    public Long getRegionId() {
        return regionId;
    }

    public void setRegionId(Long rgRegionsId) {
        this.regionId = rgRegionsId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LeLegalEntitiesDTO leLegalEntitiesDTO = (LeLegalEntitiesDTO) o;
        if(leLegalEntitiesDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), leLegalEntitiesDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LeLegalEntitiesDTO{" +
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
