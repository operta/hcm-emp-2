import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OgOrganizations } from './og-organizations.model';
import { OgOrganizationsPopupService } from './og-organizations-popup.service';
import { OgOrganizationsService } from './og-organizations.service';

@Component({
    selector: 'jhi-og-organizations-delete-dialog',
    templateUrl: './og-organizations-delete-dialog.component.html'
})
export class OgOrganizationsDeleteDialogComponent {

    ogOrganizations: OgOrganizations;

    constructor(
        private ogOrganizationsService: OgOrganizationsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ogOrganizationsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ogOrganizationsListModification',
                content: 'Deleted an ogOrganizations'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-og-organizations-delete-popup',
    template: ''
})
export class OgOrganizationsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ogOrganizationsPopupService: OgOrganizationsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ogOrganizationsPopupService
                .open(OgOrganizationsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
