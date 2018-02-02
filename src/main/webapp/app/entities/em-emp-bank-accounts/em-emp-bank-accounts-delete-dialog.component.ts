import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpBankAccounts } from './em-emp-bank-accounts.model';
import { EmEmpBankAccountsPopupService } from './em-emp-bank-accounts-popup.service';
import { EmEmpBankAccountsService } from './em-emp-bank-accounts.service';

@Component({
    selector: 'jhi-em-emp-bank-accounts-delete-dialog',
    templateUrl: './em-emp-bank-accounts-delete-dialog.component.html'
})
export class EmEmpBankAccountsDeleteDialogComponent {

    emEmpBankAccounts: EmEmpBankAccounts;

    constructor(
        private emEmpBankAccountsService: EmEmpBankAccountsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emEmpBankAccountsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emEmpBankAccountsListModification',
                content: 'Deleted an emEmpBankAccounts'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-emp-bank-accounts-delete-popup',
    template: ''
})
export class EmEmpBankAccountsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpBankAccountsPopupService: EmEmpBankAccountsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emEmpBankAccountsPopupService
                .open(EmEmpBankAccountsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
