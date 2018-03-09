import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpEmgContacts } from './em-emp-emg-contacts.model';
import { EmEmpEmgContactsPopupService } from './em-emp-emg-contacts-popup.service';
import { EmEmpEmgContactsService } from './em-emp-emg-contacts.service';
import { EmEmployees, EmEmployeesService } from '../em-employees';
import { RgContactTypes, RgContactTypesService } from '../rg-contact-types';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-emg-contacts-dialog',
    templateUrl: './em-emp-emg-contacts-dialog.component.html'
})
export class EmEmpEmgContactsDialogComponent implements OnInit {
    employee: EmEmployees;
    emEmpEmgContacts: EmEmpEmgContacts;
    isSaving: boolean;

    idemployees: EmEmployees[];

    idcontacttypes: RgContactTypes[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private emEmpEmgContactsService: EmEmpEmgContactsService,
        private emEmployeesService: EmEmployeesService,
        private rgContactTypesService: RgContactTypesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.emEmployeesService
            .query({filter: 'emempemgcontacts-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpEmgContacts.idEmployee || !this.emEmpEmgContacts.idEmployee.id) {
                    this.idemployees = res.json;
                } else {
                    this.emEmployeesService
                        .find(this.emEmpEmgContacts.idEmployee.id)
                        .subscribe((subRes: EmEmployees) => {
                            this.idemployees = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.rgContactTypesService
            .query({filter: 'emempemgcontacts-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpEmgContacts.idContactType || !this.emEmpEmgContacts.idContactType.id) {
                    this.idcontacttypes = res.json;
                } else {
                    this.rgContactTypesService
                        .find(this.emEmpEmgContacts.idContactType.id)
                        .subscribe((subRes: RgContactTypes) => {
                            this.idcontacttypes = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.emEmpEmgContacts.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emEmpEmgContactsService.update(this.emEmpEmgContacts));
        } else {
            this.emEmpEmgContacts.idEmployee = this.employee;
            this.subscribeToSaveResponse(
                this.emEmpEmgContactsService.create(this.emEmpEmgContacts));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmEmpEmgContacts>) {
        result.subscribe((res: EmEmpEmgContacts) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmEmpEmgContacts) {
        this.eventManager.broadcast({ name: 'emEmpEmgContactsListModification', content: 'OK'});
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

    trackRgContactTypesById(index: number, item: RgContactTypes) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-em-emp-emg-contacts-popup',
    template: ''
})
export class EmEmpEmgContactsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpEmgContactsPopupService: EmEmpEmgContactsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emEmpEmgContactsPopupService
                    .open(EmEmpEmgContactsDialogComponent as Component, params['id']);
            } else if(params['employeeId']) {
                this.emEmpEmgContactsPopupService
                    .open(EmEmpEmgContactsDialogComponent as Component, null, params['employeeId']);
            } else {
                this.emEmpEmgContactsPopupService
                    .open(EmEmpEmgContactsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
