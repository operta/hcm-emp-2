package com.infostudio.ba.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A EmEmployees.
 */
@Entity
@Table(name = "em_employees")
public class EmEmployees implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "surname")
    private String surname;

    @Column(name = "maiden_name")
    private String maidenName;

    @Column(name = "disability_degree")
    private Integer disabilityDegree;

    @Column(name = "ethnic_group")
    private String ethnicGroup;

    @Column(name = "gender")
    private String gender;

    @Column(name = "residential_situation")
    private String residentialSituation;

    @Column(name = "marital_status")
    private String maritalStatus;

    @Column(name = "blood_group")
    private String bloodGroup;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "hire_date")
    private LocalDate hireDate;

    @Column(name = "ssn")
    private String ssn;

    @Column(name = "tax_number")
    private String taxNumber;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "personal_phone_number")
    private String personalPhoneNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @OneToOne
    @JoinColumn(name = "id_qualification")
    private RgQualifications idQualification;

    @OneToOne
    @JoinColumn(name = "id_employment_type")
    private EmEmpTypes idEmploymentType;

    @OneToOne
    @JoinColumn(name = "id_legal_entity")
    private LeLegalEntities idLegalEntity;

    @OneToOne
    @JoinColumn(name = "id_status")
    private EmStatuses idStatus;

    @OneToOne
    @JoinColumn(name = "id_user")
    private User idUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    public String getPersonalPhoneNumber() {
        return personalPhoneNumber;
    }

    public void setPersonalPhoneNumber(String personalPhoneNumber) {
        this.personalPhoneNumber = personalPhoneNumber;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public EmEmployees code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public EmEmployees name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMiddleName() {
        return middleName;
    }

    public EmEmployees middleName(String middleName) {
        this.middleName = middleName;
        return this;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getSurname() {
        return surname;
    }

    public EmEmployees surname(String surname) {
        this.surname = surname;
        return this;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getMaidenName() {
        return maidenName;
    }

    public EmEmployees maidenName(String maidenName) {
        this.maidenName = maidenName;
        return this;
    }

    public void setMaidenName(String maidenName) {
        this.maidenName = maidenName;
    }

    public Integer getDisabilityDegree() {
        return disabilityDegree;
    }

    public EmEmployees disabilityDegree(Integer disabilityDegree) {
        this.disabilityDegree = disabilityDegree;
        return this;
    }

    public void setDisabilityDegree(Integer disabilityDegree) {
        this.disabilityDegree = disabilityDegree;
    }

    public String getEthnicGroup() {
        return ethnicGroup;
    }

    public EmEmployees ethnicGroup(String ethnicGroup) {
        this.ethnicGroup = ethnicGroup;
        return this;
    }

    public void setEthnicGroup(String ethnicGroup) {
        this.ethnicGroup = ethnicGroup;
    }

    public String getGender() {
        return gender;
    }

    public EmEmployees gender(String gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getResidentialSituation() {
        return residentialSituation;
    }

    public EmEmployees residentialSituation(String residentialSituation) {
        this.residentialSituation = residentialSituation;
        return this;
    }

    public void setResidentialSituation(String residentialSituation) {
        this.residentialSituation = residentialSituation;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public EmEmployees maritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
        return this;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public EmEmployees bloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
        return this;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public EmEmployees dateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
        return this;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public LocalDate getHireDate() {
        return hireDate;
    }

    public EmEmployees hireDate(LocalDate hireDate) {
        this.hireDate = hireDate;
        return this;
    }

    public void setHireDate(LocalDate hireDate) {
        this.hireDate = hireDate;
    }

    public String getSsn() {
        return ssn;
    }

    public EmEmployees ssn(String ssn) {
        this.ssn = ssn;
        return this;
    }

    public void setSsn(String ssn) {
        this.ssn = ssn;
    }

    public String getTaxNumber() {
        return taxNumber;
    }

    public EmEmployees taxNumber(String taxNumber) {
        this.taxNumber = taxNumber;
        return this;
    }

    public void setTaxNumber(String taxNumber) {
        this.taxNumber = taxNumber;
    }

    public String getImagePath() {
        return imagePath;
    }

    public EmEmployees imagePath(String imagePath) {
        this.imagePath = imagePath;
        return this;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public EmEmployees phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public EmEmployees email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public EmEmployees createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public EmEmployees createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public EmEmployees updatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
        return this;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public EmEmployees updatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public RgQualifications getIdQualification() {
        return idQualification;
    }

    public EmEmployees idQualification(RgQualifications rgQualifications) {
        this.idQualification = rgQualifications;
        return this;
    }

    public void setIdQualification(RgQualifications rgQualifications) {
        this.idQualification = rgQualifications;
    }

    public EmEmpTypes getIdEmploymentType() {
        return idEmploymentType;
    }

    public EmEmployees idEmploymentType(EmEmpTypes emEmpTypes) {
        this.idEmploymentType = emEmpTypes;
        return this;
    }

    public void setIdEmploymentType(EmEmpTypes emEmpTypes) {
        this.idEmploymentType = emEmpTypes;
    }

    public LeLegalEntities getIdLegalEntity() {
        return idLegalEntity;
    }

    public EmEmployees idLegalEntity(LeLegalEntities leLegalEntities) {
        this.idLegalEntity = leLegalEntities;
        return this;
    }

    public void setIdLegalEntity(LeLegalEntities leLegalEntities) {
        this.idLegalEntity = leLegalEntities;
    }

    public EmStatuses getIdStatus() {
        return idStatus;
    }

    public EmEmployees idStatus(EmStatuses emStatuses) {
        this.idStatus = emStatuses;
        return this;
    }

    public void setIdStatus(EmStatuses emStatuses) {
        this.idStatus = emStatuses;
    }

    public User getIdUser() {
        return idUser;
    }

    public EmEmployees idUser(User user) {
        this.idUser = user;
        return this;
    }

    public void setIdUser(User user) {
        this.idUser = user;
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
        EmEmployees emEmployees = (EmEmployees) o;
        if (emEmployees.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), emEmployees.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EmEmployees{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", name='" + getName() + "'" +
            ", middleName='" + getMiddleName() + "'" +
            ", surname='" + getSurname() + "'" +
            ", maidenName='" + getMaidenName() + "'" +
            ", disabilityDegree=" + getDisabilityDegree() +
            ", ethnicGroup='" + getEthnicGroup() + "'" +
            ", gender='" + getGender() + "'" +
            ", residentialSituation='" + getResidentialSituation() + "'" +
            ", maritalStatus='" + getMaritalStatus() + "'" +
            ", bloodGroup='" + getBloodGroup() + "'" +
            ", dateOfBirth='" + getDateOfBirth() + "'" +
            ", hireDate='" + getHireDate() + "'" +
            ", ssn='" + getSsn() + "'" +
            ", taxNumber='" + getTaxNumber() + "'" +
            ", imagePath='" + getImagePath() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", email='" + getEmail() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedBy='" + getUpdatedBy() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
