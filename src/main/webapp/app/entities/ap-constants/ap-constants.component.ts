import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ApConstants } from './ap-constants.model';
import { ApConstantsService } from './ap-constants.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ap-constants',
    templateUrl: './ap-constants.component.html'
})
export class ApConstantsComponent implements OnInit, OnDestroy {
apConstants: ApConstants[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private apConstantsService: ApConstantsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.apConstantsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.apConstants = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInApConstants();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ApConstants) {
        return item.id;
    }
    registerChangeInApConstants() {
        this.eventSubscriber = this.eventManager.subscribe('apConstantsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
