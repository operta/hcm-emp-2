import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RgRegionTypes } from './rg-region-types.model';
import { RgRegionTypesService } from './rg-region-types.service';

@Component({
    selector: 'jhi-rg-region-types-detail',
    templateUrl: './rg-region-types-detail.component.html'
})
export class RgRegionTypesDetailComponent implements OnInit, OnDestroy {

    rgRegionTypes: RgRegionTypes;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rgRegionTypesService: RgRegionTypesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRgRegionTypes();
    }

    load(id) {
        this.rgRegionTypesService.find(id).subscribe((rgRegionTypes) => {
            this.rgRegionTypes = rgRegionTypes;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRgRegionTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rgRegionTypesListModification',
            (response) => this.load(this.rgRegionTypes.id)
        );
    }
}
