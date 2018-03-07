import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpInjuries } from './em-emp-injuries.model';
import { EmEmpInjuriesPopupService } from './em-emp-injuries-popup.service';
import { EmEmpInjuriesService } from './em-emp-injuries.service';

@Component({
    selector: 'jhi-em-emp-injuries-delete-dialog',
    templateUrl: './em-emp-injuries-delete-dialog.component.html'
})
export class EmEmpInjuriesDeleteDialogComponent {

    emEmpInjuries: EmEmpInjuries;

    constructor(
        private emEmpInjuriesService: EmEmpInjuriesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emEmpInjuriesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emEmpInjuriesListModification',
                content: 'Deleted an emEmpInjuries'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-emp-injuries-delete-popup',
    template: ''
})
export class EmEmpInjuriesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpInjuriesPopupService: EmEmpInjuriesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emEmpInjuriesPopupService
                .open(EmEmpInjuriesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
