package com.infostudio.ba.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A OgOrgWorkPlaces.
 */
@Entity
@Table(name = "og_org_work_places")
public class OgOrgWorkPlaces implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @OneToOne
    @JoinColumn(name = "id_organization")
    private OgOrganizations idOrganization;

    @OneToOne
    @JoinColumn(name = "id_work_place")
    private OgWorkPlaces idWorkPlace;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public OgOrgWorkPlaces createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public OgOrgWorkPlaces createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public OgOrgWorkPlaces updatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
        return this;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public OgOrgWorkPlaces updatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public OgOrganizations getIdOrganization() {
        return idOrganization;
    }

    public OgOrgWorkPlaces idOrganization(OgOrganizations ogOrganizations) {
        this.idOrganization = ogOrganizations;
        return this;
    }

    public void setIdOrganization(OgOrganizations ogOrganizations) {
        this.idOrganization = ogOrganizations;
    }

    public OgWorkPlaces getIdWorkPlace() {
        return idWorkPlace;
    }

    public OgOrgWorkPlaces idWorkPlace(OgWorkPlaces ogWorkPlaces) {
        this.idWorkPlace = ogWorkPlaces;
        return this;
    }

    public void setIdWorkPlace(OgWorkPlaces ogWorkPlaces) {
        this.idWorkPlace = ogWorkPlaces;
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
        OgOrgWorkPlaces ogOrgWorkPlaces = (OgOrgWorkPlaces) o;
        if (ogOrgWorkPlaces.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ogOrgWorkPlaces.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OgOrgWorkPlaces{" +
            "id=" + getId() +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedBy='" + getUpdatedBy() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
