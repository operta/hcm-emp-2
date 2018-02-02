import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RgQualifications } from './rg-qualifications.model';
import { RgQualificationsPopupService } from './rg-qualifications-popup.service';
import { RgQualificationsService } from './rg-qualifications.service';

@Component({
    selector: 'jhi-rg-qualifications-delete-dialog',
    templateUrl: './rg-qualifications-delete-dialog.component.html'
})
export class RgQualificationsDeleteDialogComponent {

    rgQualifications: RgQualifications;

    constructor(
        private rgQualificationsService: RgQualificationsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rgQualificationsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rgQualificationsListModification',
                content: 'Deleted an rgQualifications'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rg-qualifications-delete-popup',
    template: ''
})
export class RgQualificationsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rgQualificationsPopupService: RgQualificationsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.rgQualificationsPopupService
                .open(RgQualificationsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
