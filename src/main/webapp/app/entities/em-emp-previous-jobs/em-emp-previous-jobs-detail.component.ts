import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpPreviousJobs } from './em-emp-previous-jobs.model';
import { EmEmpPreviousJobsService } from './em-emp-previous-jobs.service';

@Component({
    selector: 'jhi-em-emp-previous-jobs-detail',
    templateUrl: './em-emp-previous-jobs-detail.component.html'
})
export class EmEmpPreviousJobsDetailComponent implements OnInit, OnDestroy {

    emEmpPreviousJobs: EmEmpPreviousJobs;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emEmpPreviousJobsService: EmEmpPreviousJobsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmEmpPreviousJobs();
    }

    load(id) {
        this.emEmpPreviousJobsService.find(id).subscribe((emEmpPreviousJobs) => {
            this.emEmpPreviousJobs = emEmpPreviousJobs;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmEmpPreviousJobs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emEmpPreviousJobsListModification',
            (response) => this.load(this.emEmpPreviousJobs.id)
        );
    }
}
