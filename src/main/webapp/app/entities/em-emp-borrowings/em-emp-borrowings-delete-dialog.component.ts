import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpBorrowings } from './em-emp-borrowings.model';
import { EmEmpBorrowingsPopupService } from './em-emp-borrowings-popup.service';
import { EmEmpBorrowingsService } from './em-emp-borrowings.service';

@Component({
    selector: 'jhi-em-emp-borrowings-delete-dialog',
    templateUrl: './em-emp-borrowings-delete-dialog.component.html'
})
export class EmEmpBorrowingsDeleteDialogComponent {

    emEmpBorrowings: EmEmpBorrowings;

    constructor(
        private emEmpBorrowingsService: EmEmpBorrowingsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emEmpBorrowingsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emEmpBorrowingsListModification',
                content: 'Deleted an emEmpBorrowings'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-emp-borrowings-delete-popup',
    template: ''
})
export class EmEmpBorrowingsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpBorrowingsPopupService: EmEmpBorrowingsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emEmpBorrowingsPopupService
                .open(EmEmpBorrowingsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
