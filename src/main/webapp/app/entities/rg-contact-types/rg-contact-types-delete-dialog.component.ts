import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RgContactTypes } from './rg-contact-types.model';
import { RgContactTypesPopupService } from './rg-contact-types-popup.service';
import { RgContactTypesService } from './rg-contact-types.service';

@Component({
    selector: 'jhi-rg-contact-types-delete-dialog',
    templateUrl: './rg-contact-types-delete-dialog.component.html'
})
export class RgContactTypesDeleteDialogComponent {

    rgContactTypes: RgContactTypes;

    constructor(
        private rgContactTypesService: RgContactTypesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rgContactTypesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rgContactTypesListModification',
                content: 'Deleted an rgContactTypes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rg-contact-types-delete-popup',
    template: ''
})
export class RgContactTypesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rgContactTypesPopupService: RgContactTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.rgContactTypesPopupService
                .open(RgContactTypesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
