import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { DmDocumentLinks } from './dm-document-links.model';
import { DmDocumentLinksPopupService } from './dm-document-links-popup.service';
import { DmDocumentLinksService } from './dm-document-links.service';

@Component({
    selector: 'jhi-dm-document-links-dialog',
    templateUrl: './dm-document-links-dialog.component.html'
})
export class DmDocumentLinksDialogComponent implements OnInit {

    dmDocumentLinks: DmDocumentLinks;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private dmDocumentLinksService: DmDocumentLinksService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dmDocumentLinks.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dmDocumentLinksService.update(this.dmDocumentLinks));
        } else {
            this.subscribeToSaveResponse(
                this.dmDocumentLinksService.create(this.dmDocumentLinks));
        }
    }

    private subscribeToSaveResponse(result: Observable<DmDocumentLinks>) {
        result.subscribe((res: DmDocumentLinks) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DmDocumentLinks) {
        this.eventManager.broadcast({ name: 'dmDocumentLinksListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-dm-document-links-popup',
    template: ''
})
export class DmDocumentLinksPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dmDocumentLinksPopupService: DmDocumentLinksPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dmDocumentLinksPopupService
                    .open(DmDocumentLinksDialogComponent as Component, params['id']);
            } else {
                this.dmDocumentLinksPopupService
                    .open(DmDocumentLinksDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
