package com.infostudio.ba.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DmDocumentLinks.
 */
@Entity
@Table(name = "dm_document_links")
public class DmDocumentLinks implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "document_name")
    private String documentName;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "uri")
    private String uri;

    @Lob
    @Column(name = "document_blob")
    private byte[] documentBlob;

    @Column(name = "document_blob_content_type")
    private String documentBlobContentType;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_at")
    private Instant updatedAt;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDocumentName() {
        return documentName;
    }

    public DmDocumentLinks documentName(String documentName) {
        this.documentName = documentName;
        return this;
    }

    public void setDocumentName(String documentName) {
        this.documentName = documentName;
    }

    public String getFileName() {
        return fileName;
    }

    public DmDocumentLinks fileName(String fileName) {
        this.fileName = fileName;
        return this;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFilePath() {
        return filePath;
    }

    public DmDocumentLinks filePath(String filePath) {
        this.filePath = filePath;
        return this;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getUri() {
        return uri;
    }

    public DmDocumentLinks uri(String uri) {
        this.uri = uri;
        return this;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public byte[] getDocumentBlob() {
        return documentBlob;
    }

    public DmDocumentLinks documentBlob(byte[] documentBlob) {
        this.documentBlob = documentBlob;
        return this;
    }

    public void setDocumentBlob(byte[] documentBlob) {
        this.documentBlob = documentBlob;
    }

    public String getDocumentBlobContentType() {
        return documentBlobContentType;
    }

    public DmDocumentLinks documentBlobContentType(String documentBlobContentType) {
        this.documentBlobContentType = documentBlobContentType;
        return this;
    }

    public void setDocumentBlobContentType(String documentBlobContentType) {
        this.documentBlobContentType = documentBlobContentType;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public DmDocumentLinks createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public DmDocumentLinks createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public DmDocumentLinks updatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
        return this;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public DmDocumentLinks updatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
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
        DmDocumentLinks dmDocumentLinks = (DmDocumentLinks) o;
        if (dmDocumentLinks.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dmDocumentLinks.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DmDocumentLinks{" +
            "id=" + getId() +
            ", documentName='" + getDocumentName() + "'" +
            ", fileName='" + getFileName() + "'" +
            ", filePath='" + getFilePath() + "'" +
            ", uri='" + getUri() + "'" +
            ", documentBlob='" + getDocumentBlob() + "'" +
            ", documentBlobContentType='" + getDocumentBlobContentType() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedBy='" + getUpdatedBy() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
