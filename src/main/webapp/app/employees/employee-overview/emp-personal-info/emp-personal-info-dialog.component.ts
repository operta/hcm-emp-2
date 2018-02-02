import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';


import { EmpPersonalInfoPopupService } from './emp-personal-info-popup.service';



import {LeLegalEntities} from "../../../entities/le-legal-entities/le-legal-entities.model";
import {LeLegalEntitiesService} from "../../../entities/le-legal-entities/le-legal-entities.service";
import {EmEmployeesService} from "../../../entities/em-employees/em-employees.service";
import {EmEmployees} from "../../../entities/em-employees/em-employees.model";

@Component({
    selector: 'jhi-emp-personal-info-dialog',
    templateUrl: './emp-personal-info-dialog.component.html'
})
export class EmpPersonalInfoDialogComponent implements OnInit {

    employee: EmEmployees;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private employeeService: EmEmployeesService,
        private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.employee.id !== undefined) {
            this.subscribeToSaveResponse(
                this.employeeService.update(this.employee));
        } else {
            this.subscribeToSaveResponse(
                this.employeeService.create(this.employee));
        }
    }

    private subscribeToSaveResponse(result: Observable<LeLegalEntities>) {
        result.subscribe((res: LeLegalEntities) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: LeLegalEntities) {
        this.eventManager.broadcast({ name: 'EmployeeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

}

@Component({
    selector: 'jhi-emp-personal-info-popup',
    template: ''
})
export class EmpPersonalInfoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private empPersonalInfoPopupService: EmpPersonalInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.empPersonalInfoPopupService
                    .open(EmpPersonalInfoDialogComponent as Component, params['id']);
            } else {
                this.empPersonalInfoPopupService
                    .open(EmpPersonalInfoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
