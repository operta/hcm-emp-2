import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RgSchools } from './rg-schools.model';
import { RgSchoolsPopupService } from './rg-schools-popup.service';
import { RgSchoolsService } from './rg-schools.service';
import { RgRegions, RgRegionsService } from '../rg-regions';
import { ResponseWrapper } from '../../shared';
import {ApConstants} from "../ap-constants/ap-constants.model";
import {RegionFilterService} from "../../shared/region-filter.service";
import {ApConstantsService} from "../ap-constants/ap-constants.service";

@Component({
    selector: 'jhi-rg-schools-dialog',
    templateUrl: './rg-schools-dialog.component.html'
})
export class RgSchoolsDialogComponent implements OnInit {
    rgSchools: RgSchools;
    isSaving: boolean;
    cities: RgRegions [];
    states: RgRegions [];
    countries: RgRegions [];
    regions: RgRegions [];
    allRegions: RgRegions[];
    selectedCity: RgRegions;
    selectedCountry: RgRegions;
    selectedState: RgRegions;
    selectedRegion: RgRegions;
    filteredCities: RgRegions[] = [];
    filteredStates: RgRegions[] = [];
    filteredCountries: RgRegions[] = [];
    constants: ApConstants[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private rgSchoolsService: RgSchoolsService,
        private eventManager: JhiEventManager,
        private regionsService: RgRegionsService,
        private regionFilterService: RegionFilterService,
        private apConstantsService: ApConstantsService
    ) {
    }



    ngOnInit() {
        this.isSaving = false;
        if(this.rgSchools.idCity != null){
            this.setRegions(this.rgSchools.idCity);
        }
        this.apConstantsService.query().subscribe(
            (res) => this.onSuccess(res.json),
            (res) => console.log(res.json)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        console.log(this.selectedCountry);
        this.isSaving = true;
        if(this.selectedCity) {
            this.rgSchools.idCity = this.selectedCity;
            this.rgSchools.idCountry = this.selectedCountry;
            this.rgSchools.idRegion = this.selectedRegion;
        }
        if (this.rgSchools.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rgSchoolsService.update(this.rgSchools));
        } else {
            this.subscribeToSaveResponse(
                this.rgSchoolsService.create(this.rgSchools));
        }
    }
    setRegions(cityRegion: any) {
        if(cityRegion) {
            this.selectedCity = cityRegion;
            this.filteredCities.push(this.selectedCity);
            if(cityRegion.idParent) {
                this.selectedState = cityRegion.idParent;
                this.filteredStates.push(this.selectedState);
                if(cityRegion.idParent.idParent) {
                    this.selectedCountry = cityRegion.idParent.idParent;
                    this.filteredCountries.push(this.selectedCountry);
                    if(cityRegion.idParent.idParent.idParent) {
                        this.selectedRegion = cityRegion.idParent.idParent.idParent
                    }
                }
            }
        }
    }

    onSuccess(data) {
        this.constants = data;
        this.loadRegions();
    }

    onRegionsSuccess(data) {
        this.allRegions = data;
        this.cities = this.regionFilterService.filterRegionsByType(
            data, this.constants.find((item) => item.key == "regionTypeCityId").value
        );
        this.states = this.regionFilterService.filterRegionsByType(
            data, this.constants.find((item) => item.key == "regionTypeStateId").value
        );
        this.countries = this.regionFilterService.filterRegionsByType(
            data, this.constants.find((item) => item.key == "regionTypeCountryId").value
        );
        this.regions = this.regionFilterService.filterRegionsByType(
            data, this.constants.find((item) => item.key == "regionTypeRegionId").value
        );
    }
    loadRegions() {
        this.regionsService.findAll().subscribe(
            (res) => this.onRegionsSuccess(res.json),
            (res) => console.log(res.json)
        );
    }

    onRegionSelected(value: string) {
        this.selectedCity = null;
        this.selectedCountry = null;
        this.selectedState = null;
        this.selectedRegion = this.regions.find((item) => item.name == value);

        this.filteredCountries = [];
        this.filteredCities = [];
        this.filteredStates = [];
        if(value) {
            this.filteredCountries = this.regionFilterService.getChildrenRegionsByParentRegionName(
                this.allRegions,
                value,
                this.constants.find((item) => item.key == "regionTypeCountryId").value
            );
        }
    }

    onCountrySelected(value: string) {
        this.selectedCity = null;
        this.selectedState = null;
        this.selectedCountry = this.countries.find((item) => item.name == value);

        this.filteredCities = [];
        this.filteredStates = [];
        if(value) {
            this.filteredStates = this.regionFilterService.getChildrenRegionsByParentRegionName(
                this.allRegions,
                value,
                this.constants.find((item) => item.key == "regionTypeStateId").value
            );
        }
    }

    onStateSelected(value: string) {
        this.selectedCity = null;
        this.selectedState = this.states.find((item) => item.name == value);
        this.filteredCities = [];
        if(value) {
            this.filteredCities = this.regionFilterService.getChildrenRegionsByParentRegionName(
                this.allRegions,
                value,
                this.constants.find((item) => item.key == "regionTypeCityId").value
            );
        }
    }

    onCitySelected(value: string) {
        if(value){
            this.selectedCity = this.cities.find((item) => item.name === value);
        }
    }

    private subscribeToSaveResponse(result: Observable<RgSchools>) {
        result.subscribe((res: RgSchools) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RgSchools) {
        this.eventManager.broadcast({ name: 'rgSchoolsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRgRegionsById(index: number, item: RgRegions) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-rg-schools-popup',
    template: ''
})
export class RgSchoolsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rgSchoolsPopupService: RgSchoolsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rgSchoolsPopupService
                    .open(RgSchoolsDialogComponent as Component, params['id']);
            } else {
                this.rgSchoolsPopupService
                    .open(RgSchoolsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
