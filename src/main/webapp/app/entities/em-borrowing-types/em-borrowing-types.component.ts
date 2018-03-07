import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmBorrowingTypes } from './em-borrowing-types.model';
import { EmBorrowingTypesService } from './em-borrowing-types.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-borrowing-types',
    templateUrl: './em-borrowing-types.component.html'
})
export class EmBorrowingTypesComponent implements OnInit, OnDestroy {
emBorrowingTypes: EmBorrowingTypes[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emBorrowingTypesService: EmBorrowingTypesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emBorrowingTypesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emBorrowingTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmBorrowingTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmBorrowingTypes) {
        return item.id;
    }
    registerChangeInEmBorrowingTypes() {
        this.eventSubscriber = this.eventManager.subscribe('emBorrowingTypesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
