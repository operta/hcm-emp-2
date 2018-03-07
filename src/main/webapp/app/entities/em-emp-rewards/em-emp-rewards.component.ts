import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpRewards } from './em-emp-rewards.model';
import { EmEmpRewardsService } from './em-emp-rewards.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-rewards',
    templateUrl: './em-emp-rewards.component.html'
})
export class EmEmpRewardsComponent implements OnInit, OnDestroy {
emEmpRewards: EmEmpRewards[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emEmpRewardsService: EmEmpRewardsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emEmpRewardsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emEmpRewards = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmEmpRewards();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmEmpRewards) {
        return item.id;
    }
    registerChangeInEmEmpRewards() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpRewardsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
