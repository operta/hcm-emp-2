import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OgOrganizations } from './og-organizations.model';
import { OgOrganizationsPopupService } from './og-organizations-popup.service';
import { OgOrganizationsService } from './og-organizations.service';
import { OgOrgTypes, OgOrgTypesService } from '../og-org-types';
import { LeLegalEntities, LeLegalEntitiesService } from '../le-legal-entities';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-og-organizations-dialog',
    templateUrl: './og-organizations-dialog.component.html'
})
export class OgOrganizationsDialogComponent implements OnInit {

    ogOrganizations: OgOrganizations;
    isSaving: boolean;

    idorganizationtypes: OgOrgTypes[];

    idparents: OgOrganizations[];

    idlegalentities: LeLegalEntities[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ogOrganizationsService: OgOrganizationsService,
        private ogOrgTypesService: OgOrgTypesService,
        private leLegalEntitiesService: LeLegalEntitiesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ogOrgTypesService
            .query({filter: 'ogorganizations-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.ogOrganizations.idOrganizationType || !this.ogOrganizations.idOrganizationType.id) {
                    this.idorganizationtypes = res.json;
                } else {
                    this.ogOrgTypesService
                        .find(this.ogOrganizations.idOrganizationType.id)
                        .subscribe((subRes: OgOrgTypes) => {
                            this.idorganizationtypes = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.ogOrganizationsService
            .query({filter: 'ogorganizations-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.ogOrganizations.idParent || !this.ogOrganizations.idParent.id) {
                    this.idparents = res.json;
                } else {
                    this.ogOrganizationsService
                        .find(this.ogOrganizations.idParent.id)
                        .subscribe((subRes: OgOrganizations) => {
                            this.idparents = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.leLegalEntitiesService
            .query({filter: 'ogorganizations-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.ogOrganizations.idLegalEntity || !this.ogOrganizations.idLegalEntity.id) {
                    this.idlegalentities = res.json;
                } else {
                    this.leLegalEntitiesService
                        .find(this.ogOrganizations.idLegalEntity.id)
                        .subscribe((subRes: LeLegalEntities) => {
                            this.idlegalentities = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ogOrganizations.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ogOrganizationsService.update(this.ogOrganizations));
        } else {
            this.subscribeToSaveResponse(
                this.ogOrganizationsService.create(this.ogOrganizations));
        }
    }

    private subscribeToSaveResponse(result: Observable<OgOrganizations>) {
        result.subscribe((res: OgOrganizations) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: OgOrganizations) {
        this.eventManager.broadcast({ name: 'ogOrganizationsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOgOrgTypesById(index: number, item: OgOrgTypes) {
        return item.id;
    }

    trackOgOrganizationsById(index: number, item: OgOrganizations) {
        return item.id;
    }

    trackLeLegalEntitiesById(index: number, item: LeLegalEntities) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-og-organizations-popup',
    template: ''
})
export class OgOrganizationsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ogOrganizationsPopupService: OgOrganizationsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ogOrganizationsPopupService
                    .open(OgOrganizationsDialogComponent as Component, params['id']);
            } else {
                this.ogOrganizationsPopupService
                    .open(OgOrganizationsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
