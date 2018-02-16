import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpPreviousJobs } from './em-emp-previous-jobs.model';
import { EmEmpPreviousJobsService } from './em-emp-previous-jobs.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-previous-jobs',
    templateUrl: './em-emp-previous-jobs.component.html'
})
export class EmEmpPreviousJobsComponent implements OnInit, OnDestroy {
emEmpPreviousJobs: EmEmpPreviousJobs[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emEmpPreviousJobsService: EmEmpPreviousJobsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emEmpPreviousJobsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emEmpPreviousJobs = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmEmpPreviousJobs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmEmpPreviousJobs) {
        return item.id;
    }
    registerChangeInEmEmpPreviousJobs() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpPreviousJobsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
