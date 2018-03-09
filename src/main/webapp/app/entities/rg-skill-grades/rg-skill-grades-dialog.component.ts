import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RgSkillGrades } from './rg-skill-grades.model';
import { RgSkillGradesPopupService } from './rg-skill-grades-popup.service';
import { RgSkillGradesService } from './rg-skill-grades.service';

@Component({
    selector: 'jhi-rg-skill-grades-dialog',
    templateUrl: './rg-skill-grades-dialog.component.html'
})
export class RgSkillGradesDialogComponent implements OnInit {

    rgSkillGrades: RgSkillGrades;
    isSaving: boolean;
    isNumerical = false;
    constructor(
        public activeModal: NgbActiveModal,
        private rgSkillGradesService: RgSkillGradesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        if(this.rgSkillGrades.numerical == 'Y'){
            this.isNumerical = true;
        } else {
            this.isNumerical = false;
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        if(this.isNumerical == true) {
            this.rgSkillGrades.numerical = "Y";
        } else {
            this.rgSkillGrades.numerical = "N";
        }
        this.isSaving = true;
        if (this.rgSkillGrades.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rgSkillGradesService.update(this.rgSkillGrades));
        } else {
            this.subscribeToSaveResponse(
                this.rgSkillGradesService.create(this.rgSkillGrades));
        }
    }

    private subscribeToSaveResponse(result: Observable<RgSkillGrades>) {
        result.subscribe((res: RgSkillGrades) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RgSkillGrades) {
        this.eventManager.broadcast({ name: 'rgSkillGradesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-rg-skill-grades-popup',
    template: ''
})
export class RgSkillGradesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rgSkillGradesPopupService: RgSkillGradesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rgSkillGradesPopupService
                    .open(RgSkillGradesDialogComponent as Component, params['id']);
            } else {
                this.rgSkillGradesPopupService
                    .open(RgSkillGradesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
