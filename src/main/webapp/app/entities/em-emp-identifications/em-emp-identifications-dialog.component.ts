import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpIdentifications } from './em-emp-identifications.model';
import { EmEmpIdentificationsPopupService } from './em-emp-identifications-popup.service';
import { EmEmpIdentificationsService } from './em-emp-identifications.service';
import { EmEmployees, EmEmployeesService } from '../em-employees';
import { RgIdentificationTypes, RgIdentificationTypesService } from '../rg-identification-types';
import { RgRegions, RgRegionsService } from '../rg-regions';
import { ResponseWrapper } from '../../shared';
import {RegionFilterService} from "../../shared/region-filter.service";
import {ApConstantsService} from "../ap-constants/ap-constants.service";
import {ApConstants} from "../ap-constants/ap-constants.model";

@Component({
    selector: 'jhi-em-emp-identifications-dialog',
    templateUrl: './em-emp-identifications-dialog.component.html'
})
export class EmEmpIdentificationsDialogComponent implements OnInit {
    employee: EmEmployees;
    emEmpIdentifications: EmEmpIdentifications;
    isSaving: boolean;
    idemployees: EmEmployees[];
    ididentifications: RgIdentificationTypes[];
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
        private emEmpIdentificationsService: EmEmpIdentificationsService,
        private emEmployeesService: EmEmployeesService,
        private rgIdentificationTypesService: RgIdentificationTypesService,
        private rgRegionsService: RgRegionsService,
        private eventManager: JhiEventManager,
        private regionsService: RgRegionsService,
        private regionFilterService: RegionFilterService,
        private apConstantsService: ApConstantsService
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.emEmployeesService
            .query({filter: 'emempidentifications-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpIdentifications.idEmployee || !this.emEmpIdentifications.idEmployee.id) {
                    this.idemployees = res.json;
                } else {
                    this.emEmployeesService
                        .find(this.emEmpIdentifications.idEmployee.id)
                        .subscribe((subRes: EmEmployees) => {
                            this.idemployees = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.rgIdentificationTypesService
            .query({filter: 'emempidentifications-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpIdentifications.idIdentification || !this.emEmpIdentifications.idIdentification.id) {
                    this.ididentifications = res.json;
                } else {
                    this.rgIdentificationTypesService
                        .find(this.emEmpIdentifications.idIdentification.id)
                        .subscribe((subRes: RgIdentificationTypes) => {
                            this.ididentifications = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));

        this.setRegions(this.emEmpIdentifications.idRegion);

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
        this.emEmpIdentifications.idRegion = this.selectedCity;
        if (this.emEmpIdentifications.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emEmpIdentificationsService.update(this.emEmpIdentifications));
        } else {
            if(this.employee) {
                this.emEmpIdentifications.idEmployee = this.employee;
            }
            this.subscribeToSaveResponse(
                this.emEmpIdentificationsService.create(this.emEmpIdentifications));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmEmpIdentifications>) {
        result.subscribe((res: EmEmpIdentifications) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmEmpIdentifications) {
        this.eventManager.broadcast({ name: 'emEmpIdentificationsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEmEmployeesById(index: number, item: EmEmployees) {
        return item.id;
    }

    trackRgIdentificationTypesById(index: number, item: RgIdentificationTypes) {
        return item.id;
    }

    trackRgRegionsById(index: number, item: RgRegions) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-em-emp-identifications-popup',
    template: ''
})
export class EmEmpIdentificationsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpIdentificationsPopupService: EmEmpIdentificationsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emEmpIdentificationsPopupService
                    .open(EmEmpIdentificationsDialogComponent as Component, params['id']);
            } else if (params['employeeId']){
                this.emEmpIdentificationsPopupService
                    .open(EmEmpIdentificationsDialogComponent as Component, null, params['employeeId']);
            } else {
                this.emEmpIdentificationsPopupService
                    .open(EmEmpIdentificationsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
