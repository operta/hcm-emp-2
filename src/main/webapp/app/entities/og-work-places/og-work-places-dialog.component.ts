import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OgWorkPlaces } from './og-work-places.model';
import { OgWorkPlacesPopupService } from './og-work-places-popup.service';
import { OgWorkPlacesService } from './og-work-places.service';
import { OgWorkPlaceTypes, OgWorkPlaceTypesService } from '../og-work-place-types';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-og-work-places-dialog',
    templateUrl: './og-work-places-dialog.component.html'
})
export class OgWorkPlacesDialogComponent implements OnInit {

    ogWorkPlaces: OgWorkPlaces;
    isSaving: boolean;

    idworkplacetypes: OgWorkPlaceTypes[];

    idparents: OgWorkPlaces[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ogWorkPlacesService: OgWorkPlacesService,
        private ogWorkPlaceTypesService: OgWorkPlaceTypesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ogWorkPlaceTypesService
            .query({filter: 'ogworkplaces-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.ogWorkPlaces.idWorkPlaceType || !this.ogWorkPlaces.idWorkPlaceType.id) {
                    this.idworkplacetypes = res.json;
                } else {
                    this.ogWorkPlaceTypesService
                        .find(this.ogWorkPlaces.idWorkPlaceType.id)
                        .subscribe((subRes: OgWorkPlaceTypes) => {
                            this.idworkplacetypes = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.ogWorkPlacesService
            .query({filter: 'ogworkplaces-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.ogWorkPlaces.idParent || !this.ogWorkPlaces.idParent.id) {
                    this.idparents = res.json;
                } else {
                    this.ogWorkPlacesService
                        .find(this.ogWorkPlaces.idParent.id)
                        .subscribe((subRes: OgWorkPlaces) => {
                            this.idparents = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ogWorkPlaces.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ogWorkPlacesService.update(this.ogWorkPlaces));
        } else {
            this.subscribeToSaveResponse(
                this.ogWorkPlacesService.create(this.ogWorkPlaces));
        }
    }

    private subscribeToSaveResponse(result: Observable<OgWorkPlaces>) {
        result.subscribe((res: OgWorkPlaces) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: OgWorkPlaces) {
        this.eventManager.broadcast({ name: 'ogWorkPlacesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOgWorkPlaceTypesById(index: number, item: OgWorkPlaceTypes) {
        return item.id;
    }

    trackOgWorkPlacesById(index: number, item: OgWorkPlaces) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-og-work-places-popup',
    template: ''
})
export class OgWorkPlacesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ogWorkPlacesPopupService: OgWorkPlacesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ogWorkPlacesPopupService
                    .open(OgWorkPlacesDialogComponent as Component, params['id']);
            } else {
                this.ogWorkPlacesPopupService
                    .open(OgWorkPlacesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
