import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RgFamilyRoles } from './rg-family-roles.model';
import { RgFamilyRolesPopupService } from './rg-family-roles-popup.service';
import { RgFamilyRolesService } from './rg-family-roles.service';

@Component({
    selector: 'jhi-rg-family-roles-dialog',
    templateUrl: './rg-family-roles-dialog.component.html'
})
export class RgFamilyRolesDialogComponent implements OnInit {

    rgFamilyRoles: RgFamilyRoles;
    hasUniqueRelation = false;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private rgFamilyRolesService: RgFamilyRolesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        if(this.rgFamilyRoles.uniqueRelation == 'Y') {
            this.hasUniqueRelation = true;
        } else {
            this.hasUniqueRelation = false;
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        if(this.hasUniqueRelation == true) {
            this.rgFamilyRoles.uniqueRelation = 'Y';
        } else {
            this.rgFamilyRoles.uniqueRelation = 'N';
        }
        this.isSaving = true;
        console.log(this.rgFamilyRoles);
        if (this.rgFamilyRoles.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rgFamilyRolesService.update(this.rgFamilyRoles));
        } else {
            this.subscribeToSaveResponse(
                this.rgFamilyRolesService.create(this.rgFamilyRoles));
        }
    }

    private subscribeToSaveResponse(result: Observable<RgFamilyRoles>) {
        result.subscribe((res: RgFamilyRoles) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RgFamilyRoles) {
        this.eventManager.broadcast({ name: 'rgFamilyRolesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-rg-family-roles-popup',
    template: ''
})
export class RgFamilyRolesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rgFamilyRolesPopupService: RgFamilyRolesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rgFamilyRolesPopupService
                    .open(RgFamilyRolesDialogComponent as Component, params['id']);
            } else {
                this.rgFamilyRolesPopupService
                    .open(RgFamilyRolesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
