import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RgFamilyRoles } from './rg-family-roles.model';
import { RgFamilyRolesPopupService } from './rg-family-roles-popup.service';
import { RgFamilyRolesService } from './rg-family-roles.service';

@Component({
    selector: 'jhi-rg-family-roles-delete-dialog',
    templateUrl: './rg-family-roles-delete-dialog.component.html'
})
export class RgFamilyRolesDeleteDialogComponent {

    rgFamilyRoles: RgFamilyRoles;

    constructor(
        private rgFamilyRolesService: RgFamilyRolesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rgFamilyRolesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rgFamilyRolesListModification',
                content: 'Deleted an rgFamilyRoles'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rg-family-roles-delete-popup',
    template: ''
})
export class RgFamilyRolesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rgFamilyRolesPopupService: RgFamilyRolesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.rgFamilyRolesPopupService
                .open(RgFamilyRolesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
