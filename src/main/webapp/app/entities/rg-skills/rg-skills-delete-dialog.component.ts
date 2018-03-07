import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RgSkills } from './rg-skills.model';
import { RgSkillsPopupService } from './rg-skills-popup.service';
import { RgSkillsService } from './rg-skills.service';

@Component({
    selector: 'jhi-rg-skills-delete-dialog',
    templateUrl: './rg-skills-delete-dialog.component.html'
})
export class RgSkillsDeleteDialogComponent {

    rgSkills: RgSkills;

    constructor(
        private rgSkillsService: RgSkillsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rgSkillsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rgSkillsListModification',
                content: 'Deleted an rgSkills'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rg-skills-delete-popup',
    template: ''
})
export class RgSkillsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rgSkillsPopupService: RgSkillsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.rgSkillsPopupService
                .open(RgSkillsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
