import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RgQualifications } from './rg-qualifications.model';
import { RgQualificationsPopupService } from './rg-qualifications-popup.service';
import { RgQualificationsService } from './rg-qualifications.service';

@Component({
    selector: 'jhi-rg-qualifications-dialog',
    templateUrl: './rg-qualifications-dialog.component.html'
})
export class RgQualificationsDialogComponent implements OnInit {

    rgQualifications: RgQualifications;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private rgQualificationsService: RgQualificationsService,
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
        if (this.rgQualifications.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rgQualificationsService.update(this.rgQualifications));
        } else {
            this.subscribeToSaveResponse(
                this.rgQualificationsService.create(this.rgQualifications));
        }
    }

    private subscribeToSaveResponse(result: Observable<RgQualifications>) {
        result.subscribe((res: RgQualifications) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RgQualifications) {
        this.eventManager.broadcast({ name: 'rgQualificationsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-rg-qualifications-popup',
    template: ''
})
export class RgQualificationsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rgQualificationsPopupService: RgQualificationsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rgQualificationsPopupService
                    .open(RgQualificationsDialogComponent as Component, params['id']);
            } else {
                this.rgQualificationsPopupService
                    .open(RgQualificationsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
