import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DmDocumentTypes } from './dm-document-types.model';
import { DmDocumentTypesPopupService } from './dm-document-types-popup.service';
import { DmDocumentTypesService } from './dm-document-types.service';

@Component({
    selector: 'jhi-dm-document-types-delete-dialog',
    templateUrl: './dm-document-types-delete-dialog.component.html'
})
export class DmDocumentTypesDeleteDialogComponent {

    dmDocumentTypes: DmDocumentTypes;

    constructor(
        private dmDocumentTypesService: DmDocumentTypesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dmDocumentTypesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dmDocumentTypesListModification',
                content: 'Deleted an dmDocumentTypes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dm-document-types-delete-popup',
    template: ''
})
export class DmDocumentTypesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dmDocumentTypesPopupService: DmDocumentTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dmDocumentTypesPopupService
                .open(DmDocumentTypesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
