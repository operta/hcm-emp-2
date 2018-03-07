import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmInjuryTypes } from './em-injury-types.model';
import { EmInjuryTypesPopupService } from './em-injury-types-popup.service';
import { EmInjuryTypesService } from './em-injury-types.service';

@Component({
    selector: 'jhi-em-injury-types-dialog',
    templateUrl: './em-injury-types-dialog.component.html'
})
export class EmInjuryTypesDialogComponent implements OnInit {

    emInjuryTypes: EmInjuryTypes;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private emInjuryTypesService: EmInjuryTypesService,
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
        if (this.emInjuryTypes.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emInjuryTypesService.update(this.emInjuryTypes));
        } else {
            this.subscribeToSaveResponse(
                this.emInjuryTypesService.create(this.emInjuryTypes));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmInjuryTypes>) {
        result.subscribe((res: EmInjuryTypes) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmInjuryTypes) {
        this.eventManager.broadcast({ name: 'emInjuryTypesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-em-injury-types-popup',
    template: ''
})
export class EmInjuryTypesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emInjuryTypesPopupService: EmInjuryTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emInjuryTypesPopupService
                    .open(EmInjuryTypesDialogComponent as Component, params['id']);
            } else {
                this.emInjuryTypesPopupService
                    .open(EmInjuryTypesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
