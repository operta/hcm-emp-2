import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RgIdentificationTypes } from './rg-identification-types.model';
import { RgIdentificationTypesPopupService } from './rg-identification-types-popup.service';
import { RgIdentificationTypesService } from './rg-identification-types.service';

@Component({
    selector: 'jhi-rg-identification-types-dialog',
    templateUrl: './rg-identification-types-dialog.component.html'
})
export class RgIdentificationTypesDialogComponent implements OnInit {

    rgIdentificationTypes: RgIdentificationTypes;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private rgIdentificationTypesService: RgIdentificationTypesService,
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
        if (this.rgIdentificationTypes.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rgIdentificationTypesService.update(this.rgIdentificationTypes));
        } else {
            this.subscribeToSaveResponse(
                this.rgIdentificationTypesService.create(this.rgIdentificationTypes));
        }
    }

    private subscribeToSaveResponse(result: Observable<RgIdentificationTypes>) {
        result.subscribe((res: RgIdentificationTypes) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RgIdentificationTypes) {
        this.eventManager.broadcast({ name: 'rgIdentificationTypesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-rg-identification-types-popup',
    template: ''
})
export class RgIdentificationTypesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rgIdentificationTypesPopupService: RgIdentificationTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rgIdentificationTypesPopupService
                    .open(RgIdentificationTypesDialogComponent as Component, params['id']);
            } else {
                this.rgIdentificationTypesPopupService
                    .open(RgIdentificationTypesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
