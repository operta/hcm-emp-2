import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpEmgContacts } from './em-emp-emg-contacts.model';
import { EmEmpEmgContactsService } from './em-emp-emg-contacts.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-emg-contacts',
    templateUrl: './em-emp-emg-contacts.component.html'
})
export class EmEmpEmgContactsComponent implements OnInit, OnDestroy {
emEmpEmgContacts: EmEmpEmgContacts[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emEmpEmgContactsService: EmEmpEmgContactsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emEmpEmgContactsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emEmpEmgContacts = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmEmpEmgContacts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmEmpEmgContacts) {
        return item.id;
    }
    registerChangeInEmEmpEmgContacts() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpEmgContactsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
