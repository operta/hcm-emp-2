import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LeLegalEntities } from './le-legal-entities.model';
import { LeLegalEntitiesService } from './le-legal-entities.service';

@Component({
    selector: 'jhi-le-legal-entities-detail',
    templateUrl: './le-legal-entities-detail.component.html'
})
export class LeLegalEntitiesDetailComponent implements OnInit, OnDestroy {

    leLegalEntities: LeLegalEntities;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private leLegalEntitiesService: LeLegalEntitiesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLeLegalEntities();
    }

    load(id) {
        this.leLegalEntitiesService.find(id).subscribe((leLegalEntities) => {
            this.leLegalEntities = leLegalEntities;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLeLegalEntities() {
        this.eventSubscriber = this.eventManager.subscribe(
            'leLegalEntitiesListModification',
            (response) => this.load(this.leLegalEntities.id)
        );
    }
}
