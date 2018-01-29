import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LeLegalEntities } from './le-legal-entities.model';
import { LeLegalEntitiesPopupService } from './le-legal-entities-popup.service';
import { LeLegalEntitiesService } from './le-legal-entities.service';

@Component({
    selector: 'jhi-le-legal-entities-delete-dialog',
    templateUrl: './le-legal-entities-delete-dialog.component.html'
})
export class LeLegalEntitiesDeleteDialogComponent {

    leLegalEntities: LeLegalEntities;

    constructor(
        private leLegalEntitiesService: LeLegalEntitiesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.leLegalEntitiesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'leLegalEntitiesListModification',
                content: 'Deleted an leLegalEntities'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-le-legal-entities-delete-popup',
    template: ''
})
export class LeLegalEntitiesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private leLegalEntitiesPopupService: LeLegalEntitiesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.leLegalEntitiesPopupService
                .open(LeLegalEntitiesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
