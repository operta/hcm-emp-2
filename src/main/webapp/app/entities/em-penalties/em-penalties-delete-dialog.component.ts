import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmPenalties } from './em-penalties.model';
import { EmPenaltiesPopupService } from './em-penalties-popup.service';
import { EmPenaltiesService } from './em-penalties.service';

@Component({
    selector: 'jhi-em-penalties-delete-dialog',
    templateUrl: './em-penalties-delete-dialog.component.html'
})
export class EmPenaltiesDeleteDialogComponent {

    emPenalties: EmPenalties;

    constructor(
        private emPenaltiesService: EmPenaltiesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emPenaltiesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emPenaltiesListModification',
                content: 'Deleted an emPenalties'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-penalties-delete-popup',
    template: ''
})
export class EmPenaltiesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emPenaltiesPopupService: EmPenaltiesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emPenaltiesPopupService
                .open(EmPenaltiesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
