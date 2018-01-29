package com.infostudio.ba.service.mapper;

import com.infostudio.ba.domain.*;
import com.infostudio.ba.service.dto.OgOrganizationsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OgOrganizations and its DTO OgOrganizationsDTO.
 */
@Mapper(componentModel = "spring", uses = {OgOrgTypesMapper.class, LeLegalEntitiesMapper.class})
public interface OgOrganizationsMapper extends EntityMapper<OgOrganizationsDTO, OgOrganizations> {

    @Mapping(source = "idOrganizationType.id", target = "idOrganizationTypeId")
    @Mapping(source = "idParent.id", target = "idParentId")
    @Mapping(source = "idLegalEntity.id", target = "idLegalEntityId")
    OgOrganizationsDTO toDto(OgOrganizations ogOrganizations);

    @Mapping(source = "idOrganizationTypeId", target = "idOrganizationType")
    @Mapping(source = "idParentId", target = "idParent")
    @Mapping(source = "idLegalEntityId", target = "idLegalEntity")
    OgOrganizations toEntity(OgOrganizationsDTO ogOrganizationsDTO);

    default OgOrganizations fromId(Long id) {
        if (id == null) {
            return null;
        }
        OgOrganizations ogOrganizations = new OgOrganizations();
        ogOrganizations.setId(id);
        return ogOrganizations;
    }
}
