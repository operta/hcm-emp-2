import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import {EmpAddressPopupService} from "./emp-address-popup.service";
import {LeLegalEntities} from "../../../entities/le-legal-entities/le-legal-entities.model";
import {LeLegalEntitiesService} from "../../../entities/le-legal-entities/le-legal-entities.service";
import {RgRegionsService} from "../../../entities/rg-regions/rg-regions.service";
import {RgRegions} from "../../../entities/rg-regions/rg-regions.model";
import {EmEmployees} from "../../../entities/em-employees/em-employees.model";
import {Principal} from "../../../shared/auth/principal.service";
import {EmEmployeesService} from "../../../entities/em-employees/em-employees.service";
import {ApConstantsService} from "../../../entities/ap-constants/ap-constants.service";
import {ApConstants} from "../../../entities/ap-constants/ap-constants.model";
import {RegionFilterService} from "../../../shared/region-filter.service";

@Component({
    selector: 'jhi-emp-personal-info-dialog',
    templateUrl: './emp-address-dialog.component.html'
})
export class EmpAddressDialogComponent implements OnInit {
    legalEntity: LeLegalEntities;
    isSaving: boolean;
    employee: EmEmployees;
    cities: RgRegions [];
    states: RgRegions [];
    countries: RgRegions [];
    regions: RgRegions [];
    allRegions: RgRegions[];
    selectedCity: RgRegions;
    selectedCountry: RgRegions;
    selectedState: RgRegions;
    selectedRegion: RgRegions;
    selectedAddress: string;
    filteredCities: RgRegions[];
    filteredStates: RgRegions[];
    filteredCountries: RgRegions[];
    constants: ApConstants[];

    constructor(
        public activeModal: NgbActiveModal,
        private legalEntityService: LeLegalEntitiesService,
        private regionsService: RgRegionsService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private employeeeService: EmEmployeesService,
        private appConstantsService: ApConstantsService,
        private regionFilterService: RegionFilterService) {
    }

    setRegions(cityRegion: any) {
        if(cityRegion) {
            this.selectedCity = cityRegion;
            if(cityRegion.idParent) {
                this.selectedState = cityRegion.idParent;
                if(cityRegion.idParent.idParent) {
                    this.selectedCountry = cityRegion.idParent.idParent;
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
        this.regionsService.query().subscribe(
            (res) => this.onRegionsSuccess(res.json),
            (res) => console.log(res.json)
        );
    }
    ngOnInit() {
        this.setRegions(this.legalEntity.region);
        this.selectedAddress = this.legalEntity.address;
        this.isSaving = false;

        this.appConstantsService.query().subscribe(
            (res) => this.onSuccess(res.json),
            (res) => console.log(res.json)
        );
    }

    onRegionSelected(value: string) {
        this.selectedCity = null;
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
        if (this.legalEntity.id !== undefined && this.selectedCity !== undefined) {
            this.legalEntity.region = this.selectedCity;
            this.legalEntity.address = this.selectedAddress;
            this.subscribeToSaveResponse(
                this.legalEntityService.updateLocation(this.legalEntity)
            );
        } else {
            // this.principal.identity().then((account) => {
            //     this.employeeeService.findByUser(account.id).subscribe(
            //         (employee) => this.employee = employee
            //     );
            // });
            // this.legalEntity.name = this.employee.name + ' ' + this.employee.surname;
            this.subscribeToSaveResponse(
                this.legalEntityService.create(this.legalEntity)
            );
        }
    }

    private subscribeToSaveResponse(result: Observable<LeLegalEntities>) {
        result
            .subscribe(
                (res: LeLegalEntities) => {
                    this.onSaveSuccess(res);
                    },
                (res: Response) => this.onSaveError()
            );
    }

    private onSaveSuccess(result: LeLegalEntities) {
        this.eventManager.broadcast({ name: 'AddressModification', content: 'OK'});
        // this.employee.idLegalEntity = result;
        // this.employeeeService.update(this.employee);
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

}

@Component({
    selector: 'jhi-emp-address-popup',
    template: ''
})
export class EmpAddressPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private empAddressPopupService: EmpAddressPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.empAddressPopupService
                    .open(EmpAddressDialogComponent as Component, params['id']);
            } else {
                this.empAddressPopupService
                    .open(EmpAddressDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
