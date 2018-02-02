import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpAccomplishments } from './em-emp-accomplishments.model';
import { EmEmpAccomplishmentsService } from './em-emp-accomplishments.service';

@Component({
    selector: 'jhi-em-emp-accomplishments-detail',
    templateUrl: './em-emp-accomplishments-detail.component.html'
})
export class EmEmpAccomplishmentsDetailComponent implements OnInit, OnDestroy {

    emEmpAccomplishments: EmEmpAccomplishments;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emEmpAccomplishmentsService: EmEmpAccomplishmentsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmEmpAccomplishments();
    }

    load(id) {
        this.emEmpAccomplishmentsService.find(id).subscribe((emEmpAccomplishments) => {
            this.emEmpAccomplishments = emEmpAccomplishments;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmEmpAccomplishments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emEmpAccomplishmentsListModification',
            (response) => this.load(this.emEmpAccomplishments.id)
        );
    }
}
