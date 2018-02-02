import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmStatuses } from './em-statuses.model';
import { EmStatusesPopupService } from './em-statuses-popup.service';
import { EmStatusesService } from './em-statuses.service';

@Component({
    selector: 'jhi-em-statuses-delete-dialog',
    templateUrl: './em-statuses-delete-dialog.component.html'
})
export class EmStatusesDeleteDialogComponent {

    emStatuses: EmStatuses;

    constructor(
        private emStatusesService: EmStatusesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emStatusesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emStatusesListModification',
                content: 'Deleted an emStatuses'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-statuses-delete-popup',
    template: ''
})
export class EmStatusesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emStatusesPopupService: EmStatusesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emStatusesPopupService
                .open(EmStatusesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
