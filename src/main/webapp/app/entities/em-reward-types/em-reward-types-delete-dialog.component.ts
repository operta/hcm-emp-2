import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmRewardTypes } from './em-reward-types.model';
import { EmRewardTypesPopupService } from './em-reward-types-popup.service';
import { EmRewardTypesService } from './em-reward-types.service';

@Component({
    selector: 'jhi-em-reward-types-delete-dialog',
    templateUrl: './em-reward-types-delete-dialog.component.html'
})
export class EmRewardTypesDeleteDialogComponent {

    emRewardTypes: EmRewardTypes;

    constructor(
        private emRewardTypesService: EmRewardTypesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emRewardTypesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emRewardTypesListModification',
                content: 'Deleted an emRewardTypes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-reward-types-delete-popup',
    template: ''
})
export class EmRewardTypesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emRewardTypesPopupService: EmRewardTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emRewardTypesPopupService
                .open(EmRewardTypesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
