package com.infostudio.ba.service.mapper;

import com.infostudio.ba.domain.*;
import com.infostudio.ba.service.dto.OgOrgTypesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OgOrgTypes and its DTO OgOrgTypesDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface OgOrgTypesMapper extends EntityMapper<OgOrgTypesDTO, OgOrgTypes> {



    default OgOrgTypes fromId(Long id) {
        if (id == null) {
            return null;
        }
        OgOrgTypes ogOrgTypes = new OgOrgTypes();
        ogOrgTypes.setId(id);
        return ogOrgTypes;
    }
}
