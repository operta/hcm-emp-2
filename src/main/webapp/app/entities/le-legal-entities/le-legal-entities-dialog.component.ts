import {Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LeLegalEntities } from './le-legal-entities.model';
import { LeLegalEntitiesPopupService } from './le-legal-entities-popup.service';
import { LeLegalEntitiesService } from './le-legal-entities.service';
import { LeLegalEntityTypes, LeLegalEntityTypesService } from '../le-legal-entity-types';
import { RgRegions, RgRegionsService } from '../rg-regions';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-le-legal-entities-dialog',
    templateUrl: './le-legal-entities-dialog.component.html',
    styleUrls: ['./le-legal-entities-dialog.component.css']
})
export class LeLegalEntitiesDialogComponent implements OnInit {
    @ViewChild('regionSelect') regionSelect: Element;
    leLegalEntities: LeLegalEntities;
    isSaving: boolean;
    identitytypes: LeLegalEntityTypes[];
    regions: RgRegions[];
    cities: RgRegions[];
    searchableList: string[];
    searchValue = '';
    isHidden = true;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private leLegalEntitiesService: LeLegalEntitiesService,
        private leLegalEntityTypesService: LeLegalEntityTypesService,
        private rgRegionsService: RgRegionsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.searchableList = ['name'];
        this.isSaving = false;
        this.leLegalEntityTypesService
            .query({filter: 'lelegalentities-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.leLegalEntities.idEntityType || !this.leLegalEntities.idEntityType.id) {
                    this.identitytypes = res.json;
                } else {
                    this.leLegalEntityTypesService
                        .find(this.leLegalEntities.idEntityType.id)
                        .subscribe((subRes: LeLegalEntityTypes) => {
                            this.identitytypes = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.rgRegionsService
            .query({filter: 'lelegalentities-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.leLegalEntities.region || !this.leLegalEntities.region.id) {
                    this.regions = res.json;
                } else {
                    this.rgRegionsService
                        .find(this.leLegalEntities.region.id)
                        .subscribe((subRes: RgRegions) => {
                            this.regions = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
                this.filterRegionsByCity();
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    openRegionSelect() {
        // console.log(this.regionSelect.ope);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    filterRegionsByCity(){
        this.cities = this.regions.filter((item) => item.idType.id == 4);
    }

    save() {
        this.isSaving = true;
        if (this.leLegalEntities.id !== undefined) {
            this.subscribeToSaveResponse(
                this.leLegalEntitiesService.update(this.leLegalEntities));
        } else {
            this.subscribeToSaveResponse(
                this.leLegalEntitiesService.create(this.leLegalEntities));
        }
    }

    private subscribeToSaveResponse(result: Observable<LeLegalEntities>) {
        result.subscribe((res: LeLegalEntities) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: LeLegalEntities) {
        this.eventManager.broadcast({ name: 'leLegalEntitiesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLeLegalEntityTypesById(index: number, item: LeLegalEntityTypes) {
        return item.id;
    }

    trackRgRegionsById(index: number, item: RgRegions) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-le-legal-entities-popup',
    template: ''
})
export class LeLegalEntitiesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private leLegalEntitiesPopupService: LeLegalEntitiesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.leLegalEntitiesPopupService
                    .open(LeLegalEntitiesDialogComponent as Component, params['id']);
            } else {
                this.leLegalEntitiesPopupService
                    .open(LeLegalEntitiesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
