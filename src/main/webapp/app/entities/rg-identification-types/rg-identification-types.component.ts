import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RgIdentificationTypes } from './rg-identification-types.model';
import { RgIdentificationTypesService } from './rg-identification-types.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rg-identification-types',
    templateUrl: './rg-identification-types.component.html'
})
export class RgIdentificationTypesComponent implements OnInit, OnDestroy {
rgIdentificationTypes: RgIdentificationTypes[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private rgIdentificationTypesService: RgIdentificationTypesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.rgIdentificationTypesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.rgIdentificationTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRgIdentificationTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RgIdentificationTypes) {
        return item.id;
    }
    registerChangeInRgIdentificationTypes() {
        this.eventSubscriber = this.eventManager.subscribe('rgIdentificationTypesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
