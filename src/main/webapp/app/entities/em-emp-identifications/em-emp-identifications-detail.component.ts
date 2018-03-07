import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpIdentifications } from './em-emp-identifications.model';
import { EmEmpIdentificationsService } from './em-emp-identifications.service';

@Component({
    selector: 'jhi-em-emp-identifications-detail',
    templateUrl: './em-emp-identifications-detail.component.html'
})
export class EmEmpIdentificationsDetailComponent implements OnInit, OnDestroy {

    emEmpIdentifications: EmEmpIdentifications;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emEmpIdentificationsService: EmEmpIdentificationsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmEmpIdentifications();
    }

    load(id) {
        this.emEmpIdentificationsService.find(id).subscribe((emEmpIdentifications) => {
            this.emEmpIdentifications = emEmpIdentifications;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmEmpIdentifications() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emEmpIdentificationsListModification',
            (response) => this.load(this.emEmpIdentifications.id)
        );
    }
}
