import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RgFamilyRoles } from './rg-family-roles.model';
import { RgFamilyRolesService } from './rg-family-roles.service';

@Component({
    selector: 'jhi-rg-family-roles-detail',
    templateUrl: './rg-family-roles-detail.component.html'
})
export class RgFamilyRolesDetailComponent implements OnInit, OnDestroy {

    rgFamilyRoles: RgFamilyRoles;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rgFamilyRolesService: RgFamilyRolesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRgFamilyRoles();
    }

    load(id) {
        this.rgFamilyRolesService.find(id).subscribe((rgFamilyRoles) => {
            this.rgFamilyRoles = rgFamilyRoles;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRgFamilyRoles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rgFamilyRolesListModification',
            (response) => this.load(this.rgFamilyRoles.id)
        );
    }
}
