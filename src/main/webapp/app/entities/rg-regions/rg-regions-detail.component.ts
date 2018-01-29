import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RgRegions } from './rg-regions.model';
import { RgRegionsService } from './rg-regions.service';

@Component({
    selector: 'jhi-rg-regions-detail',
    templateUrl: './rg-regions-detail.component.html'
})
export class RgRegionsDetailComponent implements OnInit, OnDestroy {

    rgRegions: RgRegions;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rgRegionsService: RgRegionsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRgRegions();
    }

    load(id) {
        this.rgRegionsService.find(id).subscribe((rgRegions) => {
            this.rgRegions = rgRegions;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRgRegions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rgRegionsListModification',
            (response) => this.load(this.rgRegions.id)
        );
    }
}
