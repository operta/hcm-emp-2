import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpPreviousJobs } from './em-emp-previous-jobs.model';
import { EmEmpPreviousJobsPopupService } from './em-emp-previous-jobs-popup.service';
import { EmEmpPreviousJobsService } from './em-emp-previous-jobs.service';
import { EmEmployees, EmEmployeesService } from '../em-employees';
import { ResponseWrapper } from '../../shared';
import {Principal} from "../../shared/auth/principal.service";

@Component({
    selector: 'jhi-em-emp-previous-jobs-dialog',
    templateUrl: './em-emp-previous-jobs-dialog.component.html'
})
export class EmEmpPreviousJobsDialogComponent implements OnInit {
    emEmpPreviousJobs: EmEmpPreviousJobs;
    isSaving: boolean;
    currentAccount: any;
    employee: EmEmployees;
    managerPosition = false;
    idemployees: EmEmployees[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private emEmpPreviousJobsService: EmEmpPreviousJobsService,
        private emEmployeesService: EmEmployeesService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.emEmployeesService
            .query({filter: 'ememppreviousjobs-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpPreviousJobs.idEmployee || !this.emEmpPreviousJobs.idEmployee.id) {
                    this.idemployees = res.json;
                } else {
                    this.emEmployeesService
                        .find(this.emEmpPreviousJobs.idEmployee.id)
                        .subscribe((subRes: EmEmployees) => {
                            this.idemployees = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));

        if(this.emEmpPreviousJobs) {
            if(this.emEmpPreviousJobs.managerPosition == "T"){
                this.managerPosition = true;
            } else {
                this.managerPosition = false;
            }
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        if (this.managerPosition) {
            this.emEmpPreviousJobs.managerPosition = "T";
        } else {
            this.emEmpPreviousJobs.managerPosition = "F";
        }
        this.isSaving = true;

        if (this.emEmpPreviousJobs.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emEmpPreviousJobsService.update(this.emEmpPreviousJobs));
        } else {
            this.emEmpPreviousJobs.idEmployee = this.employee;
            this.subscribeToSaveResponse(
                this.emEmpPreviousJobsService.create(this.emEmpPreviousJobs));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmEmpPreviousJobs>) {
        result.subscribe((res: EmEmpPreviousJobs) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmEmpPreviousJobs) {
        this.eventManager.broadcast({ name: 'emEmpPreviousJobsListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-em-emp-previous-jobs-popup',
    template: ''
})
export class EmEmpPreviousJobsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpPreviousJobsPopupService: EmEmpPreviousJobsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emEmpPreviousJobsPopupService
                    .open(EmEmpPreviousJobsDialogComponent as Component, params['id']);
            } else {
                this.emEmpPreviousJobsPopupService
                    .open(EmEmpPreviousJobsDialogComponent as Component, null, params['employeeId']);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
