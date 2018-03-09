import {Injectable} from "@angular/core";

@Injectable()
export class RegionFilterService {

    constructor(){}

    filterRegionsByType(regions:any, typeId: any){
        const items = regions.filter((item) => item.idType.id == +typeId);
        return items;
    }

    getRegionByName(regions:any, regionName: string) {
        return regions.find((item) => item.name == regionName);
    }

    getChildrenRegionsByParentRegionName(regions: any, regionName: string, typeId: any) {
        console.log(regions);
        const region = this.getRegionByName(regions, regionName);
        console.log('get region by name');
        console.log(region);
        const items = this.filterRegionsByType(regions, typeId);
        console.log('regions by type')
        console.log(items);
        console.log('children regions');
        console.log(items.filter((item) => item.idParent.id == region.id));
        return items.filter((item) => item.idParent.id == region.id);
    }
}
