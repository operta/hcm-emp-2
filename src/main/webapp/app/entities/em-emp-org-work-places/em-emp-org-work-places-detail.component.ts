import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpOrgWorkPlaces } from './em-emp-org-work-places.model';
import { EmEmpOrgWorkPlacesService } from './em-emp-org-work-places.service';

@Component({
    selector: 'jhi-em-emp-org-work-places-detail',
    templateUrl: './em-emp-org-work-places-detail.component.html'
})
export class EmEmpOrgWorkPlacesDetailComponent implements OnInit, OnDestroy {

    emEmpOrgWorkPlaces: EmEmpOrgWorkPlaces;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emEmpOrgWorkPlacesService: EmEmpOrgWorkPlacesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmEmpOrgWorkPlaces();
    }

    load(id) {
        this.emEmpOrgWorkPlacesService.find(id).subscribe((emEmpOrgWorkPlaces) => {
            this.emEmpOrgWorkPlaces = emEmpOrgWorkPlaces;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmEmpOrgWorkPlaces() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emEmpOrgWorkPlacesListModification',
            (response) => this.load(this.emEmpOrgWorkPlaces.id)
        );
    }
}
