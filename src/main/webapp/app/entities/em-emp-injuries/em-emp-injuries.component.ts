import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpInjuries } from './em-emp-injuries.model';
import { EmEmpInjuriesService } from './em-emp-injuries.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-injuries',
    templateUrl: './em-emp-injuries.component.html'
})
export class EmEmpInjuriesComponent implements OnInit, OnDestroy {
emEmpInjuries: EmEmpInjuries[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emEmpInjuriesService: EmEmpInjuriesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emEmpInjuriesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emEmpInjuries = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmEmpInjuries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmEmpInjuries) {
        return item.id;
    }
    registerChangeInEmEmpInjuries() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpInjuriesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
