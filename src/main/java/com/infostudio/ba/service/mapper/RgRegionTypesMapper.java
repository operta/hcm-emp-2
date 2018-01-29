package com.infostudio.ba.service.mapper;

import com.infostudio.ba.domain.*;
import com.infostudio.ba.service.dto.RgRegionTypesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity RgRegionTypes and its DTO RgRegionTypesDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface RgRegionTypesMapper extends EntityMapper<RgRegionTypesDTO, RgRegionTypes> {



    default RgRegionTypes fromId(Long id) {
        if (id == null) {
            return null;
        }
        RgRegionTypes rgRegionTypes = new RgRegionTypes();
        rgRegionTypes.setId(id);
        return rgRegionTypes;
    }
}
