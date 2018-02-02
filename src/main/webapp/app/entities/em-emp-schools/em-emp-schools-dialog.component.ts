import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpSchools } from './em-emp-schools.model';
import { EmEmpSchoolsPopupService } from './em-emp-schools-popup.service';
import { EmEmpSchoolsService } from './em-emp-schools.service';
import { RgSchools, RgSchoolsService } from '../rg-schools';
import { EmEmployees, EmEmployeesService } from '../em-employees';
import { RgQualifications, RgQualificationsService } from '../rg-qualifications';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-schools-dialog',
    templateUrl: './em-emp-schools-dialog.component.html'
})
export class EmEmpSchoolsDialogComponent implements OnInit {

    emEmpSchools: EmEmpSchools;
    isSaving: boolean;

    idschools: RgSchools[];

    idemployees: EmEmployees[];

    idqualifications: RgQualifications[];
    dateFromDp: any;
    dateToDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private emEmpSchoolsService: EmEmpSchoolsService,
        private rgSchoolsService: RgSchoolsService,
        private emEmployeesService: EmEmployeesService,
        private rgQualificationsService: RgQualificationsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.rgSchoolsService
            .query({filter: 'emempschools-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpSchools.idSchool || !this.emEmpSchools.idSchool.id) {
                    this.idschools = res.json;
                } else {
                    this.rgSchoolsService
                        .find(this.emEmpSchools.idSchool.id)
                        .subscribe((subRes: RgSchools) => {
                            this.idschools = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.emEmployeesService
            .query({filter: 'emempschools-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpSchools.idEmployee || !this.emEmpSchools.idEmployee.id) {
                    this.idemployees = res.json;
                } else {
                    this.emEmployeesService
                        .find(this.emEmpSchools.idEmployee.id)
                        .subscribe((subRes: EmEmployees) => {
                            this.idemployees = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.rgQualificationsService
            .query({filter: 'emempschools-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpSchools.idQualification || !this.emEmpSchools.idQualification.id) {
                    this.idqualifications = res.json;
                } else {
                    this.rgQualificationsService
                        .find(this.emEmpSchools.idQualification.id)
                        .subscribe((subRes: RgQualifications) => {
                            this.idqualifications = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.emEmpSchools.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emEmpSchoolsService.update(this.emEmpSchools));
        } else {
            this.subscribeToSaveResponse(
                this.emEmpSchoolsService.create(this.emEmpSchools));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmEmpSchools>) {
        result.subscribe((res: EmEmpSchools) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmEmpSchools) {
        this.eventManager.broadcast({ name: 'emEmpSchoolsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRgSchoolsById(index: number, item: RgSchools) {
        return item.id;
    }

    trackEmEmployeesById(index: number, item: EmEmployees) {
        return item.id;
    }

    trackRgQualificationsById(index: number, item: RgQualifications) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-em-emp-schools-popup',
    template: ''
})
export class EmEmpSchoolsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpSchoolsPopupService: EmEmpSchoolsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emEmpSchoolsPopupService
                    .open(EmEmpSchoolsDialogComponent as Component, params['id']);
            } else {
                this.emEmpSchoolsPopupService
                    .open(EmEmpSchoolsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
