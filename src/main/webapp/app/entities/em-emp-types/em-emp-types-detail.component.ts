import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpTypes } from './em-emp-types.model';
import { EmEmpTypesService } from './em-emp-types.service';

@Component({
    selector: 'jhi-em-emp-types-detail',
    templateUrl: './em-emp-types-detail.component.html'
})
export class EmEmpTypesDetailComponent implements OnInit, OnDestroy {

    emEmpTypes: EmEmpTypes;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emEmpTypesService: EmEmpTypesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmEmpTypes();
    }

    load(id) {
        this.emEmpTypesService.find(id).subscribe((emEmpTypes) => {
            this.emEmpTypes = emEmpTypes;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmEmpTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emEmpTypesListModification',
            (response) => this.load(this.emEmpTypes.id)
        );
    }
}
