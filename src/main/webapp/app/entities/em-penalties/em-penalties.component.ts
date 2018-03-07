import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmPenalties } from './em-penalties.model';
import { EmPenaltiesService } from './em-penalties.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-penalties',
    templateUrl: './em-penalties.component.html'
})
export class EmPenaltiesComponent implements OnInit, OnDestroy {
emPenalties: EmPenalties[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emPenaltiesService: EmPenaltiesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emPenaltiesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emPenalties = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmPenalties();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmPenalties) {
        return item.id;
    }
    registerChangeInEmPenalties() {
        this.eventSubscriber = this.eventManager.subscribe('emPenaltiesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
