import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RgRegionTypes } from './rg-region-types.model';
import { RgRegionTypesPopupService } from './rg-region-types-popup.service';
import { RgRegionTypesService } from './rg-region-types.service';

@Component({
    selector: 'jhi-rg-region-types-dialog',
    templateUrl: './rg-region-types-dialog.component.html'
})
export class RgRegionTypesDialogComponent implements OnInit {

    rgRegionTypes: RgRegionTypes;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private rgRegionTypesService: RgRegionTypesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.rgRegionTypes.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rgRegionTypesService.update(this.rgRegionTypes));
        } else {
            this.subscribeToSaveResponse(
                this.rgRegionTypesService.create(this.rgRegionTypes));
        }
    }

    private subscribeToSaveResponse(result: Observable<RgRegionTypes>) {
        result.subscribe((res: RgRegionTypes) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RgRegionTypes) {
        this.eventManager.broadcast({ name: 'rgRegionTypesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-rg-region-types-popup',
    template: ''
})
export class RgRegionTypesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rgRegionTypesPopupService: RgRegionTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rgRegionTypesPopupService
                    .open(RgRegionTypesDialogComponent as Component, params['id']);
            } else {
                this.rgRegionTypesPopupService
                    .open(RgRegionTypesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
