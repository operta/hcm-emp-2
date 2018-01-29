import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OgOrganizations } from './og-organizations.model';
import { OgOrganizationsService } from './og-organizations.service';

@Component({
    selector: 'jhi-og-organizations-detail',
    templateUrl: './og-organizations-detail.component.html'
})
export class OgOrganizationsDetailComponent implements OnInit, OnDestroy {

    ogOrganizations: OgOrganizations;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ogOrganizationsService: OgOrganizationsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOgOrganizations();
    }

    load(id) {
        this.ogOrganizationsService.find(id).subscribe((ogOrganizations) => {
            this.ogOrganizations = ogOrganizations;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOgOrganizations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ogOrganizationsListModification',
            (response) => this.load(this.ogOrganizations.id)
        );
    }
}
