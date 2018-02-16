import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpPreviousJobs } from './em-emp-previous-jobs.model';
import { EmEmpPreviousJobsPopupService } from './em-emp-previous-jobs-popup.service';
import { EmEmpPreviousJobsService } from './em-emp-previous-jobs.service';

@Component({
    selector: 'jhi-em-emp-previous-jobs-delete-dialog',
    templateUrl: './em-emp-previous-jobs-delete-dialog.component.html'
})
export class EmEmpPreviousJobsDeleteDialogComponent {

    emEmpPreviousJobs: EmEmpPreviousJobs;

    constructor(
        private emEmpPreviousJobsService: EmEmpPreviousJobsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emEmpPreviousJobsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emEmpPreviousJobsListModification',
                content: 'Deleted an emEmpPreviousJobs'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-emp-previous-jobs-delete-popup',
    template: ''
})
export class EmEmpPreviousJobsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpPreviousJobsPopupService: EmEmpPreviousJobsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emEmpPreviousJobsPopupService
                .open(EmEmpPreviousJobsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
