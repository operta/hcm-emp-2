import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RgSchools } from './rg-schools.model';
import { RgSchoolsPopupService } from './rg-schools-popup.service';
import { RgSchoolsService } from './rg-schools.service';
import { RgRegions, RgRegionsService } from '../rg-regions';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rg-schools-dialog',
    templateUrl: './rg-schools-dialog.component.html'
})
export class RgSchoolsDialogComponent implements OnInit {

    rgSchools: RgSchools;
    isSaving: boolean;

    idcities: RgRegions[];

    idcountries: RgRegions[];

    idregions: RgRegions[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private rgSchoolsService: RgSchoolsService,
        private rgRegionsService: RgRegionsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.rgRegionsService
            .query({filter: 'rgschools-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.rgSchools.idCity || !this.rgSchools.idCity.id) {
                    this.idcities = res.json;
                } else {
                    this.rgRegionsService
                        .find(this.rgSchools.idCity.id)
                        .subscribe((subRes: RgRegions) => {
                            this.idcities = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.rgRegionsService
            .query({filter: 'rgschools-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.rgSchools.idCountry || !this.rgSchools.idCountry.id) {
                    this.idcountries = res.json;
                } else {
                    this.rgRegionsService
                        .find(this.rgSchools.idCountry.id)
                        .subscribe((subRes: RgRegions) => {
                            this.idcountries = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.rgRegionsService
            .query({filter: 'rgschools-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.rgSchools.idRegion || !this.rgSchools.idRegion.id) {
                    this.idregions = res.json;
                } else {
                    this.rgRegionsService
                        .find(this.rgSchools.idRegion.id)
                        .subscribe((subRes: RgRegions) => {
                            this.idregions = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.rgSchools.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rgSchoolsService.update(this.rgSchools));
        } else {
            this.subscribeToSaveResponse(
                this.rgSchoolsService.create(this.rgSchools));
        }
    }

    private subscribeToSaveResponse(result: Observable<RgSchools>) {
        result.subscribe((res: RgSchools) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RgSchools) {
        this.eventManager.broadcast({ name: 'rgSchoolsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRgRegionsById(index: number, item: RgRegions) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-rg-schools-popup',
    template: ''
})
export class RgSchoolsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rgSchoolsPopupService: RgSchoolsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rgSchoolsPopupService
                    .open(RgSchoolsDialogComponent as Component, params['id']);
            } else {
                this.rgSchoolsPopupService
                    .open(RgSchoolsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
