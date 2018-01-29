package com.infostudio.ba.service.mapper;

import com.infostudio.ba.domain.*;
import com.infostudio.ba.service.dto.RgRegionsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity RgRegions and its DTO RgRegionsDTO.
 */
@Mapper(componentModel = "spring", uses = {RgRegionTypesMapper.class})
public interface RgRegionsMapper extends EntityMapper<RgRegionsDTO, RgRegions> {

    @Mapping(source = "idParent.id", target = "idParentId")
    @Mapping(source = "idType.id", target = "idTypeId")
    RgRegionsDTO toDto(RgRegions rgRegions);

    @Mapping(source = "idParentId", target = "idParent")
    @Mapping(source = "idTypeId", target = "idType")
    RgRegions toEntity(RgRegionsDTO rgRegionsDTO);

    default RgRegions fromId(Long id) {
        if (id == null) {
            return null;
        }
        RgRegions rgRegions = new RgRegions();
        rgRegions.setId(id);
        return rgRegions;
    }
}
