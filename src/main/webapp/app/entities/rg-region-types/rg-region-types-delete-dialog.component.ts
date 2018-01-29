import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RgRegionTypes } from './rg-region-types.model';
import { RgRegionTypesPopupService } from './rg-region-types-popup.service';
import { RgRegionTypesService } from './rg-region-types.service';

@Component({
    selector: 'jhi-rg-region-types-delete-dialog',
    templateUrl: './rg-region-types-delete-dialog.component.html'
})
export class RgRegionTypesDeleteDialogComponent {

    rgRegionTypes: RgRegionTypes;

    constructor(
        private rgRegionTypesService: RgRegionTypesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rgRegionTypesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rgRegionTypesListModification',
                content: 'Deleted an rgRegionTypes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rg-region-types-delete-popup',
    template: ''
})
export class RgRegionTypesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rgRegionTypesPopupService: RgRegionTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.rgRegionTypesPopupService
                .open(RgRegionTypesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
