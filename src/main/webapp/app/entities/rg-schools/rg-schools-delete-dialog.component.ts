import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RgSchools } from './rg-schools.model';
import { RgSchoolsPopupService } from './rg-schools-popup.service';
import { RgSchoolsService } from './rg-schools.service';

@Component({
    selector: 'jhi-rg-schools-delete-dialog',
    templateUrl: './rg-schools-delete-dialog.component.html'
})
export class RgSchoolsDeleteDialogComponent {

    rgSchools: RgSchools;

    constructor(
        private rgSchoolsService: RgSchoolsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rgSchoolsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rgSchoolsListModification',
                content: 'Deleted an rgSchools'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rg-schools-delete-popup',
    template: ''
})
export class RgSchoolsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rgSchoolsPopupService: RgSchoolsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.rgSchoolsPopupService
                .open(RgSchoolsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
