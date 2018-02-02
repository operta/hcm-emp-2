import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmployees } from './em-employees.model';
import { EmEmployeesService } from './em-employees.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-employees',
    templateUrl: './em-employees.component.html'
})
export class EmEmployeesComponent implements OnInit, OnDestroy {
emEmployees: EmEmployees[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emEmployeesService: EmEmployeesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emEmployeesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emEmployees = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmEmployees();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmEmployees) {
        return item.id;
    }
    registerChangeInEmEmployees() {
        this.eventSubscriber = this.eventManager.subscribe('emEmployeesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
