import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmployees } from './em-employees.model';
import { EmEmployeesService } from './em-employees.service';

@Component({
    selector: 'jhi-em-employees-detail',
    templateUrl: './em-employees-detail.component.html'
})
export class EmEmployeesDetailComponent implements OnInit, OnDestroy {

    emEmployees: EmEmployees;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emEmployeesService: EmEmployeesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmEmployees();
    }

    load(id) {
        this.emEmployeesService.find(id).subscribe((emEmployees) => {
            this.emEmployees = emEmployees;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmEmployees() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emEmployeesListModification',
            (response) => this.load(this.emEmployees.id)
        );
    }
}
