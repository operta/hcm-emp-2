import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmployees } from './em-employees.model';
import { EmEmployeesPopupService } from './em-employees-popup.service';
import { EmEmployeesService } from './em-employees.service';

@Component({
    selector: 'jhi-em-employees-delete-dialog',
    templateUrl: './em-employees-delete-dialog.component.html'
})
export class EmEmployeesDeleteDialogComponent {

    emEmployees: EmEmployees;

    constructor(
        private emEmployeesService: EmEmployeesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emEmployeesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emEmployeesListModification',
                content: 'Deleted an emEmployees'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-employees-delete-popup',
    template: ''
})
export class EmEmployeesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmployeesPopupService: EmEmployeesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emEmployeesPopupService
                .open(EmEmployeesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
