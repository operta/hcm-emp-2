import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmContractTypes } from './em-contract-types.model';
import { EmContractTypesService } from './em-contract-types.service';

@Component({
    selector: 'jhi-em-contract-types-detail',
    templateUrl: './em-contract-types-detail.component.html'
})
export class EmContractTypesDetailComponent implements OnInit, OnDestroy {

    emContractTypes: EmContractTypes;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emContractTypesService: EmContractTypesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmContractTypes();
    }

    load(id) {
        this.emContractTypesService.find(id).subscribe((emContractTypes) => {
            this.emContractTypes = emContractTypes;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmContractTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emContractTypesListModification',
            (response) => this.load(this.emContractTypes.id)
        );
    }
}
