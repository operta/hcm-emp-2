import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OgOrgWorkPlaces } from './og-org-work-places.model';
import { OgOrgWorkPlacesPopupService } from './og-org-work-places-popup.service';
import { OgOrgWorkPlacesService } from './og-org-work-places.service';
import { OgOrganizations, OgOrganizationsService } from '../og-organizations';
import { OgWorkPlaces, OgWorkPlacesService } from '../og-work-places';
import { ResponseWrapper } from '../../shared';
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'jhi-og-org-work-places-dialog',
    templateUrl: './og-org-work-places-dialog.component.html'
})
export class OgOrgWorkPlacesDialogComponent implements OnInit, OnDestroy {

    ogOrgWorkPlaces: OgOrgWorkPlaces;
    isSaving: boolean;

    idorganizations: OgOrganizations[];

    idworkplaces: OgWorkPlaces[];
    eventSubscription: Subscription;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ogOrgWorkPlacesService: OgOrgWorkPlacesService,
        private ogOrganizationsService: OgOrganizationsService,
        private ogWorkPlacesService: OgWorkPlacesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ogOrganizationsService
            .query({filter: 'ogorgworkplaces-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.ogOrgWorkPlaces.idOrganization || !this.ogOrgWorkPlaces.idOrganization.id) {
                    this.idorganizations = res.json;
                } else {
                    this.ogOrganizationsService
                        .find(this.ogOrgWorkPlaces.idOrganization.id)
                        .subscribe((subRes: OgOrganizations) => {
                            this.idorganizations = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
            this.loadWorkplaces();
            this.registerToChanges();

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    registerToChanges() {
        this.eventSubscription = this.eventManager.subscribe('ogWorkPlacesListModification', (response) => this.loadWorkplaces());
    }

    loadWorkplaces() {
        this.ogWorkPlacesService
            .query({filter: 'ogorgworkplaces-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.ogOrgWorkPlaces.idWorkPlace || !this.ogOrgWorkPlaces.idWorkPlace.id) {
                    this.idworkplaces = res.json;
                } else {
                    this.ogWorkPlacesService
                        .find(this.ogOrgWorkPlaces.idWorkPlace.id)
                        .subscribe((subRes: OgWorkPlaces) => {
                            this.idworkplaces = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }


    save() {
        this.isSaving = true;
        if (this.ogOrgWorkPlaces.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ogOrgWorkPlacesService.update(this.ogOrgWorkPlaces));
        } else {
            this.subscribeToSaveResponse(
                this.ogOrgWorkPlacesService.create(this.ogOrgWorkPlaces));
        }
    }

    private subscribeToSaveResponse(result: Observable<OgOrgWorkPlaces>) {
        result.subscribe((res: OgOrgWorkPlaces) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: OgOrgWorkPlaces) {
        this.eventManager.broadcast({ name: 'ogOrgWorkPlacesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOgOrganizationsById(index: number, item: OgOrganizations) {
        return item.id;
    }

    trackOgWorkPlacesById(index: number, item: OgWorkPlaces) {
        return item.id;
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscription);
    }
}

@Component({
    selector: 'jhi-og-org-work-places-popup',
    template: ''
})
export class OgOrgWorkPlacesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ogOrgWorkPlacesPopupService: OgOrgWorkPlacesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ogOrgWorkPlacesPopupService
                    .open(OgOrgWorkPlacesDialogComponent as Component, params['id']);
            } else {
                this.ogOrgWorkPlacesPopupService
                    .open(OgOrgWorkPlacesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
