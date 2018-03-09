import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpSalaries } from './em-emp-salaries.model';
import { EmEmpSalariesPopupService } from './em-emp-salaries-popup.service';
import { EmEmpSalariesService } from './em-emp-salaries.service';
import { EmEmployees, EmEmployeesService } from '../em-employees';
import { EmContractTypes, EmContractTypesService } from '../em-contract-types';
import { OgWorkPlaces, OgWorkPlacesService } from '../og-work-places';
import { ResponseWrapper } from '../../shared';
import {Principal} from "../../shared/auth/principal.service";

@Component({
    selector: 'jhi-em-emp-salaries-dialog',
    templateUrl: './em-emp-salaries-dialog.component.html'
})
export class EmEmpSalariesDialogComponent implements OnInit {

    emEmpSalaries: EmEmpSalaries;
    isSaving: boolean;
    currentAccount: any;
    employee: EmEmployees;
    idemployees: EmEmployees[];

    idcontracttypes: EmContractTypes[];

    idworkplaces: OgWorkPlaces[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private emEmpSalariesService: EmEmpSalariesService,
        private emEmployeesService: EmEmployeesService,
        private emContractTypesService: EmContractTypesService,
        private ogWorkPlacesService: OgWorkPlacesService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.emEmployeesService
            .query({filter: 'emempsalaries-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpSalaries.idEmployee || !this.emEmpSalaries.idEmployee.id) {
                    this.idemployees = res.json;
                } else {
                    this.emEmployeesService
                        .find(this.emEmpSalaries.idEmployee.id)
                        .subscribe((subRes: EmEmployees) => {
                            this.idemployees = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.emContractTypesService
            .query({filter: 'emempsalaries-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpSalaries.idContractType || !this.emEmpSalaries.idContractType.id) {
                    this.idcontracttypes = res.json;
                } else {
                    this.emContractTypesService
                        .find(this.emEmpSalaries.idContractType.id)
                        .subscribe((subRes: EmContractTypes) => {
                            this.idcontracttypes = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.ogWorkPlacesService
            .query({filter: 'emempsalaries-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpSalaries.idWorkPlace || !this.emEmpSalaries.idWorkPlace.id) {
                    this.idworkplaces = res.json;
                } else {
                    this.ogWorkPlacesService
                        .find(this.emEmpSalaries.idWorkPlace.id)
                        .subscribe((subRes: OgWorkPlaces) => {
                            this.idworkplaces = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.principal.identity().then((account) => {
            this.currentAccount = account;
            this.emEmployeesService.findByUser(this.currentAccount.id).subscribe((emEmployees) => {
                this.employee = emEmployees;
            }, (error) => console.log(error)
            );
        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.emEmpSalaries.idEmployee = this.employee;
        if (this.emEmpSalaries.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emEmpSalariesService.update(this.emEmpSalaries));
        } else {
            this.subscribeToSaveResponse(
                this.emEmpSalariesService.create(this.emEmpSalaries));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmEmpSalaries>) {
        result.subscribe((res: EmEmpSalaries) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmEmpSalaries) {
        this.eventManager.broadcast({ name: 'emEmpSalariesListModification', content: 'OK'});
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

    trackEmContractTypesById(index: number, item: EmContractTypes) {
        return item.id;
    }

    trackOgWorkPlacesById(index: number, item: OgWorkPlaces) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-em-emp-salaries-popup',
    template: ''
})
export class EmEmpSalariesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpSalariesPopupService: EmEmpSalariesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emEmpSalariesPopupService
                    .open(EmEmpSalariesDialogComponent as Component, params['id']);
            } else {
                this.emEmpSalariesPopupService
                    .open(EmEmpSalariesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
