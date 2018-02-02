import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OgWorkPlaceTypes } from './og-work-place-types.model';
import { OgWorkPlaceTypesPopupService } from './og-work-place-types-popup.service';
import { OgWorkPlaceTypesService } from './og-work-place-types.service';

@Component({
    selector: 'jhi-og-work-place-types-dialog',
    templateUrl: './og-work-place-types-dialog.component.html'
})
export class OgWorkPlaceTypesDialogComponent implements OnInit {

    ogWorkPlaceTypes: OgWorkPlaceTypes;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private ogWorkPlaceTypesService: OgWorkPlaceTypesService,
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
        if (this.ogWorkPlaceTypes.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ogWorkPlaceTypesService.update(this.ogWorkPlaceTypes));
        } else {
            this.subscribeToSaveResponse(
                this.ogWorkPlaceTypesService.create(this.ogWorkPlaceTypes));
        }
    }

    private subscribeToSaveResponse(result: Observable<OgWorkPlaceTypes>) {
        result.subscribe((res: OgWorkPlaceTypes) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: OgWorkPlaceTypes) {
        this.eventManager.broadcast({ name: 'ogWorkPlaceTypesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-og-work-place-types-popup',
    template: ''
})
export class OgWorkPlaceTypesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ogWorkPlaceTypesPopupService: OgWorkPlaceTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ogWorkPlaceTypesPopupService
                    .open(OgWorkPlaceTypesDialogComponent as Component, params['id']);
            } else {
                this.ogWorkPlaceTypesPopupService
                    .open(OgWorkPlaceTypesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
