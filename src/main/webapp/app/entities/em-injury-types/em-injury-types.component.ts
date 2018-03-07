import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmInjuryTypes } from './em-injury-types.model';
import { EmInjuryTypesService } from './em-injury-types.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-injury-types',
    templateUrl: './em-injury-types.component.html'
})
export class EmInjuryTypesComponent implements OnInit, OnDestroy {
emInjuryTypes: EmInjuryTypes[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emInjuryTypesService: EmInjuryTypesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emInjuryTypesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emInjuryTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmInjuryTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmInjuryTypes) {
        return item.id;
    }
    registerChangeInEmInjuryTypes() {
        this.eventSubscriber = this.eventManager.subscribe('emInjuryTypesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
