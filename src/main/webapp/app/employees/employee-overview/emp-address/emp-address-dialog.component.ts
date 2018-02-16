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

@Component({
    selector: 'jhi-emp-personal-info-dialog',
    templateUrl: './emp-address-dialog.component.html'
})
export class EmpAddressDialogComponent implements OnInit {
    legalEntity: LeLegalEntities;
    isSaving: boolean;
    cities: RgRegions [];
    states: RgRegions [];
    countries: RgRegions [];
    regions: RgRegions [];
    selectedCity: RgRegions;
    selectedCountry: RgRegions;
    selectedState: RgRegions;
    selectedRegion: RgRegions;
    selectedAddress: string;
    filteredCities: RgRegions[];
    filteredStates: RgRegions[];
    filteredCountries: RgRegions[];
    filteredRegions: RgRegions[];
    employee: EmEmployees;

    constructor(
        public activeModal: NgbActiveModal,
        private legalEntityService: LeLegalEntitiesService,
        private regionsService: RgRegionsService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private employeeeService: EmEmployeesService) {
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

    ngOnInit() {
        this.setRegions(this.legalEntity.region);
        this.selectedAddress = this.legalEntity.address;
        this.isSaving = false;
        this.regionsService.findByIdType(4).subscribe(
            (cities) => {
                this.cities = cities;
                this.filteredCities = cities;
            }
        );
        this.regionsService.findByIdType(2).subscribe(
            (states) => {
                this.states = states;
                this.filteredStates = states;
            }
        );
        this.regionsService.findByIdType(1).subscribe(
            (countries) => {
                this.countries = countries;
                this.filteredCountries = countries;
            }
        );
        this.regionsService.findByIdType(3).subscribe(
            (regions) => {
                this.regions = regions;
                this.filteredRegions = regions;
            }
        );
    }

    onRegionSelected(value: string) {
        if(value) {
            this.selectedRegion = this.regions.find(item => item.name === value);
            console.log(this.selectedRegion);
            this.filteredCountries = this.countries.filter((item) => item.idParent.id == this.selectedRegion.id);
            this.selectedCity = null;
            this.filteredCities = [];
            this.filteredStates = [];
        } else {
            this.filteredCities = [];
            this.filteredStates = [];
            this.filteredCountries = [];
        }
    }

    onCountrySelected(value: string) {
        if(value) {
            this.selectedCountry = this.countries.find(item => item.name === value);
            this.filteredStates = this.states.filter((state) => state.idParent.id == this.selectedCountry.id);
            this.selectedCity = null;
            this.filteredCities = [];
        } else {
            this.filteredCities = [];
            this.filteredStates = [];
        }
    }

    onStateSelected(value: string){
        if(value) {
            this.selectedState = this.states.find(item => item.name === value);
            this.filteredCities = this.cities.filter((city) => city.idParent.id == this.selectedState.id);
            this.selectedCity = null;
        }
        else {
            this.filteredCities = []
        }
    }

    onCitySelected(value: string) {
        if(value){
            this.selectedCity = this.cities.find(item => item.name === value);
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
