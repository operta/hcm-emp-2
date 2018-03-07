import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpFamilies } from './em-emp-families.model';
import { EmEmpFamiliesService } from './em-emp-families.service';

@Component({
    selector: 'jhi-em-emp-families-detail',
    templateUrl: './em-emp-families-detail.component.html'
})
export class EmEmpFamiliesDetailComponent implements OnInit, OnDestroy {

    emEmpFamilies: EmEmpFamilies;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emEmpFamiliesService: EmEmpFamiliesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmEmpFamilies();
    }

    load(id) {
        this.emEmpFamiliesService.find(id).subscribe((emEmpFamilies) => {
            this.emEmpFamilies = emEmpFamilies;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmEmpFamilies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emEmpFamiliesListModification',
            (response) => this.load(this.emEmpFamilies.id)
        );
    }
}
