import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RgIdentificationTypes } from './rg-identification-types.model';
import { RgIdentificationTypesPopupService } from './rg-identification-types-popup.service';
import { RgIdentificationTypesService } from './rg-identification-types.service';

@Component({
    selector: 'jhi-rg-identification-types-delete-dialog',
    templateUrl: './rg-identification-types-delete-dialog.component.html'
})
export class RgIdentificationTypesDeleteDialogComponent {

    rgIdentificationTypes: RgIdentificationTypes;

    constructor(
        private rgIdentificationTypesService: RgIdentificationTypesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rgIdentificationTypesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rgIdentificationTypesListModification',
                content: 'Deleted an rgIdentificationTypes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rg-identification-types-delete-popup',
    template: ''
})
export class RgIdentificationTypesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rgIdentificationTypesPopupService: RgIdentificationTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.rgIdentificationTypesPopupService
                .open(RgIdentificationTypesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
