import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RgRegions } from './rg-regions.model';
import { RgRegionsPopupService } from './rg-regions-popup.service';
import { RgRegionsService } from './rg-regions.service';
import { RgRegionTypes, RgRegionTypesService } from '../rg-region-types';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rg-regions-dialog',
    templateUrl: './rg-regions-dialog.component.html'
})
export class RgRegionsDialogComponent implements OnInit {

    rgRegions: RgRegions;
    isSaving: boolean;

    idtypes: RgRegionTypes[];

    idparents: RgRegions[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private rgRegionsService: RgRegionsService,
        private rgRegionTypesService: RgRegionTypesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.rgRegionTypesService
            .query({filter: 'rgregions-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.rgRegions.idType || !this.rgRegions.idType.id) {
                    this.idtypes = res.json;
                } else {
                    this.rgRegionTypesService
                        .find(this.rgRegions.idType.id)
                        .subscribe((subRes: RgRegionTypes) => {
                            this.idtypes = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.rgRegionsService
            .query({filter: 'rgregions-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.rgRegions.idParent || !this.rgRegions.idParent.id) {
                    this.idparents = res.json;
                } else {
                    this.rgRegionsService
                        .find(this.rgRegions.idParent.id)
                        .subscribe((subRes: RgRegions) => {
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
        if (this.rgRegions.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rgRegionsService.update(this.rgRegions));
        } else {
            this.subscribeToSaveResponse(
                this.rgRegionsService.create(this.rgRegions));
        }
    }

    private subscribeToSaveResponse(result: Observable<RgRegions>) {
        result.subscribe((res: RgRegions) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RgRegions) {
        this.eventManager.broadcast({ name: 'rgRegionsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRgRegionTypesById(index: number, item: RgRegionTypes) {
        return item.id;
    }

    trackRgRegionsById(index: number, item: RgRegions) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-rg-regions-popup',
    template: ''
})
export class RgRegionsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rgRegionsPopupService: RgRegionsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rgRegionsPopupService
                    .open(RgRegionsDialogComponent as Component, params['id']);
            } else {
                this.rgRegionsPopupService
                    .open(RgRegionsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
