import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpAccomplishments } from './em-emp-accomplishments.model';
import { EmEmpAccomplishmentsPopupService } from './em-emp-accomplishments-popup.service';
import { EmEmpAccomplishmentsService } from './em-emp-accomplishments.service';
import { EmEmployees, EmEmployeesService } from '../em-employees';
import { AtAccomplishmentTypes, AtAccomplishmentTypesService } from '../at-accomplishment-types';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-accomplishments-dialog',
    templateUrl: './em-emp-accomplishments-dialog.component.html'
})
export class EmEmpAccomplishmentsDialogComponent implements OnInit {

    emEmpAccomplishments: EmEmpAccomplishments;
    isSaving: boolean;

    idemployees: EmEmployees[];

    idaccomplishmenttypes: AtAccomplishmentTypes[];
    dateFromDp: any;
    dateToDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private emEmpAccomplishmentsService: EmEmpAccomplishmentsService,
        private emEmployeesService: EmEmployeesService,
        private atAccomplishmentTypesService: AtAccomplishmentTypesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.emEmployeesService
            .query({filter: 'emempaccomplishments-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpAccomplishments.idEmployee || !this.emEmpAccomplishments.idEmployee.id) {
                    this.idemployees = res.json;
                } else {
                    this.emEmployeesService
                        .find(this.emEmpAccomplishments.idEmployee.id)
                        .subscribe((subRes: EmEmployees) => {
                            this.idemployees = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.atAccomplishmentTypesService
            .query({filter: 'emempaccomplishments-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpAccomplishments.idAccomplishmentType || !this.emEmpAccomplishments.idAccomplishmentType.id) {
                    this.idaccomplishmenttypes = res.json;
                } else {
                    this.atAccomplishmentTypesService
                        .find(this.emEmpAccomplishments.idAccomplishmentType.id)
                        .subscribe((subRes: AtAccomplishmentTypes) => {
                            this.idaccomplishmenttypes = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.emEmpAccomplishments.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emEmpAccomplishmentsService.update(this.emEmpAccomplishments));
        } else {
            this.subscribeToSaveResponse(
                this.emEmpAccomplishmentsService.create(this.emEmpAccomplishments));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmEmpAccomplishments>) {
        result.subscribe((res: EmEmpAccomplishments) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmEmpAccomplishments) {
        this.eventManager.broadcast({ name: 'emEmpAccomplishmentsListModification', content: 'OK'});
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

    trackAtAccomplishmentTypesById(index: number, item: AtAccomplishmentTypes) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-em-emp-accomplishments-popup',
    template: ''
})
export class EmEmpAccomplishmentsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpAccomplishmentsPopupService: EmEmpAccomplishmentsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emEmpAccomplishmentsPopupService
                    .open(EmEmpAccomplishmentsDialogComponent as Component, params['id']);
            } else {
                this.emEmpAccomplishmentsPopupService
                    .open(EmEmpAccomplishmentsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
