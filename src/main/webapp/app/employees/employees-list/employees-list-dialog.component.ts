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

@Component({
    selector: 'jhi-em-employees-dialog',
    templateUrl: './employees-list-dialog.component.html'
})
export class EmployeesListDialogComponent implements OnInit, OnDestroy {

    emEmployees: EmEmployees;
    isSaving: boolean;

    idqualifications: RgQualifications[];

    idemploymenttypes: EmEmpTypes[];

    idlegalentities: LeLegalEntities[];

    idstatuses: EmStatuses[];
    eventSubscriber: Subscription;

    users: User[];
    dateOfBirthDp: any;
    hireDateDp: any;

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
        this.isSaving = false;
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
       this.loadLegalEntities();
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
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.registerChangeInLeLegalEntities()
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

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    registerChangeInLeLegalEntities() {
        this.eventSubscriber = this.eventManager.subscribe('leLegalEntitiesListModification', (response) => this.loadLegalEntities());
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
