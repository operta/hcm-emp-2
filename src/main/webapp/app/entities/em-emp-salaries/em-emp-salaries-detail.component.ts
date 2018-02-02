import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpSalaries } from './em-emp-salaries.model';
import { EmEmpSalariesService } from './em-emp-salaries.service';

@Component({
    selector: 'jhi-em-emp-salaries-detail',
    templateUrl: './em-emp-salaries-detail.component.html'
})
export class EmEmpSalariesDetailComponent implements OnInit, OnDestroy {

    emEmpSalaries: EmEmpSalaries;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emEmpSalariesService: EmEmpSalariesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmEmpSalaries();
    }

    load(id) {
        this.emEmpSalariesService.find(id).subscribe((emEmpSalaries) => {
            this.emEmpSalaries = emEmpSalaries;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmEmpSalaries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emEmpSalariesListModification',
            (response) => this.load(this.emEmpSalaries.id)
        );
    }
}
