import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpEmgContacts } from './em-emp-emg-contacts.model';
import { EmEmpEmgContactsPopupService } from './em-emp-emg-contacts-popup.service';
import { EmEmpEmgContactsService } from './em-emp-emg-contacts.service';

@Component({
    selector: 'jhi-em-emp-emg-contacts-delete-dialog',
    templateUrl: './em-emp-emg-contacts-delete-dialog.component.html'
})
export class EmEmpEmgContactsDeleteDialogComponent {

    emEmpEmgContacts: EmEmpEmgContacts;

    constructor(
        private emEmpEmgContactsService: EmEmpEmgContactsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emEmpEmgContactsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emEmpEmgContactsListModification',
                content: 'Deleted an emEmpEmgContacts'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-emp-emg-contacts-delete-popup',
    template: ''
})
export class EmEmpEmgContactsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpEmgContactsPopupService: EmEmpEmgContactsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emEmpEmgContactsPopupService
                .open(EmEmpEmgContactsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
