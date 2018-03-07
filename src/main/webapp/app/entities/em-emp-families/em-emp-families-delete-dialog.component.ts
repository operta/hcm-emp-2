import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpFamilies } from './em-emp-families.model';
import { EmEmpFamiliesPopupService } from './em-emp-families-popup.service';
import { EmEmpFamiliesService } from './em-emp-families.service';

@Component({
    selector: 'jhi-em-emp-families-delete-dialog',
    templateUrl: './em-emp-families-delete-dialog.component.html'
})
export class EmEmpFamiliesDeleteDialogComponent {

    emEmpFamilies: EmEmpFamilies;

    constructor(
        private emEmpFamiliesService: EmEmpFamiliesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emEmpFamiliesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emEmpFamiliesListModification',
                content: 'Deleted an emEmpFamilies'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-emp-families-delete-popup',
    template: ''
})
export class EmEmpFamiliesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpFamiliesPopupService: EmEmpFamiliesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emEmpFamiliesPopupService
                .open(EmEmpFamiliesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
