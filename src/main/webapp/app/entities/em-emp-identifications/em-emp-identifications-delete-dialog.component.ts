import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpIdentifications } from './em-emp-identifications.model';
import { EmEmpIdentificationsPopupService } from './em-emp-identifications-popup.service';
import { EmEmpIdentificationsService } from './em-emp-identifications.service';

@Component({
    selector: 'jhi-em-emp-identifications-delete-dialog',
    templateUrl: './em-emp-identifications-delete-dialog.component.html'
})
export class EmEmpIdentificationsDeleteDialogComponent {

    emEmpIdentifications: EmEmpIdentifications;

    constructor(
        private emEmpIdentificationsService: EmEmpIdentificationsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emEmpIdentificationsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emEmpIdentificationsListModification',
                content: 'Deleted an emEmpIdentifications'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-emp-identifications-delete-popup',
    template: ''
})
export class EmEmpIdentificationsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpIdentificationsPopupService: EmEmpIdentificationsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emEmpIdentificationsPopupService
                .open(EmEmpIdentificationsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
