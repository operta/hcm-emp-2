import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LeLegalEntityTypes } from './le-legal-entity-types.model';
import { LeLegalEntityTypesPopupService } from './le-legal-entity-types-popup.service';
import { LeLegalEntityTypesService } from './le-legal-entity-types.service';

@Component({
    selector: 'jhi-le-legal-entity-types-dialog',
    templateUrl: './le-legal-entity-types-dialog.component.html'
})
export class LeLegalEntityTypesDialogComponent implements OnInit {

    leLegalEntityTypes: LeLegalEntityTypes;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private leLegalEntityTypesService: LeLegalEntityTypesService,
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
        if (this.leLegalEntityTypes.id !== undefined) {
            this.subscribeToSaveResponse(
                this.leLegalEntityTypesService.update(this.leLegalEntityTypes));
        } else {
            this.subscribeToSaveResponse(
                this.leLegalEntityTypesService.create(this.leLegalEntityTypes));
        }
    }

    private subscribeToSaveResponse(result: Observable<LeLegalEntityTypes>) {
        result.subscribe((res: LeLegalEntityTypes) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: LeLegalEntityTypes) {
        this.eventManager.broadcast({ name: 'leLegalEntityTypesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-le-legal-entity-types-popup',
    template: ''
})
export class LeLegalEntityTypesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private leLegalEntityTypesPopupService: LeLegalEntityTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.leLegalEntityTypesPopupService
                    .open(LeLegalEntityTypesDialogComponent as Component, params['id']);
            } else {
                this.leLegalEntityTypesPopupService
                    .open(LeLegalEntityTypesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
