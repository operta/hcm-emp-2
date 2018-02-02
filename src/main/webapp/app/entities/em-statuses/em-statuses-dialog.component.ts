import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmStatuses } from './em-statuses.model';
import { EmStatusesPopupService } from './em-statuses-popup.service';
import { EmStatusesService } from './em-statuses.service';

@Component({
    selector: 'jhi-em-statuses-dialog',
    templateUrl: './em-statuses-dialog.component.html'
})
export class EmStatusesDialogComponent implements OnInit {

    emStatuses: EmStatuses;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private emStatusesService: EmStatusesService,
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
        if (this.emStatuses.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emStatusesService.update(this.emStatuses));
        } else {
            this.subscribeToSaveResponse(
                this.emStatusesService.create(this.emStatuses));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmStatuses>) {
        result.subscribe((res: EmStatuses) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmStatuses) {
        this.eventManager.broadcast({ name: 'emStatusesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-em-statuses-popup',
    template: ''
})
export class EmStatusesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emStatusesPopupService: EmStatusesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emStatusesPopupService
                    .open(EmStatusesDialogComponent as Component, params['id']);
            } else {
                this.emStatusesPopupService
                    .open(EmStatusesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
