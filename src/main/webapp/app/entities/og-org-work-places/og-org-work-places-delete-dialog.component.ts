import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OgOrgWorkPlaces } from './og-org-work-places.model';
import { OgOrgWorkPlacesPopupService } from './og-org-work-places-popup.service';
import { OgOrgWorkPlacesService } from './og-org-work-places.service';

@Component({
    selector: 'jhi-og-org-work-places-delete-dialog',
    templateUrl: './og-org-work-places-delete-dialog.component.html'
})
export class OgOrgWorkPlacesDeleteDialogComponent {

    ogOrgWorkPlaces: OgOrgWorkPlaces;

    constructor(
        private ogOrgWorkPlacesService: OgOrgWorkPlacesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ogOrgWorkPlacesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ogOrgWorkPlacesListModification',
                content: 'Deleted an ogOrgWorkPlaces'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-og-org-work-places-delete-popup',
    template: ''
})
export class OgOrgWorkPlacesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ogOrgWorkPlacesPopupService: OgOrgWorkPlacesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ogOrgWorkPlacesPopupService
                .open(OgOrgWorkPlacesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
