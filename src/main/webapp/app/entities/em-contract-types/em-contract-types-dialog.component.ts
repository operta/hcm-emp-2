import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmContractTypes } from './em-contract-types.model';
import { EmContractTypesPopupService } from './em-contract-types-popup.service';
import { EmContractTypesService } from './em-contract-types.service';

@Component({
    selector: 'jhi-em-contract-types-dialog',
    templateUrl: './em-contract-types-dialog.component.html'
})
export class EmContractTypesDialogComponent implements OnInit {

    emContractTypes: EmContractTypes;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private emContractTypesService: EmContractTypesService,
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
        if (this.emContractTypes.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emContractTypesService.update(this.emContractTypes));
        } else {
            this.subscribeToSaveResponse(
                this.emContractTypesService.create(this.emContractTypes));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmContractTypes>) {
        result.subscribe((res: EmContractTypes) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmContractTypes) {
        this.eventManager.broadcast({ name: 'emContractTypesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-em-contract-types-popup',
    template: ''
})
export class EmContractTypesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emContractTypesPopupService: EmContractTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emContractTypesPopupService
                    .open(EmContractTypesDialogComponent as Component, params['id']);
            } else {
                this.emContractTypesPopupService
                    .open(EmContractTypesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
