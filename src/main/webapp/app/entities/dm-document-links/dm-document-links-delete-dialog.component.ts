import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DmDocumentLinks } from './dm-document-links.model';
import { DmDocumentLinksPopupService } from './dm-document-links-popup.service';
import { DmDocumentLinksService } from './dm-document-links.service';

@Component({
    selector: 'jhi-dm-document-links-delete-dialog',
    templateUrl: './dm-document-links-delete-dialog.component.html'
})
export class DmDocumentLinksDeleteDialogComponent {

    dmDocumentLinks: DmDocumentLinks;

    constructor(
        private dmDocumentLinksService: DmDocumentLinksService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dmDocumentLinksService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dmDocumentLinksListModification',
                content: 'Deleted an dmDocumentLinks'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dm-document-links-delete-popup',
    template: ''
})
export class DmDocumentLinksDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dmDocumentLinksPopupService: DmDocumentLinksPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dmDocumentLinksPopupService
                .open(DmDocumentLinksDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
