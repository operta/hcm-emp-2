import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpSalaries } from './em-emp-salaries.model';
import { EmEmpSalariesPopupService } from './em-emp-salaries-popup.service';
import { EmEmpSalariesService } from './em-emp-salaries.service';

@Component({
    selector: 'jhi-em-emp-salaries-delete-dialog',
    templateUrl: './em-emp-salaries-delete-dialog.component.html'
})
export class EmEmpSalariesDeleteDialogComponent {

    emEmpSalaries: EmEmpSalaries;

    constructor(
        private emEmpSalariesService: EmEmpSalariesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emEmpSalariesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emEmpSalariesListModification',
                content: 'Deleted an emEmpSalaries'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-emp-salaries-delete-popup',
    template: ''
})
export class EmEmpSalariesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpSalariesPopupService: EmEmpSalariesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emEmpSalariesPopupService
                .open(EmEmpSalariesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
