import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ApConstants } from './ap-constants.model';
import { ApConstantsPopupService } from './ap-constants-popup.service';
import { ApConstantsService } from './ap-constants.service';

@Component({
    selector: 'jhi-ap-constants-dialog',
    templateUrl: './ap-constants-dialog.component.html'
})
export class ApConstantsDialogComponent implements OnInit {

    apConstants: ApConstants;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private apConstantsService: ApConstantsService,
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
        if (this.apConstants.id !== undefined) {
            this.subscribeToSaveResponse(
                this.apConstantsService.update(this.apConstants));
        } else {
            this.subscribeToSaveResponse(
                this.apConstantsService.create(this.apConstants));
        }
    }

    private subscribeToSaveResponse(result: Observable<ApConstants>) {
        result.subscribe((res: ApConstants) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ApConstants) {
        this.eventManager.broadcast({ name: 'apConstantsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-ap-constants-popup',
    template: ''
})
export class ApConstantsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private apConstantsPopupService: ApConstantsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.apConstantsPopupService
                    .open(ApConstantsDialogComponent as Component, params['id']);
            } else {
                this.apConstantsPopupService
                    .open(ApConstantsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
