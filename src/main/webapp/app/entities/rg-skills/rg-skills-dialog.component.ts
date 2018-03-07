import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RgSkills } from './rg-skills.model';
import { RgSkillsPopupService } from './rg-skills-popup.service';
import { RgSkillsService } from './rg-skills.service';

@Component({
    selector: 'jhi-rg-skills-dialog',
    templateUrl: './rg-skills-dialog.component.html'
})
export class RgSkillsDialogComponent implements OnInit {

    rgSkills: RgSkills;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private rgSkillsService: RgSkillsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.rgSkills.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rgSkillsService.update(this.rgSkills));
        } else {
            this.subscribeToSaveResponse(
                this.rgSkillsService.create(this.rgSkills));
        }
    }

    private subscribeToSaveResponse(result: Observable<RgSkills>) {
        result.subscribe((res: RgSkills) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RgSkills) {
        this.eventManager.broadcast({ name: 'rgSkillsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-rg-skills-popup',
    template: ''
})
export class RgSkillsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rgSkillsPopupService: RgSkillsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rgSkillsPopupService
                    .open(RgSkillsDialogComponent as Component, params['id']);
            } else {
                this.rgSkillsPopupService
                    .open(RgSkillsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
