import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpSkills } from './em-emp-skills.model';
import { EmEmpSkillsPopupService } from './em-emp-skills-popup.service';
import { EmEmpSkillsService } from './em-emp-skills.service';

@Component({
    selector: 'jhi-em-emp-skills-delete-dialog',
    templateUrl: './em-emp-skills-delete-dialog.component.html'
})
export class EmEmpSkillsDeleteDialogComponent {

    emEmpSkills: EmEmpSkills;

    constructor(
        private emEmpSkillsService: EmEmpSkillsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emEmpSkillsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'emEmpSkillsListModification',
                content: 'Deleted an emEmpSkills'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-em-emp-skills-delete-popup',
    template: ''
})
export class EmEmpSkillsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpSkillsPopupService: EmEmpSkillsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.emEmpSkillsPopupService
                .open(EmEmpSkillsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
