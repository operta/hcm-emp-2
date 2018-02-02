import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpBankAccounts } from './em-emp-bank-accounts.model';
import { EmEmpBankAccountsService } from './em-emp-bank-accounts.service';

@Component({
    selector: 'jhi-em-emp-bank-accounts-detail',
    templateUrl: './em-emp-bank-accounts-detail.component.html'
})
export class EmEmpBankAccountsDetailComponent implements OnInit, OnDestroy {

    emEmpBankAccounts: EmEmpBankAccounts;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emEmpBankAccountsService: EmEmpBankAccountsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmEmpBankAccounts();
    }

    load(id) {
        this.emEmpBankAccountsService.find(id).subscribe((emEmpBankAccounts) => {
            this.emEmpBankAccounts = emEmpBankAccounts;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmEmpBankAccounts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emEmpBankAccountsListModification',
            (response) => this.load(this.emEmpBankAccounts.id)
        );
    }
}
