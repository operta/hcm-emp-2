import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RgSchools } from './rg-schools.model';
import { RgSchoolsService } from './rg-schools.service';

@Component({
    selector: 'jhi-rg-schools-detail',
    templateUrl: './rg-schools-detail.component.html'
})
export class RgSchoolsDetailComponent implements OnInit, OnDestroy {

    rgSchools: RgSchools;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rgSchoolsService: RgSchoolsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRgSchools();
    }

    load(id) {
        this.rgSchoolsService.find(id).subscribe((rgSchools) => {
            this.rgSchools = rgSchools;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRgSchools() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rgSchoolsListModification',
            (response) => this.load(this.rgSchools.id)
        );
    }
}
