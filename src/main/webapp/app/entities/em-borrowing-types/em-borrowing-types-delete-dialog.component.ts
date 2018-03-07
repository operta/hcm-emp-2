import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmBorrowingTypes } from './em-borrowing-types.model';
import { EmBorrowingTypesPopupService } from './em-borrowing-types-popup.service';
import { EmBorrowingTypesService } from './em-borrowing-types.service';

@Component({
    selector: 'jhi-em-borrowing-types-delete-dialog',
    templateUrl: './em-borrowing-types-delete-dialog.component.html'
})
export class EmBorrowingTypesDeleteDialogComponent {

    emBorrowingTypes: EmBorrowingTypes;

    constructor(
        private emBorrowingTypesService: EmBorrowingTypesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emBorrowingTypesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emBorrowingTypesListModification',
                content: 'Deleted an emBorrowingTypes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-borrowing-types-delete-popup',
    template: ''
})
export class EmBorrowingTypesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emBorrowingTypesPopupService: EmBorrowingTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emBorrowingTypesPopupService
                .open(EmBorrowingTypesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
