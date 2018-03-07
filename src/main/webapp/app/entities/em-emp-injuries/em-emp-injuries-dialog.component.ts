import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpInjuries } from './em-emp-injuries.model';
import { EmEmpInjuriesPopupService } from './em-emp-injuries-popup.service';
import { EmEmpInjuriesService } from './em-emp-injuries.service';
import { EmEmployees, EmEmployeesService } from '../em-employees';
import { EmInjuryTypes, EmInjuryTypesService } from '../em-injury-types';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-injuries-dialog',
    templateUrl: './em-emp-injuries-dialog.component.html'
})
export class EmEmpInjuriesDialogComponent implements OnInit {
    employee: EmEmployees;
    emEmpInjuries: EmEmpInjuries;
    isSaving: boolean;

    idemployees: EmEmployees[];

    idinjuries: EmInjuryTypes[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private emEmpInjuriesService: EmEmpInjuriesService,
        private emEmployeesService: EmEmployeesService,
        private emInjuryTypesService: EmInjuryTypesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.emEmployeesService
            .query({filter: 'emempinjuries-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpInjuries.idEmployee || !this.emEmpInjuries.idEmployee.id) {
                    this.idemployees = res.json;
                } else {
                    this.emEmployeesService
                        .find(this.emEmpInjuries.idEmployee.id)
                        .subscribe((subRes: EmEmployees) => {
                            this.idemployees = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.emInjuryTypesService
            .query({filter: 'emempinjuries-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpInjuries.idInjury || !this.emEmpInjuries.idInjury.id) {
                    this.idinjuries = res.json;
                } else {
                    this.emInjuryTypesService
                        .find(this.emEmpInjuries.idInjury.id)
                        .subscribe((subRes: EmInjuryTypes) => {
                            this.idinjuries = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.emEmpInjuries.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emEmpInjuriesService.update(this.emEmpInjuries));
        } else {
            if(this.employee) {
                this.emEmpInjuries.idEmployee = this.employee;
            }
            this.subscribeToSaveResponse(
                this.emEmpInjuriesService.create(this.emEmpInjuries));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmEmpInjuries>) {
        result.subscribe((res: EmEmpInjuries) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmEmpInjuries) {
        this.eventManager.broadcast({ name: 'emEmpInjuriesListModification', content: 'OK'});
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

    trackEmInjuryTypesById(index: number, item: EmInjuryTypes) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-em-emp-injuries-popup',
    template: ''
})
export class EmEmpInjuriesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpInjuriesPopupService: EmEmpInjuriesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emEmpInjuriesPopupService
                    .open(EmEmpInjuriesDialogComponent as Component, params['id']);
            } else if (params['employeeId']) {
                this.emEmpInjuriesPopupService.open(EmEmpInjuriesDialogComponent as Component, null, params['employeeId']);
            } else {
                this.emEmpInjuriesPopupService
                    .open(EmEmpInjuriesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
