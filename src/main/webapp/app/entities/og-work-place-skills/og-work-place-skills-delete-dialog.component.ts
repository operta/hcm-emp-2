import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OgWorkPlaceSkills } from './og-work-place-skills.model';
import { OgWorkPlaceSkillsPopupService } from './og-work-place-skills-popup.service';
import { OgWorkPlaceSkillsService } from './og-work-place-skills.service';

@Component({
    selector: 'jhi-og-work-place-skills-delete-dialog',
    templateUrl: './og-work-place-skills-delete-dialog.component.html'
})
export class OgWorkPlaceSkillsDeleteDialogComponent {

    ogWorkPlaceSkills: OgWorkPlaceSkills;

    constructor(
        private ogWorkPlaceSkillsService: OgWorkPlaceSkillsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ogWorkPlaceSkillsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ogWorkPlaceSkillsListModification',
                content: 'Deleted an ogWorkPlaceSkills'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-og-work-place-skills-delete-popup',
    template: ''
})
export class OgWorkPlaceSkillsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ogWorkPlaceSkillsPopupService: OgWorkPlaceSkillsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ogWorkPlaceSkillsPopupService
                .open(OgWorkPlaceSkillsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
