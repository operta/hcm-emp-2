import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpInjuries } from './em-emp-injuries.model';
import { EmEmpInjuriesService } from './em-emp-injuries.service';

@Component({
    selector: 'jhi-em-emp-injuries-detail',
    templateUrl: './em-emp-injuries-detail.component.html'
})
export class EmEmpInjuriesDetailComponent implements OnInit, OnDestroy {

    emEmpInjuries: EmEmpInjuries;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emEmpInjuriesService: EmEmpInjuriesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmEmpInjuries();
    }

    load(id) {
        this.emEmpInjuriesService.find(id).subscribe((emEmpInjuries) => {
            this.emEmpInjuries = emEmpInjuries;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmEmpInjuries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emEmpInjuriesListModification',
            (response) => this.load(this.emEmpInjuries.id)
        );
    }
}
