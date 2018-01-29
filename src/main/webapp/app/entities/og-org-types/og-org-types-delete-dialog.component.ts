import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OgOrgTypes } from './og-org-types.model';
import { OgOrgTypesPopupService } from './og-org-types-popup.service';
import { OgOrgTypesService } from './og-org-types.service';

@Component({
    selector: 'jhi-og-org-types-delete-dialog',
    templateUrl: './og-org-types-delete-dialog.component.html'
})
export class OgOrgTypesDeleteDialogComponent {

    ogOrgTypes: OgOrgTypes;

    constructor(
        private ogOrgTypesService: OgOrgTypesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ogOrgTypesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ogOrgTypesListModification',
                content: 'Deleted an ogOrgTypes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-og-org-types-delete-popup',
    template: ''
})
export class OgOrgTypesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ogOrgTypesPopupService: OgOrgTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ogOrgTypesPopupService
                .open(OgOrgTypesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
