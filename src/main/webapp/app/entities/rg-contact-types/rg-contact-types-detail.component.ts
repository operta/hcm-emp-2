import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RgContactTypes } from './rg-contact-types.model';
import { RgContactTypesService } from './rg-contact-types.service';

@Component({
    selector: 'jhi-rg-contact-types-detail',
    templateUrl: './rg-contact-types-detail.component.html'
})
export class RgContactTypesDetailComponent implements OnInit, OnDestroy {

    rgContactTypes: RgContactTypes;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rgContactTypesService: RgContactTypesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRgContactTypes();
    }

    load(id) {
        this.rgContactTypesService.find(id).subscribe((rgContactTypes) => {
            this.rgContactTypes = rgContactTypes;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRgContactTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rgContactTypesListModification',
            (response) => this.load(this.rgContactTypes.id)
        );
    }
}
