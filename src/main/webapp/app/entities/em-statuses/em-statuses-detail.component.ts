import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmStatuses } from './em-statuses.model';
import { EmStatusesService } from './em-statuses.service';

@Component({
    selector: 'jhi-em-statuses-detail',
    templateUrl: './em-statuses-detail.component.html'
})
export class EmStatusesDetailComponent implements OnInit, OnDestroy {

    emStatuses: EmStatuses;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emStatusesService: EmStatusesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmStatuses();
    }

    load(id) {
        this.emStatusesService.find(id).subscribe((emStatuses) => {
            this.emStatuses = emStatuses;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmStatuses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emStatusesListModification',
            (response) => this.load(this.emStatuses.id)
        );
    }
}
