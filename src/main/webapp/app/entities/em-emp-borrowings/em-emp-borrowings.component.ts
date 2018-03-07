import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpBorrowings } from './em-emp-borrowings.model';
import { EmEmpBorrowingsService } from './em-emp-borrowings.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-borrowings',
    templateUrl: './em-emp-borrowings.component.html'
})
export class EmEmpBorrowingsComponent implements OnInit, OnDestroy {
emEmpBorrowings: EmEmpBorrowings[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emEmpBorrowingsService: EmEmpBorrowingsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emEmpBorrowingsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emEmpBorrowings = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmEmpBorrowings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmEmpBorrowings) {
        return item.id;
    }
    registerChangeInEmEmpBorrowings() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpBorrowingsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
