import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmPenalties } from './em-penalties.model';
import { EmPenaltiesPopupService } from './em-penalties-popup.service';
import { EmPenaltiesService } from './em-penalties.service';
import { EmEmployees, EmEmployeesService } from '../em-employees';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-penalties-dialog',
    templateUrl: './em-penalties-dialog.component.html'
})
export class EmPenaltiesDialogComponent implements OnInit {
    employee: EmEmployees;
    emPenalties: EmPenalties;
    isSaving: boolean;

    idemployees: EmEmployees[];
    dateFromDp: any;
    dateToDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private emPenaltiesService: EmPenaltiesService,
        private emEmployeesService: EmEmployeesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.emEmployeesService
            .query({filter: 'empenalties-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emPenalties.idEmployee || !this.emPenalties.idEmployee.id) {
                    this.idemployees = res.json;
                } else {
                    this.emEmployeesService
                        .find(this.emPenalties.idEmployee.id)
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
        if (this.emPenalties.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emPenaltiesService.update(this.emPenalties));
        } else {
            if(this.employee) {
                this.emPenalties.idEmployee = this.employee;
            }
            this.subscribeToSaveResponse(
                this.emPenaltiesService.create(this.emPenalties));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmPenalties>) {
        result.subscribe((res: EmPenalties) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmPenalties) {
        this.eventManager.broadcast({ name: 'emPenaltiesListModification', content: 'OK'});
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
    selector: 'jhi-em-penalties-popup',
    template: ''
})
export class EmPenaltiesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emPenaltiesPopupService: EmPenaltiesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emPenaltiesPopupService
                    .open(EmPenaltiesDialogComponent as Component, params['id']);
            } else if (params['employeeId']) {
                this.emPenaltiesPopupService.open(EmPenaltiesDialogComponent as Component, null, params['employeeId']);
            } else {
                this.emPenaltiesPopupService
                    .open(EmPenaltiesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
