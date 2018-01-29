import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RgRegions } from './rg-regions.model';
import { RgRegionsPopupService } from './rg-regions-popup.service';
import { RgRegionsService } from './rg-regions.service';

@Component({
    selector: 'jhi-rg-regions-delete-dialog',
    templateUrl: './rg-regions-delete-dialog.component.html'
})
export class RgRegionsDeleteDialogComponent {

    rgRegions: RgRegions;

    constructor(
        private rgRegionsService: RgRegionsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rgRegionsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rgRegionsListModification',
                content: 'Deleted an rgRegions'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rg-regions-delete-popup',
    template: ''
})
export class RgRegionsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rgRegionsPopupService: RgRegionsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.rgRegionsPopupService
                .open(RgRegionsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
