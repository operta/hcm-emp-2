import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RgContactTypes } from './rg-contact-types.model';
import { RgContactTypesService } from './rg-contact-types.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rg-contact-types',
    templateUrl: './rg-contact-types.component.html'
})
export class RgContactTypesComponent implements OnInit, OnDestroy {
rgContactTypes: RgContactTypes[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private rgContactTypesService: RgContactTypesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.rgContactTypesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.rgContactTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRgContactTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RgContactTypes) {
        return item.id;
    }
    registerChangeInRgContactTypes() {
        this.eventSubscriber = this.eventManager.subscribe('rgContactTypesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
