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

    idregions: RgRegions[];
    validThroughDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private emEmpIdentificationsService: EmEmpIdentificationsService,
        private emEmployeesService: EmEmployeesService,
        private rgIdentificationTypesService: RgIdentificationTypesService,
        private rgRegionsService: RgRegionsService,
        private eventManager: JhiEventManager
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
        this.rgRegionsService
            .query({filter: 'emempidentifications-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpIdentifications.idRegion || !this.emEmpIdentifications.idRegion.id) {
                    this.idregions = res.json;
                } else {
                    this.rgRegionsService
                        .find(this.emEmpIdentifications.idRegion.id)
                        .subscribe((subRes: RgRegions) => {
                            this.idregions = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
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
