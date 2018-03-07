import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmInjuryTypes } from './em-injury-types.model';
import { EmInjuryTypesService } from './em-injury-types.service';

@Component({
    selector: 'jhi-em-injury-types-detail',
    templateUrl: './em-injury-types-detail.component.html'
})
export class EmInjuryTypesDetailComponent implements OnInit, OnDestroy {

    emInjuryTypes: EmInjuryTypes;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emInjuryTypesService: EmInjuryTypesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmInjuryTypes();
    }

    load(id) {
        this.emInjuryTypesService.find(id).subscribe((emInjuryTypes) => {
            this.emInjuryTypes = emInjuryTypes;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmInjuryTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emInjuryTypesListModification',
            (response) => this.load(this.emInjuryTypes.id)
        );
    }
}
