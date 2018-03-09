import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ApConstants } from './ap-constants.model';
import { ApConstantsService } from './ap-constants.service';

@Component({
    selector: 'jhi-ap-constants-detail',
    templateUrl: './ap-constants-detail.component.html'
})
export class ApConstantsDetailComponent implements OnInit, OnDestroy {

    apConstants: ApConstants;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private apConstantsService: ApConstantsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInApConstants();
    }

    load(id) {
        this.apConstantsService.find(id).subscribe((apConstants) => {
            this.apConstants = apConstants;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInApConstants() {
        this.eventSubscriber = this.eventManager.subscribe(
            'apConstantsListModification',
            (response) => this.load(this.apConstants.id)
        );
    }
}
