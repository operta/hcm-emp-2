import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpRewards } from './em-emp-rewards.model';
import { EmEmpRewardsService } from './em-emp-rewards.service';

@Component({
    selector: 'jhi-em-emp-rewards-detail',
    templateUrl: './em-emp-rewards-detail.component.html'
})
export class EmEmpRewardsDetailComponent implements OnInit, OnDestroy {

    emEmpRewards: EmEmpRewards;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emEmpRewardsService: EmEmpRewardsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmEmpRewards();
    }

    load(id) {
        this.emEmpRewardsService.find(id).subscribe((emEmpRewards) => {
            this.emEmpRewards = emEmpRewards;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmEmpRewards() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emEmpRewardsListModification',
            (response) => this.load(this.emEmpRewards.id)
        );
    }
}
