import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpSchools } from './em-emp-schools.model';
import { EmEmpSchoolsService } from './em-emp-schools.service';

@Component({
    selector: 'jhi-em-emp-schools-detail',
    templateUrl: './em-emp-schools-detail.component.html'
})
export class EmEmpSchoolsDetailComponent implements OnInit, OnDestroy {

    emEmpSchools: EmEmpSchools;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emEmpSchoolsService: EmEmpSchoolsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmEmpSchools();
    }

    load(id) {
        this.emEmpSchoolsService.find(id).subscribe((emEmpSchools) => {
            this.emEmpSchools = emEmpSchools;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmEmpSchools() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emEmpSchoolsListModification',
            (response) => this.load(this.emEmpSchools.id)
        );
    }
}
