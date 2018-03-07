import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmInjuryTypes } from './em-injury-types.model';
import { EmInjuryTypesPopupService } from './em-injury-types-popup.service';
import { EmInjuryTypesService } from './em-injury-types.service';

@Component({
    selector: 'jhi-em-injury-types-delete-dialog',
    templateUrl: './em-injury-types-delete-dialog.component.html'
})
export class EmInjuryTypesDeleteDialogComponent {

    emInjuryTypes: EmInjuryTypes;

    constructor(
        private emInjuryTypesService: EmInjuryTypesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emInjuryTypesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emInjuryTypesListModification',
                content: 'Deleted an emInjuryTypes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-injury-types-delete-popup',
    template: ''
})
export class EmInjuryTypesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emInjuryTypesPopupService: EmInjuryTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emInjuryTypesPopupService
                .open(EmInjuryTypesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
