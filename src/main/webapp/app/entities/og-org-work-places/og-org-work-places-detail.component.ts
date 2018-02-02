import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OgOrgWorkPlaces } from './og-org-work-places.model';
import { OgOrgWorkPlacesService } from './og-org-work-places.service';

@Component({
    selector: 'jhi-og-org-work-places-detail',
    templateUrl: './og-org-work-places-detail.component.html'
})
export class OgOrgWorkPlacesDetailComponent implements OnInit, OnDestroy {

    ogOrgWorkPlaces: OgOrgWorkPlaces;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ogOrgWorkPlacesService: OgOrgWorkPlacesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOgOrgWorkPlaces();
    }

    load(id) {
        this.ogOrgWorkPlacesService.find(id).subscribe((ogOrgWorkPlaces) => {
            this.ogOrgWorkPlaces = ogOrgWorkPlaces;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOgOrgWorkPlaces() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ogOrgWorkPlacesListModification',
            (response) => this.load(this.ogOrgWorkPlaces.id)
        );
    }
}
