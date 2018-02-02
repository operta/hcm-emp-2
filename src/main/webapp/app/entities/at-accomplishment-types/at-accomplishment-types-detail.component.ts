import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AtAccomplishmentTypes } from './at-accomplishment-types.model';
import { AtAccomplishmentTypesService } from './at-accomplishment-types.service';

@Component({
    selector: 'jhi-at-accomplishment-types-detail',
    templateUrl: './at-accomplishment-types-detail.component.html'
})
export class AtAccomplishmentTypesDetailComponent implements OnInit, OnDestroy {

    atAccomplishmentTypes: AtAccomplishmentTypes;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private atAccomplishmentTypesService: AtAccomplishmentTypesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAtAccomplishmentTypes();
    }

    load(id) {
        this.atAccomplishmentTypesService.find(id).subscribe((atAccomplishmentTypes) => {
            this.atAccomplishmentTypes = atAccomplishmentTypes;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAtAccomplishmentTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'atAccomplishmentTypesListModification',
            (response) => this.load(this.atAccomplishmentTypes.id)
        );
    }
}
