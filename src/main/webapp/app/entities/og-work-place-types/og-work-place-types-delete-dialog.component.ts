import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OgWorkPlaceTypes } from './og-work-place-types.model';
import { OgWorkPlaceTypesPopupService } from './og-work-place-types-popup.service';
import { OgWorkPlaceTypesService } from './og-work-place-types.service';

@Component({
    selector: 'jhi-og-work-place-types-delete-dialog',
    templateUrl: './og-work-place-types-delete-dialog.component.html'
})
export class OgWorkPlaceTypesDeleteDialogComponent {

    ogWorkPlaceTypes: OgWorkPlaceTypes;

    constructor(
        private ogWorkPlaceTypesService: OgWorkPlaceTypesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ogWorkPlaceTypesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ogWorkPlaceTypesListModification',
                content: 'Deleted an ogWorkPlaceTypes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-og-work-place-types-delete-popup',
    template: ''
})
export class OgWorkPlaceTypesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ogWorkPlaceTypesPopupService: OgWorkPlaceTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ogWorkPlaceTypesPopupService
                .open(OgWorkPlaceTypesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
