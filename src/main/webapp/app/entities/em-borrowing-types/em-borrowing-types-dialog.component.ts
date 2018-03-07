import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmBorrowingTypes } from './em-borrowing-types.model';
import { EmBorrowingTypesPopupService } from './em-borrowing-types-popup.service';
import { EmBorrowingTypesService } from './em-borrowing-types.service';

@Component({
    selector: 'jhi-em-borrowing-types-dialog',
    templateUrl: './em-borrowing-types-dialog.component.html'
})
export class EmBorrowingTypesDialogComponent implements OnInit {

    emBorrowingTypes: EmBorrowingTypes;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private emBorrowingTypesService: EmBorrowingTypesService,
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
        if (this.emBorrowingTypes.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emBorrowingTypesService.update(this.emBorrowingTypes));
        } else {
            this.subscribeToSaveResponse(
                this.emBorrowingTypesService.create(this.emBorrowingTypes));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmBorrowingTypes>) {
        result.subscribe((res: EmBorrowingTypes) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmBorrowingTypes) {
        this.eventManager.broadcast({ name: 'emBorrowingTypesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-em-borrowing-types-popup',
    template: ''
})
export class EmBorrowingTypesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emBorrowingTypesPopupService: EmBorrowingTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emBorrowingTypesPopupService
                    .open(EmBorrowingTypesDialogComponent as Component, params['id']);
            } else {
                this.emBorrowingTypesPopupService
                    .open(EmBorrowingTypesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
