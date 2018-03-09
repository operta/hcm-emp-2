import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ApConstants } from './ap-constants.model';
import { ApConstantsPopupService } from './ap-constants-popup.service';
import { ApConstantsService } from './ap-constants.service';

@Component({
    selector: 'jhi-ap-constants-delete-dialog',
    templateUrl: './ap-constants-delete-dialog.component.html'
})
export class ApConstantsDeleteDialogComponent {

    apConstants: ApConstants;

    constructor(
        private apConstantsService: ApConstantsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.apConstantsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'apConstantsListModification',
                content: 'Deleted an apConstants'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ap-constants-delete-popup',
    template: ''
})
export class ApConstantsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private apConstantsPopupService: ApConstantsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.apConstantsPopupService
                .open(ApConstantsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
