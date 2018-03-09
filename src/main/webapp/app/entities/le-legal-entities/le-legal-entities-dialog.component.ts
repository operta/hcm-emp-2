import {Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LeLegalEntities } from './le-legal-entities.model';
import { LeLegalEntitiesPopupService } from './le-legal-entities-popup.service';
import { LeLegalEntitiesService } from './le-legal-entities.service';
import { LeLegalEntityTypes, LeLegalEntityTypesService } from '../le-legal-entity-types';
import { RgRegions, RgRegionsService } from '../rg-regions';
import { ResponseWrapper } from '../../shared';
import {RegionFilterService} from "../../shared/region-filter.service";
import {ApConstantsService} from "../ap-constants/ap-constants.service";
import {ApConstants} from "../ap-constants/ap-constants.model";

@Component({
    selector: 'jhi-le-legal-entities-dialog',
    templateUrl: './le-legal-entities-dialog.component.html',
    styleUrls: ['./le-legal-entities-dialog.component.css']
})
export class LeLegalEntitiesDialogComponent implements OnInit {
    @ViewChild('regionSelect') regionSelect: Element;
    leLegalEntities: LeLegalEntities;
    isSaving: boolean;
    identitytypes: LeLegalEntityTypes[];
    regions: RgRegions[];
    cities: RgRegions[];
    searchableList: string[];
    searchValue = '';
    isHidden = true;
    states: RgRegions [];
    countries: RgRegions [];
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
        private leLegalEntitiesService: LeLegalEntitiesService,
        private leLegalEntityTypesService: LeLegalEntityTypesService,
        private regionsService: RgRegionsService,
        private eventManager: JhiEventManager,
        private regionFilterService: RegionFilterService,
        private apConstantsService: ApConstantsService
    ) {
    }

    ngOnInit() {
        this.searchableList = ['name'];
        this.isSaving = false;
        this.leLegalEntityTypesService
            .query({filter: 'lelegalentities-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.leLegalEntities.idEntityType || !this.leLegalEntities.idEntityType.id) {
                    this.identitytypes = res.json;
                } else {
                    this.leLegalEntityTypesService
                        .find(this.leLegalEntities.idEntityType.id)
                        .subscribe((subRes: LeLegalEntityTypes) => {
                            this.identitytypes = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.setRegions(this.leLegalEntities.region);

        this.apConstantsService.query().subscribe(
            (res) => this.onSuccess(res.json),
            (res) => console.log(res.json)
        );
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
        console.log(data);
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
            console.log(value);
            this.filteredStates = this.regionFilterService.getChildrenRegionsByParentRegionName(
                this.allRegions,
                value,
                this.constants.find((item) => item.key == "regionTypeStateId").value
            );
            console.log(this.filteredStates);
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


    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if(this.selectedCity){
            this.leLegalEntities.region = this.selectedCity;
        }
        if (this.leLegalEntities.id !== undefined) {
            this.subscribeToSaveResponse(
                this.leLegalEntitiesService.update(this.leLegalEntities));
        } else {
            this.subscribeToSaveResponse(
                this.leLegalEntitiesService.create(this.leLegalEntities));
        }
    }

    private subscribeToSaveResponse(result: Observable<LeLegalEntities>) {
        result.subscribe((res: LeLegalEntities) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: LeLegalEntities) {
        this.eventManager.broadcast({ name: 'leLegalEntitiesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLeLegalEntityTypesById(index: number, item: LeLegalEntityTypes) {
        return item.id;
    }

    trackRgRegionsById(index: number, item: RgRegions) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-le-legal-entities-popup',
    template: ''
})
export class LeLegalEntitiesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private leLegalEntitiesPopupService: LeLegalEntitiesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.leLegalEntitiesPopupService
                    .open(LeLegalEntitiesDialogComponent as Component, params['id']);
            } else {
                this.leLegalEntitiesPopupService
                    .open(LeLegalEntitiesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
