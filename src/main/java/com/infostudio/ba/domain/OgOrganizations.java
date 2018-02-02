package com.infostudio.ba.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A OgOrganizations.
 */
@Entity
@Table(name = "og_organizations")
public class OgOrganizations implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

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
    @JoinColumn(name = "id_organization_type")
    private OgOrgTypes idOrganizationType;

    @OneToOne
    @JoinColumn(name = "id_parent")
    private OgOrganizations idParent;

    @OneToOne
    @JoinColumn(name = "id_legal_entity")
    private LeLegalEntities idLegalEntity;

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

    public OgOrganizations code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public OgOrganizations name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public OgOrganizations description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public OgOrganizations createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public OgOrganizations createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public OgOrganizations updatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
        return this;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public OgOrganizations updatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public OgOrgTypes getIdOrganizationType() {
        return idOrganizationType;
    }

    public OgOrganizations idOrganizationType(OgOrgTypes ogOrgTypes) {
        this.idOrganizationType = ogOrgTypes;
        return this;
    }

    public void setIdOrganizationType(OgOrgTypes ogOrgTypes) {
        this.idOrganizationType = ogOrgTypes;
    }

    public OgOrganizations getIdParent() {
        return idParent;
    }

    public OgOrganizations idParent(OgOrganizations ogOrganizations) {
        this.idParent = ogOrganizations;
        return this;
    }

    public void setIdParent(OgOrganizations ogOrganizations) {
        this.idParent = ogOrganizations;
    }

    public LeLegalEntities getIdLegalEntity() {
        return idLegalEntity;
    }

    public OgOrganizations idLegalEntity(LeLegalEntities leLegalEntities) {
        this.idLegalEntity = leLegalEntities;
        return this;
    }

    public void setIdLegalEntity(LeLegalEntities leLegalEntities) {
        this.idLegalEntity = leLegalEntities;
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
        OgOrganizations ogOrganizations = (OgOrganizations) o;
        if (ogOrganizations.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ogOrganizations.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OgOrganizations{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedBy='" + getUpdatedBy() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
