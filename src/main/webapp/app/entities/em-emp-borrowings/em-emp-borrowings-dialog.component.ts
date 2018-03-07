import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpBorrowings } from './em-emp-borrowings.model';
import { EmEmpBorrowingsPopupService } from './em-emp-borrowings-popup.service';
import { EmEmpBorrowingsService } from './em-emp-borrowings.service';
import { EmEmployees, EmEmployeesService } from '../em-employees';
import { EmBorrowingTypes, EmBorrowingTypesService } from '../em-borrowing-types';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-borrowings-dialog',
    templateUrl: './em-emp-borrowings-dialog.component.html'
})
export class EmEmpBorrowingsDialogComponent implements OnInit {
    employee: EmEmployees;
    emEmpBorrowings: EmEmpBorrowings;
    isSaving: boolean;

    idemployees: EmEmployees[];

    idborrowings: EmBorrowingTypes[];
    dateFromDp: any;
    dateToDp: any;
    damagedByEmployee = false;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private emEmpBorrowingsService: EmEmpBorrowingsService,
        private emEmployeesService: EmEmployeesService,
        private emBorrowingTypesService: EmBorrowingTypesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.emEmployeesService
            .query({filter: 'emempborrowings-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpBorrowings.idEmployee || !this.emEmpBorrowings.idEmployee.id) {
                    this.idemployees = res.json;
                } else {
                    this.emEmployeesService
                        .find(this.emEmpBorrowings.idEmployee.id)
                        .subscribe((subRes: EmEmployees) => {
                            this.idemployees = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.emBorrowingTypesService
            .query({filter: 'emempborrowings-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpBorrowings.idBorrowing || !this.emEmpBorrowings.idBorrowing.id) {
                    this.idborrowings = res.json;
                } else {
                    this.emBorrowingTypesService
                        .find(this.emEmpBorrowings.idBorrowing.id)
                        .subscribe((subRes: EmBorrowingTypes) => {
                            this.idborrowings = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        if(this.emEmpBorrowings.damagedByEmployee == 'T') {
            this.damagedByEmployee = true;
        } else {
            this.damagedByEmployee = false;
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        if(this.damagedByEmployee) {
            this.emEmpBorrowings.damagedByEmployee = 'T';
        } else {
            this.emEmpBorrowings.damagedByEmployee = 'F';
        }
        this.isSaving = true;
        if (this.emEmpBorrowings.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emEmpBorrowingsService.update(this.emEmpBorrowings));
        } else {
            this.emEmpBorrowings.idEmployee = this.employee;
            this.subscribeToSaveResponse(
                this.emEmpBorrowingsService.create(this.emEmpBorrowings));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmEmpBorrowings>) {
        result.subscribe((res: EmEmpBorrowings) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmEmpBorrowings) {
        this.eventManager.broadcast({ name: 'emEmpBorrowingsListModification', content: 'OK'});
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

    trackEmBorrowingTypesById(index: number, item: EmBorrowingTypes) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-em-emp-borrowings-popup',
    template: ''
})
export class EmEmpBorrowingsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpBorrowingsPopupService: EmEmpBorrowingsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emEmpBorrowingsPopupService
                    .open(EmEmpBorrowingsDialogComponent as Component, params['id']);
            } else if (params['employeeId']){
                this.emEmpBorrowingsPopupService
                    .open(EmEmpBorrowingsDialogComponent as Component, null, params['employeeId']);
            } else {
                this.emEmpBorrowingsPopupService.open(EmEmpBorrowingsDialogComponent as Component)
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
