import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmRewardTypes } from './em-reward-types.model';
import { EmRewardTypesService } from './em-reward-types.service';

@Component({
    selector: 'jhi-em-reward-types-detail',
    templateUrl: './em-reward-types-detail.component.html'
})
export class EmRewardTypesDetailComponent implements OnInit, OnDestroy {

    emRewardTypes: EmRewardTypes;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emRewardTypesService: EmRewardTypesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmRewardTypes();
    }

    load(id) {
        this.emRewardTypesService.find(id).subscribe((emRewardTypes) => {
            this.emRewardTypes = emRewardTypes;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmRewardTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emRewardTypesListModification',
            (response) => this.load(this.emRewardTypes.id)
        );
    }
}
