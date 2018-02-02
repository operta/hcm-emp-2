import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OgWorkPlaces } from './og-work-places.model';
import { OgWorkPlacesPopupService } from './og-work-places-popup.service';
import { OgWorkPlacesService } from './og-work-places.service';

@Component({
    selector: 'jhi-og-work-places-delete-dialog',
    templateUrl: './og-work-places-delete-dialog.component.html'
})
export class OgWorkPlacesDeleteDialogComponent {

    ogWorkPlaces: OgWorkPlaces;

    constructor(
        private ogWorkPlacesService: OgWorkPlacesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ogWorkPlacesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ogWorkPlacesListModification',
                content: 'Deleted an ogWorkPlaces'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-og-work-places-delete-popup',
    template: ''
})
export class OgWorkPlacesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ogWorkPlacesPopupService: OgWorkPlacesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ogWorkPlacesPopupService
                .open(OgWorkPlacesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
