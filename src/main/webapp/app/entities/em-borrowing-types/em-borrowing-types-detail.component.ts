import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmBorrowingTypes } from './em-borrowing-types.model';
import { EmBorrowingTypesService } from './em-borrowing-types.service';

@Component({
    selector: 'jhi-em-borrowing-types-detail',
    templateUrl: './em-borrowing-types-detail.component.html'
})
export class EmBorrowingTypesDetailComponent implements OnInit, OnDestroy {

    emBorrowingTypes: EmBorrowingTypes;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emBorrowingTypesService: EmBorrowingTypesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmBorrowingTypes();
    }

    load(id) {
        this.emBorrowingTypesService.find(id).subscribe((emBorrowingTypes) => {
            this.emBorrowingTypes = emBorrowingTypes;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmBorrowingTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emBorrowingTypesListModification',
            (response) => this.load(this.emBorrowingTypes.id)
        );
    }
}
