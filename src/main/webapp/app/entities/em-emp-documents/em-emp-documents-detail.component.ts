import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpDocuments } from './em-emp-documents.model';
import { EmEmpDocumentsService } from './em-emp-documents.service';

@Component({
    selector: 'jhi-em-emp-documents-detail',
    templateUrl: './em-emp-documents-detail.component.html'
})
export class EmEmpDocumentsDetailComponent implements OnInit, OnDestroy {

    emEmpDocuments: EmEmpDocuments;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emEmpDocumentsService: EmEmpDocumentsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmEmpDocuments();
    }

    load(id) {
        this.emEmpDocumentsService.find(id).subscribe((emEmpDocuments) => {
            this.emEmpDocuments = emEmpDocuments;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmEmpDocuments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emEmpDocumentsListModification',
            (response) => this.load(this.emEmpDocuments.id)
        );
    }
}
