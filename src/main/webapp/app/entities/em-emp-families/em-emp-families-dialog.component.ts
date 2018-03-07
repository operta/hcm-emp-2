import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpFamilies } from './em-emp-families.model';
import { EmEmpFamiliesPopupService } from './em-emp-families-popup.service';
import { EmEmpFamiliesService } from './em-emp-families.service';
import { RgFamilyRoles, RgFamilyRolesService } from '../rg-family-roles';
import { EmEmployees, EmEmployeesService } from '../em-employees';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-families-dialog',
    templateUrl: './em-emp-families-dialog.component.html'
})
export class EmEmpFamiliesDialogComponent implements OnInit {
    employee: EmEmployees;
    emEmpFamilies: EmEmpFamilies;
    isSaving: boolean;

    idfamilies: RgFamilyRoles[];

    idemployees: EmEmployees[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private emEmpFamiliesService: EmEmpFamiliesService,
        private rgFamilyRolesService: RgFamilyRolesService,
        private emEmployeesService: EmEmployeesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.rgFamilyRolesService
            .query({filter: 'emempfamilies-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpFamilies.idFamily || !this.emEmpFamilies.idFamily.id) {
                    this.idfamilies = res.json;
                } else {
                    this.rgFamilyRolesService
                        .find(this.emEmpFamilies.idFamily.id)
                        .subscribe((subRes: RgFamilyRoles) => {
                            this.idfamilies = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.emEmployeesService
            .query({filter: 'emempfamilies-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpFamilies.idEmployee || !this.emEmpFamilies.idEmployee.id) {
                    this.idemployees = res.json;
                } else {
                    this.emEmployeesService
                        .find(this.emEmpFamilies.idEmployee.id)
                        .subscribe((subRes: EmEmployees) => {
                            this.idemployees = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.emEmpFamilies.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emEmpFamiliesService.update(this.emEmpFamilies));
        } else {
            if(this.employee){
                this.emEmpFamilies.idEmployee = this.employee;
            }
            this.subscribeToSaveResponse(
                this.emEmpFamiliesService.create(this.emEmpFamilies));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmEmpFamilies>) {
        result.subscribe((res: EmEmpFamilies) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmEmpFamilies) {
        this.eventManager.broadcast({ name: 'emEmpFamiliesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRgFamilyRolesById(index: number, item: RgFamilyRoles) {
        return item.id;
    }

    trackEmEmployeesById(index: number, item: EmEmployees) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-em-emp-families-popup',
    template: ''
})
export class EmEmpFamiliesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpFamiliesPopupService: EmEmpFamiliesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emEmpFamiliesPopupService
                    .open(EmEmpFamiliesDialogComponent as Component, params['id']);
            } else if (params['employeeId']) {
                this.emEmpFamiliesPopupService
                    .open(EmEmpFamiliesDialogComponent as Component, null, params['employeeId']);
            } else {
                this.emEmpFamiliesPopupService.open(EmEmpFamiliesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
