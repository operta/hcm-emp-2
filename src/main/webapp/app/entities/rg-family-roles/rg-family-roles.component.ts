import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RgFamilyRoles } from './rg-family-roles.model';
import { RgFamilyRolesService } from './rg-family-roles.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rg-family-roles',
    templateUrl: './rg-family-roles.component.html'
})
export class RgFamilyRolesComponent implements OnInit, OnDestroy {
rgFamilyRoles: RgFamilyRoles[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private rgFamilyRolesService: RgFamilyRolesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.rgFamilyRolesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.rgFamilyRoles = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRgFamilyRoles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RgFamilyRoles) {
        return item.id;
    }
    registerChangeInRgFamilyRoles() {
        this.eventSubscriber = this.eventManager.subscribe('rgFamilyRolesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
