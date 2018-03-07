import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpIdentifications } from './em-emp-identifications.model';
import { EmEmpIdentificationsService } from './em-emp-identifications.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-identifications',
    templateUrl: './em-emp-identifications.component.html'
})
export class EmEmpIdentificationsComponent implements OnInit, OnDestroy {
emEmpIdentifications: EmEmpIdentifications[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emEmpIdentificationsService: EmEmpIdentificationsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emEmpIdentificationsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emEmpIdentifications = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmEmpIdentifications();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmEmpIdentifications) {
        return item.id;
    }
    registerChangeInEmEmpIdentifications() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpIdentificationsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
