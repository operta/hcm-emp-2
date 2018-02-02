import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpOrgWorkPlaces } from './em-emp-org-work-places.model';
import { EmEmpOrgWorkPlacesPopupService } from './em-emp-org-work-places-popup.service';
import { EmEmpOrgWorkPlacesService } from './em-emp-org-work-places.service';

@Component({
    selector: 'jhi-em-emp-org-work-places-delete-dialog',
    templateUrl: './em-emp-org-work-places-delete-dialog.component.html'
})
export class EmEmpOrgWorkPlacesDeleteDialogComponent {

    emEmpOrgWorkPlaces: EmEmpOrgWorkPlaces;

    constructor(
        private emEmpOrgWorkPlacesService: EmEmpOrgWorkPlacesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emEmpOrgWorkPlacesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emEmpOrgWorkPlacesListModification',
                content: 'Deleted an emEmpOrgWorkPlaces'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-emp-org-work-places-delete-popup',
    template: ''
})
export class EmEmpOrgWorkPlacesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpOrgWorkPlacesPopupService: EmEmpOrgWorkPlacesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emEmpOrgWorkPlacesPopupService
                .open(EmEmpOrgWorkPlacesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
