import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DmDocumentTypes } from './dm-document-types.model';
import { DmDocumentTypesPopupService } from './dm-document-types-popup.service';
import { DmDocumentTypesService } from './dm-document-types.service';

@Component({
    selector: 'jhi-dm-document-types-dialog',
    templateUrl: './dm-document-types-dialog.component.html'
})
export class DmDocumentTypesDialogComponent implements OnInit {

    dmDocumentTypes: DmDocumentTypes;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dmDocumentTypesService: DmDocumentTypesService,
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
        if (this.dmDocumentTypes.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dmDocumentTypesService.update(this.dmDocumentTypes));
        } else {
            this.subscribeToSaveResponse(
                this.dmDocumentTypesService.create(this.dmDocumentTypes));
        }
    }

    private subscribeToSaveResponse(result: Observable<DmDocumentTypes>) {
        result.subscribe((res: DmDocumentTypes) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DmDocumentTypes) {
        this.eventManager.broadcast({ name: 'dmDocumentTypesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-dm-document-types-popup',
    template: ''
})
export class DmDocumentTypesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dmDocumentTypesPopupService: DmDocumentTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dmDocumentTypesPopupService
                    .open(DmDocumentTypesDialogComponent as Component, params['id']);
            } else {
                this.dmDocumentTypesPopupService
                    .open(DmDocumentTypesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
