import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OgOrgTypes } from './og-org-types.model';
import { OgOrgTypesPopupService } from './og-org-types-popup.service';
import { OgOrgTypesService } from './og-org-types.service';

@Component({
    selector: 'jhi-og-org-types-dialog',
    templateUrl: './og-org-types-dialog.component.html'
})
export class OgOrgTypesDialogComponent implements OnInit {

    ogOrgTypes: OgOrgTypes;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private ogOrgTypesService: OgOrgTypesService,
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
        if (this.ogOrgTypes.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ogOrgTypesService.update(this.ogOrgTypes));
        } else {
            this.subscribeToSaveResponse(
                this.ogOrgTypesService.create(this.ogOrgTypes));
        }
    }

    private subscribeToSaveResponse(result: Observable<OgOrgTypes>) {
        result.subscribe((res: OgOrgTypes) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: OgOrgTypes) {
        this.eventManager.broadcast({ name: 'ogOrgTypesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-og-org-types-popup',
    template: ''
})
export class OgOrgTypesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ogOrgTypesPopupService: OgOrgTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ogOrgTypesPopupService
                    .open(OgOrgTypesDialogComponent as Component, params['id']);
            } else {
                this.ogOrgTypesPopupService
                    .open(OgOrgTypesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
