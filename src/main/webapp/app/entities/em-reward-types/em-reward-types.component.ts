import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmRewardTypes } from './em-reward-types.model';
import { EmRewardTypesService } from './em-reward-types.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-reward-types',
    templateUrl: './em-reward-types.component.html'
})
export class EmRewardTypesComponent implements OnInit, OnDestroy {
emRewardTypes: EmRewardTypes[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emRewardTypesService: EmRewardTypesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emRewardTypesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emRewardTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmRewardTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmRewardTypes) {
        return item.id;
    }
    registerChangeInEmRewardTypes() {
        this.eventSubscriber = this.eventManager.subscribe('emRewardTypesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
