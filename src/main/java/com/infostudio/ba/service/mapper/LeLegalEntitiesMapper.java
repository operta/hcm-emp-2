package com.infostudio.ba.service.mapper;

import com.infostudio.ba.domain.*;
import com.infostudio.ba.service.dto.LeLegalEntitiesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity LeLegalEntities and its DTO LeLegalEntitiesDTO.
 */
@Mapper(componentModel = "spring", uses = {LeLegalEntityTypesMapper.class, RgRegionsMapper.class})
public interface LeLegalEntitiesMapper extends EntityMapper<LeLegalEntitiesDTO, LeLegalEntities> {

    @Mapping(source = "idEntityType.id", target = "idEntityTypeId")
    @Mapping(source = "region.id", target = "regionId")
    LeLegalEntitiesDTO toDto(LeLegalEntities leLegalEntities);

    @Mapping(source = "idEntityTypeId", target = "idEntityType")
    @Mapping(source = "regionId", target = "region")
    LeLegalEntities toEntity(LeLegalEntitiesDTO leLegalEntitiesDTO);

    default LeLegalEntities fromId(Long id) {
        if (id == null) {
            return null;
        }
        LeLegalEntities leLegalEntities = new LeLegalEntities();
        leLegalEntities.setId(id);
        return leLegalEntities;
    }
}
