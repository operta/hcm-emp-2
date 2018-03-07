import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmPenalties } from './em-penalties.model';
import { EmPenaltiesService } from './em-penalties.service';

@Component({
    selector: 'jhi-em-penalties-detail',
    templateUrl: './em-penalties-detail.component.html'
})
export class EmPenaltiesDetailComponent implements OnInit, OnDestroy {

    emPenalties: EmPenalties;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emPenaltiesService: EmPenaltiesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmPenalties();
    }

    load(id) {
        this.emPenaltiesService.find(id).subscribe((emPenalties) => {
            this.emPenalties = emPenalties;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmPenalties() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emPenaltiesListModification',
            (response) => this.load(this.emPenalties.id)
        );
    }
}
