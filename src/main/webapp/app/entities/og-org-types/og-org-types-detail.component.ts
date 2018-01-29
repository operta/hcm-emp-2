import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OgOrgTypes } from './og-org-types.model';
import { OgOrgTypesService } from './og-org-types.service';

@Component({
    selector: 'jhi-og-org-types-detail',
    templateUrl: './og-org-types-detail.component.html'
})
export class OgOrgTypesDetailComponent implements OnInit, OnDestroy {

    ogOrgTypes: OgOrgTypes;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ogOrgTypesService: OgOrgTypesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOgOrgTypes();
    }

    load(id) {
        this.ogOrgTypesService.find(id).subscribe((ogOrgTypes) => {
            this.ogOrgTypes = ogOrgTypes;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOgOrgTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ogOrgTypesListModification',
            (response) => this.load(this.ogOrgTypes.id)
        );
    }
}
