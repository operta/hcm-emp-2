import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpFamilies } from './em-emp-families.model';
import { EmEmpFamiliesService } from './em-emp-families.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-families',
    templateUrl: './em-emp-families.component.html'
})
export class EmEmpFamiliesComponent implements OnInit, OnDestroy {
emEmpFamilies: EmEmpFamilies[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emEmpFamiliesService: EmEmpFamiliesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emEmpFamiliesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emEmpFamilies = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmEmpFamilies();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmEmpFamilies) {
        return item.id;
    }
    registerChangeInEmEmpFamilies() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpFamiliesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
