import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { DmDocumentLinks } from './dm-document-links.model';
import { DmDocumentLinksService } from './dm-document-links.service';

@Component({
    selector: 'jhi-dm-document-links-detail',
    templateUrl: './dm-document-links-detail.component.html'
})
export class DmDocumentLinksDetailComponent implements OnInit, OnDestroy {

    dmDocumentLinks: DmDocumentLinks;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private dmDocumentLinksService: DmDocumentLinksService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDmDocumentLinks();
    }

    load(id) {
        this.dmDocumentLinksService.find(id).subscribe((dmDocumentLinks) => {
            this.dmDocumentLinks = dmDocumentLinks;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDmDocumentLinks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dmDocumentLinksListModification',
            (response) => this.load(this.dmDocumentLinks.id)
        );
    }
}
