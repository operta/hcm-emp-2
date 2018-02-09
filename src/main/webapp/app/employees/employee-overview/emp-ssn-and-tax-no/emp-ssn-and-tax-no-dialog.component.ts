import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { EmpSsnAndTaxNoPopupService } from './emp-ssn-and-tax-no-popup.service';
import {LeLegalEntities} from "../../../entities/le-legal-entities/le-legal-entities.model";
import {EmEmployeesService} from "../../../entities/em-employees/em-employees.service";
import {EmEmployees} from "../../../entities/em-employees/em-employees.model";
import {LeLegalEntitiesService} from "../../../entities/le-legal-entities/le-legal-entities.service";

@Component({
    selector: 'jhi-emp-ssn-and-tax-no-dialog',
    templateUrl: './emp-ssn-and-tax-no-dialog.component.html'
})
export class EmpSsnAndTaxNoDialogComponent implements OnInit {
    employee: EmEmployees;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private employeeService: EmEmployeesService,
        private legalService: LeLegalEntitiesService,
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
            this.subscribeToSaveResponse(this.employeeService.updatePersonalInfo(this.employee));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmEmployees>) {
        result
            .subscribe(
                (res: EmEmployees) => {
                    this.onSaveSuccess(res);
                    },
                (res: Response) => this.onSaveError()
            );
    }

    private onSaveSuccess(result: LeLegalEntities) {
        this.eventManager.broadcast({ name: 'SsnAndTaxNoModification', content: 'OK'});
        this.isSaving = false;
        this.legalService.update(this.employee.idLegalEntity).subscribe();
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

}

@Component({
    selector: 'jhi-emp-ssn-and-tax-no-popup',
    template: ''
})
export class EmpSsnAndTaxNoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private empSsnAndTaxNoPopupService: EmpSsnAndTaxNoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.empSsnAndTaxNoPopupService
                    .open(EmpSsnAndTaxNoDialogComponent as Component, params['id']);
            } else {
                this.empSsnAndTaxNoPopupService
                    .open(EmpSsnAndTaxNoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
