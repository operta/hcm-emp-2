import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpNotes } from './em-emp-notes.model';
import { EmEmpNotesPopupService } from './em-emp-notes-popup.service';
import { EmEmpNotesService } from './em-emp-notes.service';
import { EmEmployees, EmEmployeesService } from '../em-employees';
import { ResponseWrapper } from '../../shared';
import {Principal} from "../../shared/auth/principal.service";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'jhi-em-emp-notes-dialog',
    templateUrl: './em-emp-notes-dialog.component.html'
})
export class EmEmpNotesDialogComponent implements OnInit {

    emEmpNotes: EmEmpNotes;
    isSaving: boolean;
    accountId: number;
    idemployees: EmEmployees[];
    employee: EmEmployees;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private emEmpNotesService: EmEmpNotesService,
        private emEmployeesService: EmEmployeesService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private datePipe: DatePipe
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;

        if (this.emEmpNotes.id !== undefined) {
           this.emEmpNotes.updatedAt = new Date();
            this.subscribeToSaveResponse(
                this.emEmpNotesService.update(this.emEmpNotes));
        } else {
            this.emEmpNotes.idEmployee = this.employee;
            this.emEmpNotes.updatedAt = new Date();
            this.subscribeToSaveResponse(
                this.emEmpNotesService.create(this.emEmpNotes));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmEmpNotes>) {
        result.subscribe((res: EmEmpNotes) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmEmpNotes) {
        this.eventManager.broadcast({ name: 'emEmpNotesListModification', content: 'OK'});
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
    selector: 'jhi-em-emp-notes-popup',
    template: ''
})
export class EmEmpNotesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpNotesPopupService: EmEmpNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emEmpNotesPopupService
                    .open(EmEmpNotesDialogComponent as Component, params['id']);
            } else {
                this.emEmpNotesPopupService
                    .open(EmEmpNotesDialogComponent as Component, null, params['employeeId']);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
