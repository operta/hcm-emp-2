import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EmEmpPreviousJobs} from "../../../entities/em-emp-previous-jobs/em-emp-previous-jobs.model";
import {Subscription} from "rxjs/Subscription";
import {EmEmpPreviousJobsService} from "../../../entities/em-emp-previous-jobs/em-emp-previous-jobs.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {ResponseWrapper} from "../../../shared/model/response-wrapper.model";
import {Router} from "@angular/router";

@Component({
    selector: 'jhi-emp-job-experience',
    templateUrl: './emp-job-experience.component.html',
    styles: []
})
export class EmpJobExperienceComponent implements OnInit, OnDestroy {
    emEmpPreviousJobs: EmEmpPreviousJobs[];
    currentAccount: any;
    eventSubscriber: Subscription;
    @Input() employeeId;
    @Input() isEditable;

    constructor(
        private router: Router,
        private emEmpPreviousJobsService: EmEmpPreviousJobsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }
    loadAll() {
        this.emEmpPreviousJobsService.queryByEmployee(this.employeeId).subscribe(
            (res: ResponseWrapper) => {
                this.emEmpPreviousJobs = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.registerChangeInEmEmpPreviousJobs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmEmpPreviousJobs() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpPreviousJobsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    navigateEdit(jobId: number) {
        this.router.navigate(['/', { outlets: { popup: 'em-emp-previous-jobs/'+ jobId + '/edit'} }]);
    }

    checkIsManager(ongoingString): boolean {
        if (ongoingString == "T") {
            return true;
        }
        return false;
    }

}
