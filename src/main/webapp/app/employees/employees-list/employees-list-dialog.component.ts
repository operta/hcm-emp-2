import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';
import {RgQualifications} from "../../entities/rg-qualifications/rg-qualifications.model";
import {LeLegalEntities} from "../../entities/le-legal-entities/le-legal-entities.model";
import {EmEmployees} from "../../entities/em-employees/em-employees.model";
import {EmEmpTypes} from "../../entities/em-emp-types/em-emp-types.model";
import {EmStatuses} from "../../entities/em-statuses/em-statuses.model";
import {EmEmployeesService} from "../../entities/em-employees/em-employees.service";
import {RgQualificationsService} from "../../entities/rg-qualifications/rg-qualifications.service";
import {EmEmpTypesService} from "../../entities/em-emp-types/em-emp-types.service";
import {LeLegalEntitiesService} from "../../entities/le-legal-entities/le-legal-entities.service";
import {EmStatusesService} from "../../entities/em-statuses/em-statuses.service";
import {EmployeesListPopupService} from "./employees-list-popup.service";
import {Subscription} from "rxjs/Subscription";
import {OgOrganizations} from "../../entities/og-organizations/og-organizations.model";
import {OgOrganizationsService} from "../../entities/og-organizations/og-organizations.service";
import {OgOrgWorkPlaces} from "../../entities/og-org-work-places/og-org-work-places.model";
import {OgOrgWorkPlacesService} from "../../entities/og-org-work-places/og-org-work-places.service";

@Component({
    selector: 'jhi-em-employees-dialog',
    templateUrl: './employees-list-dialog.component.html',
    styleUrls: ['./employees-list-dialog.component.css']
})
export class EmployeesListDialogComponent implements OnInit, OnDestroy {
    eventSubscriber1: Subscription;
    eventSubscriber2: Subscription;
    eventSubscriber3: Subscription;
    eventSubscriber4: Subscription;
    eventSubscriber5: Subscription;
    isSaving: boolean;

    emEmployees: EmEmployees;
    users: User[];
    dateOfBirthDp: any;
    hireDateDp: any;

    idqualifications: RgQualifications[];
    idemploymenttypes: EmEmpTypes[];
    idlegalentities: LeLegalEntities[];
    idstatuses: EmStatuses[];
    searchValue = '';
    isHidden = true;
    searchableList: string[];
    searchUValue = '';
    isUHidden = true;
    searchableUList: string[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private emEmployeesService: EmEmployeesService,
        private rgQualificationsService: RgQualificationsService,
        private emEmpTypesService: EmEmpTypesService,
        private leLegalEntitiesService: LeLegalEntitiesService,
        private emStatusesService: EmStatusesService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.searchableList = ['name'];
        this.searchableUList = ['name'];
        this.isSaving = false;
        this.loadUsers();
        this.loadQualifications();
        this.loadLegalEntities();
        this.loadEmployeeTypes();
        this.loadEmployeeStatuses();
        this.registerChangeInModels();
    }

    loadLegalEntities() {
        this.leLegalEntitiesService
            .query({filter: 'ememployees-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmployees.idLegalEntity || !this.emEmployees.idLegalEntity.id) {
                    this.idlegalentities = res.json;
                } else {
                    this.leLegalEntitiesService
                        .find(this.emEmployees.idLegalEntity.id)
                        .subscribe((subRes: LeLegalEntities) => {
                            this.idlegalentities = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    loadQualifications() {
        this.rgQualificationsService
            .query({filter: 'ememployees-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmployees.idQualification || !this.emEmployees.idQualification.id) {
                    this.idqualifications = res.json;
                } else {
                    this.rgQualificationsService
                        .find(this.emEmployees.idQualification.id)
                        .subscribe((subRes: RgQualifications) => {
                            this.idqualifications = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));

    }

    loadUsers(){
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; console.log(this.users)}, (res: ResponseWrapper) => this.onError(res.json));
    }

    loadEmployeeStatuses() {
        this.emStatusesService
            .query({filter: 'ememployees-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmployees.idStatus || !this.emEmployees.idStatus.id) {
                    this.idstatuses = res.json;
                } else {
                    this.emStatusesService
                        .find(this.emEmployees.idStatus.id)
                        .subscribe((subRes: EmStatuses) => {
                            this.idstatuses = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    loadEmployeeTypes() {
        this.emEmpTypesService
            .query({filter: 'ememployees-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmployees.idEmploymentType || !this.emEmployees.idEmploymentType.id) {
                    this.idemploymenttypes = res.json;
                } else {
                    this.emEmpTypesService
                        .find(this.emEmployees.idEmploymentType.id)
                        .subscribe((subRes: EmEmpTypes) => {
                            this.idemploymenttypes = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber1);
        this.eventManager.destroy(this.eventSubscriber2);
        this.eventManager.destroy(this.eventSubscriber3);
        this.eventManager.destroy(this.eventSubscriber4);
        this.eventManager.destroy(this.eventSubscriber5);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    registerChangeInModels() {
        this.eventSubscriber1 = this.eventManager.subscribe('leLegalEntitiesListModification', (response) => this.loadLegalEntities());
        this.eventSubscriber2 = this.eventManager.subscribe('emEmpTypesListModification', (response) => this.loadEmployeeTypes());
        this.eventSubscriber3 = this.eventManager.subscribe('rgQualificationsListModification', (response) => this.loadQualifications());
        this.eventSubscriber4 = this.eventManager.subscribe('emStatusesListModification', (response) => this.loadEmployeeStatuses());
        this.eventSubscriber5 = this.eventManager.subscribe('userListModification', (response) => this.loadUsers());
    }

    save() {
        this.isSaving = true;
        if (this.emEmployees.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emEmployeesService.update(this.emEmployees));
        } else {
            this.subscribeToSaveResponse(
                this.emEmployeesService.create(this.emEmployees));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmEmployees>) {
        result.subscribe((res: EmEmployees) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmEmployees) {
        this.eventManager.broadcast({ name: 'emEmployeesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRgQualificationsById(index: number, item: RgQualifications) {
        return item.id;
    }

    trackEmEmpTypesById(index: number, item: EmEmpTypes) {
        return item.id;
    }

    trackLeLegalEntitiesById(index: number, item: LeLegalEntities) {
        return item.id;
    }

    trackEmStatusesById(index: number, item: EmStatuses) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-em-employees-popup',
    template: ''
})
export class EmployeesListPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmployeesPopupService: EmployeesListPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emEmployeesPopupService
                    .open(EmployeesListDialogComponent as Component, params['id']);
            } else {
                this.emEmployeesPopupService
                    .open(EmployeesListDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
