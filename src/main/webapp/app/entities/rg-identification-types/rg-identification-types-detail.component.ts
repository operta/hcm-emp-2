import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RgIdentificationTypes } from './rg-identification-types.model';
import { RgIdentificationTypesService } from './rg-identification-types.service';

@Component({
    selector: 'jhi-rg-identification-types-detail',
    templateUrl: './rg-identification-types-detail.component.html'
})
export class RgIdentificationTypesDetailComponent implements OnInit, OnDestroy {

    rgIdentificationTypes: RgIdentificationTypes;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rgIdentificationTypesService: RgIdentificationTypesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRgIdentificationTypes();
    }

    load(id) {
        this.rgIdentificationTypesService.find(id).subscribe((rgIdentificationTypes) => {
            this.rgIdentificationTypes = rgIdentificationTypes;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRgIdentificationTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rgIdentificationTypesListModification',
            (response) => this.load(this.rgIdentificationTypes.id)
        );
    }
}
