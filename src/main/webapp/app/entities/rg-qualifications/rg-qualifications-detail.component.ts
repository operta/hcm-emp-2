import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RgQualifications } from './rg-qualifications.model';
import { RgQualificationsService } from './rg-qualifications.service';

@Component({
    selector: 'jhi-rg-qualifications-detail',
    templateUrl: './rg-qualifications-detail.component.html'
})
export class RgQualificationsDetailComponent implements OnInit, OnDestroy {

    rgQualifications: RgQualifications;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rgQualificationsService: RgQualificationsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRgQualifications();
    }

    load(id) {
        this.rgQualificationsService.find(id).subscribe((rgQualifications) => {
            this.rgQualifications = rgQualifications;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRgQualifications() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rgQualificationsListModification',
            (response) => this.load(this.rgQualifications.id)
        );
    }
}
