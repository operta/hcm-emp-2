import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpTypes } from './em-emp-types.model';
import { EmEmpTypesPopupService } from './em-emp-types-popup.service';
import { EmEmpTypesService } from './em-emp-types.service';

@Component({
    selector: 'jhi-em-emp-types-delete-dialog',
    templateUrl: './em-emp-types-delete-dialog.component.html'
})
export class EmEmpTypesDeleteDialogComponent {

    emEmpTypes: EmEmpTypes;

    constructor(
        private emEmpTypesService: EmEmpTypesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emEmpTypesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emEmpTypesListModification',
                content: 'Deleted an emEmpTypes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-emp-types-delete-popup',
    template: ''
})
export class EmEmpTypesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpTypesPopupService: EmEmpTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emEmpTypesPopupService
                .open(EmEmpTypesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
