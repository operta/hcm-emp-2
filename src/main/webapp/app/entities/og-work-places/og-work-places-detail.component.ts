import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OgWorkPlaces } from './og-work-places.model';
import { OgWorkPlacesService } from './og-work-places.service';

@Component({
    selector: 'jhi-og-work-places-detail',
    templateUrl: './og-work-places-detail.component.html'
})
export class OgWorkPlacesDetailComponent implements OnInit, OnDestroy {

    ogWorkPlaces: OgWorkPlaces;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ogWorkPlacesService: OgWorkPlacesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOgWorkPlaces();
    }

    load(id) {
        this.ogWorkPlacesService.find(id).subscribe((ogWorkPlaces) => {
            this.ogWorkPlaces = ogWorkPlaces;
            console.log(this.ogWorkPlaces);
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOgWorkPlaces() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ogWorkPlacesListModification',
            (response) => this.load(this.ogWorkPlaces.id)
        );
    }
}
