import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OgOrganizations } from './og-organizations.model';
import { OgOrganizationsService } from './og-organizations.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-og-organizations',
    templateUrl: './og-organizations.component.html'
})
export class OgOrganizationsComponent implements OnInit, OnDestroy {
ogOrganizations: OgOrganizations[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ogOrganizationsService: OgOrganizationsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ogOrganizationsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ogOrganizations = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOgOrganizations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OgOrganizations) {
        return item.id;
    }
    registerChangeInOgOrganizations() {
        this.eventSubscriber = this.eventManager.subscribe('ogOrganizationsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
