import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpSchools } from './em-emp-schools.model';
import { EmEmpSchoolsPopupService } from './em-emp-schools-popup.service';
import { EmEmpSchoolsService } from './em-emp-schools.service';

@Component({
    selector: 'jhi-em-emp-schools-delete-dialog',
    templateUrl: './em-emp-schools-delete-dialog.component.html'
})
export class EmEmpSchoolsDeleteDialogComponent {

    emEmpSchools: EmEmpSchools;

    constructor(
        private emEmpSchoolsService: EmEmpSchoolsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emEmpSchoolsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emEmpSchoolsListModification',
                content: 'Deleted an emEmpSchools'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-emp-schools-delete-popup',
    template: ''
})
export class EmEmpSchoolsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpSchoolsPopupService: EmEmpSchoolsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emEmpSchoolsPopupService
                .open(EmEmpSchoolsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
