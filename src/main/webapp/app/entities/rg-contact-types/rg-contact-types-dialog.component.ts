import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RgContactTypes } from './rg-contact-types.model';
import { RgContactTypesPopupService } from './rg-contact-types-popup.service';
import { RgContactTypesService } from './rg-contact-types.service';

@Component({
    selector: 'jhi-rg-contact-types-dialog',
    templateUrl: './rg-contact-types-dialog.component.html'
})
export class RgContactTypesDialogComponent implements OnInit {

    rgContactTypes: RgContactTypes;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private rgContactTypesService: RgContactTypesService,
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
        if (this.rgContactTypes.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rgContactTypesService.update(this.rgContactTypes));
        } else {
            this.subscribeToSaveResponse(
                this.rgContactTypesService.create(this.rgContactTypes));
        }
    }

    private subscribeToSaveResponse(result: Observable<RgContactTypes>) {
        result.subscribe((res: RgContactTypes) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RgContactTypes) {
        this.eventManager.broadcast({ name: 'rgContactTypesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-rg-contact-types-popup',
    template: ''
})
export class RgContactTypesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rgContactTypesPopupService: RgContactTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rgContactTypesPopupService
                    .open(RgContactTypesDialogComponent as Component, params['id']);
            } else {
                this.rgContactTypesPopupService
                    .open(RgContactTypesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
