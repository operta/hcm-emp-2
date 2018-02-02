import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AtAccomplishmentTypes } from './at-accomplishment-types.model';
import { AtAccomplishmentTypesPopupService } from './at-accomplishment-types-popup.service';
import { AtAccomplishmentTypesService } from './at-accomplishment-types.service';

@Component({
    selector: 'jhi-at-accomplishment-types-delete-dialog',
    templateUrl: './at-accomplishment-types-delete-dialog.component.html'
})
export class AtAccomplishmentTypesDeleteDialogComponent {

    atAccomplishmentTypes: AtAccomplishmentTypes;

    constructor(
        private atAccomplishmentTypesService: AtAccomplishmentTypesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.atAccomplishmentTypesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'atAccomplishmentTypesListModification',
                content: 'Deleted an atAccomplishmentTypes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-at-accomplishment-types-delete-popup',
    template: ''
})
export class AtAccomplishmentTypesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private atAccomplishmentTypesPopupService: AtAccomplishmentTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.atAccomplishmentTypesPopupService
                .open(AtAccomplishmentTypesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
