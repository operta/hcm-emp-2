import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmContractTypes } from './em-contract-types.model';
import { EmContractTypesPopupService } from './em-contract-types-popup.service';
import { EmContractTypesService } from './em-contract-types.service';

@Component({
    selector: 'jhi-em-contract-types-delete-dialog',
    templateUrl: './em-contract-types-delete-dialog.component.html'
})
export class EmContractTypesDeleteDialogComponent {

    emContractTypes: EmContractTypes;

    constructor(
        private emContractTypesService: EmContractTypesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emContractTypesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emContractTypesListModification',
                content: 'Deleted an emContractTypes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-contract-types-delete-popup',
    template: ''
})
export class EmContractTypesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emContractTypesPopupService: EmContractTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emContractTypesPopupService
                .open(EmContractTypesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
