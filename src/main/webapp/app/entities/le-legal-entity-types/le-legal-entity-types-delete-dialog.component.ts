import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LeLegalEntityTypes } from './le-legal-entity-types.model';
import { LeLegalEntityTypesPopupService } from './le-legal-entity-types-popup.service';
import { LeLegalEntityTypesService } from './le-legal-entity-types.service';

@Component({
    selector: 'jhi-le-legal-entity-types-delete-dialog',
    templateUrl: './le-legal-entity-types-delete-dialog.component.html'
})
export class LeLegalEntityTypesDeleteDialogComponent {

    leLegalEntityTypes: LeLegalEntityTypes;

    constructor(
        private leLegalEntityTypesService: LeLegalEntityTypesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.leLegalEntityTypesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'leLegalEntityTypesListModification',
                content: 'Deleted an leLegalEntityTypes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-le-legal-entity-types-delete-popup',
    template: ''
})
export class LeLegalEntityTypesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private leLegalEntityTypesPopupService: LeLegalEntityTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.leLegalEntityTypesPopupService
                .open(LeLegalEntityTypesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
