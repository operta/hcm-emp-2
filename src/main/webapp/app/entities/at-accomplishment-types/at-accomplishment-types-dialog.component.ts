import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AtAccomplishmentTypes } from './at-accomplishment-types.model';
import { AtAccomplishmentTypesPopupService } from './at-accomplishment-types-popup.service';
import { AtAccomplishmentTypesService } from './at-accomplishment-types.service';

@Component({
    selector: 'jhi-at-accomplishment-types-dialog',
    templateUrl: './at-accomplishment-types-dialog.component.html'
})
export class AtAccomplishmentTypesDialogComponent implements OnInit {

    atAccomplishmentTypes: AtAccomplishmentTypes;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private atAccomplishmentTypesService: AtAccomplishmentTypesService,
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
        if (this.atAccomplishmentTypes.id !== undefined) {
            this.subscribeToSaveResponse(
                this.atAccomplishmentTypesService.update(this.atAccomplishmentTypes));
        } else {
            this.subscribeToSaveResponse(
                this.atAccomplishmentTypesService.create(this.atAccomplishmentTypes));
        }
    }

    private subscribeToSaveResponse(result: Observable<AtAccomplishmentTypes>) {
        result.subscribe((res: AtAccomplishmentTypes) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AtAccomplishmentTypes) {
        this.eventManager.broadcast({ name: 'atAccomplishmentTypesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-at-accomplishment-types-popup',
    template: ''
})
export class AtAccomplishmentTypesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private atAccomplishmentTypesPopupService: AtAccomplishmentTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.atAccomplishmentTypesPopupService
                    .open(AtAccomplishmentTypesDialogComponent as Component, params['id']);
            } else {
                this.atAccomplishmentTypesPopupService
                    .open(AtAccomplishmentTypesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
