import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LeLegalEntityTypes } from './le-legal-entity-types.model';
import { LeLegalEntityTypesService } from './le-legal-entity-types.service';

@Component({
    selector: 'jhi-le-legal-entity-types-detail',
    templateUrl: './le-legal-entity-types-detail.component.html'
})
export class LeLegalEntityTypesDetailComponent implements OnInit, OnDestroy {

    leLegalEntityTypes: LeLegalEntityTypes;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private leLegalEntityTypesService: LeLegalEntityTypesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLeLegalEntityTypes();
    }

    load(id) {
        this.leLegalEntityTypesService.find(id).subscribe((leLegalEntityTypes) => {
            this.leLegalEntityTypes = leLegalEntityTypes;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLeLegalEntityTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'leLegalEntityTypesListModification',
            (response) => this.load(this.leLegalEntityTypes.id)
        );
    }
}
