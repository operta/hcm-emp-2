import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpBorrowings } from './em-emp-borrowings.model';
import { EmEmpBorrowingsService } from './em-emp-borrowings.service';

@Component({
    selector: 'jhi-em-emp-borrowings-detail',
    templateUrl: './em-emp-borrowings-detail.component.html'
})
export class EmEmpBorrowingsDetailComponent implements OnInit, OnDestroy {

    emEmpBorrowings: EmEmpBorrowings;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emEmpBorrowingsService: EmEmpBorrowingsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmEmpBorrowings();
    }

    load(id) {
        this.emEmpBorrowingsService.find(id).subscribe((emEmpBorrowings) => {
            this.emEmpBorrowings = emEmpBorrowings;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmEmpBorrowings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emEmpBorrowingsListModification',
            (response) => this.load(this.emEmpBorrowings.id)
        );
    }
}
