import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpAccomplishments } from './em-emp-accomplishments.model';
import { EmEmpAccomplishmentsPopupService } from './em-emp-accomplishments-popup.service';
import { EmEmpAccomplishmentsService } from './em-emp-accomplishments.service';

@Component({
    selector: 'jhi-em-emp-accomplishments-delete-dialog',
    templateUrl: './em-emp-accomplishments-delete-dialog.component.html'
})
export class EmEmpAccomplishmentsDeleteDialogComponent {

    emEmpAccomplishments: EmEmpAccomplishments;

    constructor(
        private emEmpAccomplishmentsService: EmEmpAccomplishmentsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emEmpAccomplishmentsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emEmpAccomplishmentsListModification',
                content: 'Deleted an emEmpAccomplishments'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-emp-accomplishments-delete-popup',
    template: ''
})
export class EmEmpAccomplishmentsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpAccomplishmentsPopupService: EmEmpAccomplishmentsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emEmpAccomplishmentsPopupService
                .open(EmEmpAccomplishmentsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
