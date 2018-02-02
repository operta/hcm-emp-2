import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpTypes } from './em-emp-types.model';
import { EmEmpTypesPopupService } from './em-emp-types-popup.service';
import { EmEmpTypesService } from './em-emp-types.service';

@Component({
    selector: 'jhi-em-emp-types-dialog',
    templateUrl: './em-emp-types-dialog.component.html'
})
export class EmEmpTypesDialogComponent implements OnInit {

    emEmpTypes: EmEmpTypes;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private emEmpTypesService: EmEmpTypesService,
        private eventManager: JhiEventManager
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
        if (this.emEmpTypes.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emEmpTypesService.update(this.emEmpTypes));
        } else {
            this.subscribeToSaveResponse(
                this.emEmpTypesService.create(this.emEmpTypes));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmEmpTypes>) {
        result.subscribe((res: EmEmpTypes) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmEmpTypes) {
        this.eventManager.broadcast({ name: 'emEmpTypesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-em-emp-types-popup',
    template: ''
})
export class EmEmpTypesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpTypesPopupService: EmEmpTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emEmpTypesPopupService
                    .open(EmEmpTypesDialogComponent as Component, params['id']);
            } else {
                this.emEmpTypesPopupService
                    .open(EmEmpTypesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
