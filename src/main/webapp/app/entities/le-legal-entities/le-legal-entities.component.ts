import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LeLegalEntities } from './le-legal-entities.model';
import { LeLegalEntitiesService } from './le-legal-entities.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-le-legal-entities',
    templateUrl: './le-legal-entities.component.html'
})
export class LeLegalEntitiesComponent implements OnInit, OnDestroy {
leLegalEntities: LeLegalEntities[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private leLegalEntitiesService: LeLegalEntitiesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.leLegalEntitiesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.leLegalEntities = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLeLegalEntities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: LeLegalEntities) {
        return item.id;
    }
    registerChangeInLeLegalEntities() {
        this.eventSubscriber = this.eventManager.subscribe('leLegalEntitiesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
