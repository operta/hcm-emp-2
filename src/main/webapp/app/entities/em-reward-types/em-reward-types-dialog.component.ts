import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmRewardTypes } from './em-reward-types.model';
import { EmRewardTypesPopupService } from './em-reward-types-popup.service';
import { EmRewardTypesService } from './em-reward-types.service';

@Component({
    selector: 'jhi-em-reward-types-dialog',
    templateUrl: './em-reward-types-dialog.component.html'
})
export class EmRewardTypesDialogComponent implements OnInit {

    emRewardTypes: EmRewardTypes;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private emRewardTypesService: EmRewardTypesService,
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
        if (this.emRewardTypes.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emRewardTypesService.update(this.emRewardTypes));
        } else {
            this.subscribeToSaveResponse(
                this.emRewardTypesService.create(this.emRewardTypes));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmRewardTypes>) {
        result.subscribe((res: EmRewardTypes) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmRewardTypes) {
        this.eventManager.broadcast({ name: 'emRewardTypesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-em-reward-types-popup',
    template: ''
})
export class EmRewardTypesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emRewardTypesPopupService: EmRewardTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emRewardTypesPopupService
                    .open(EmRewardTypesDialogComponent as Component, params['id']);
            } else {
                this.emRewardTypesPopupService
                    .open(EmRewardTypesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
