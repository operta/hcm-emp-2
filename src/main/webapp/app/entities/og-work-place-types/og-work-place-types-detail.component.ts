import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OgWorkPlaceTypes } from './og-work-place-types.model';
import { OgWorkPlaceTypesService } from './og-work-place-types.service';

@Component({
    selector: 'jhi-og-work-place-types-detail',
    templateUrl: './og-work-place-types-detail.component.html'
})
export class OgWorkPlaceTypesDetailComponent implements OnInit, OnDestroy {

    ogWorkPlaceTypes: OgWorkPlaceTypes;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ogWorkPlaceTypesService: OgWorkPlaceTypesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOgWorkPlaceTypes();
    }

    load(id) {
        this.ogWorkPlaceTypesService.find(id).subscribe((ogWorkPlaceTypes) => {
            this.ogWorkPlaceTypes = ogWorkPlaceTypes;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOgWorkPlaceTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ogWorkPlaceTypesListModification',
            (response) => this.load(this.ogWorkPlaceTypes.id)
        );
    }
}
