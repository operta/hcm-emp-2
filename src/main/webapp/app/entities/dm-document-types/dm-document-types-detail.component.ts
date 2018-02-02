import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DmDocumentTypes } from './dm-document-types.model';
import { DmDocumentTypesService } from './dm-document-types.service';

@Component({
    selector: 'jhi-dm-document-types-detail',
    templateUrl: './dm-document-types-detail.component.html'
})
export class DmDocumentTypesDetailComponent implements OnInit, OnDestroy {

    dmDocumentTypes: DmDocumentTypes;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dmDocumentTypesService: DmDocumentTypesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDmDocumentTypes();
    }

    load(id) {
        this.dmDocumentTypesService.find(id).subscribe((dmDocumentTypes) => {
            this.dmDocumentTypes = dmDocumentTypes;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDmDocumentTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dmDocumentTypesListModification',
            (response) => this.load(this.dmDocumentTypes.id)
        );
    }
}
