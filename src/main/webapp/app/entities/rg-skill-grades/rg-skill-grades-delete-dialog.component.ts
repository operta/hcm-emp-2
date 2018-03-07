import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RgSkillGrades } from './rg-skill-grades.model';
import { RgSkillGradesPopupService } from './rg-skill-grades-popup.service';
import { RgSkillGradesService } from './rg-skill-grades.service';

@Component({
    selector: 'jhi-rg-skill-grades-delete-dialog',
    templateUrl: './rg-skill-grades-delete-dialog.component.html'
})
export class RgSkillGradesDeleteDialogComponent {

    rgSkillGrades: RgSkillGrades;

    constructor(
        private rgSkillGradesService: RgSkillGradesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rgSkillGradesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rgSkillGradesListModification',
                content: 'Deleted an rgSkillGrades'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rg-skill-grades-delete-popup',
    template: ''
})
export class RgSkillGradesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rgSkillGradesPopupService: RgSkillGradesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.rgSkillGradesPopupService
                .open(RgSkillGradesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
