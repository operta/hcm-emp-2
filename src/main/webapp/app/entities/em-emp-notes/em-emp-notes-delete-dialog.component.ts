import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpNotes } from './em-emp-notes.model';
import { EmEmpNotesPopupService } from './em-emp-notes-popup.service';
import { EmEmpNotesService } from './em-emp-notes.service';

@Component({
    selector: 'jhi-em-emp-notes-delete-dialog',
    templateUrl: './em-emp-notes-delete-dialog.component.html'
})
export class EmEmpNotesDeleteDialogComponent {

    emEmpNotes: EmEmpNotes;

    constructor(
        private emEmpNotesService: EmEmpNotesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emEmpNotesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emEmpNotesListModification',
                content: 'Deleted an emEmpNotes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-emp-notes-delete-popup',
    template: ''
})
export class EmEmpNotesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpNotesPopupService: EmEmpNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emEmpNotesPopupService
                .open(EmEmpNotesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
