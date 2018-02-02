import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpDocuments } from './em-emp-documents.model';
import { EmEmpDocumentsPopupService } from './em-emp-documents-popup.service';
import { EmEmpDocumentsService } from './em-emp-documents.service';

@Component({
    selector: 'jhi-em-emp-documents-delete-dialog',
    templateUrl: './em-emp-documents-delete-dialog.component.html'
})
export class EmEmpDocumentsDeleteDialogComponent {

    emEmpDocuments: EmEmpDocuments;

    constructor(
        private emEmpDocumentsService: EmEmpDocumentsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emEmpDocumentsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emEmpDocumentsListModification',
                content: 'Deleted an emEmpDocuments'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-emp-documents-delete-popup',
    template: ''
})
export class EmEmpDocumentsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpDocumentsPopupService: EmEmpDocumentsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emEmpDocumentsPopupService
                .open(EmEmpDocumentsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
