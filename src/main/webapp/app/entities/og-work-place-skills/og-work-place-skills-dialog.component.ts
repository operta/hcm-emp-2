import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OgWorkPlaceSkills } from './og-work-place-skills.model';
import { OgWorkPlaceSkillsPopupService } from './og-work-place-skills-popup.service';
import { OgWorkPlaceSkillsService } from './og-work-place-skills.service';
import { RgSkills, RgSkillsService } from '../rg-skills';
import { RgSkillGrades, RgSkillGradesService } from '../rg-skill-grades';
import { OgWorkPlaces, OgWorkPlacesService } from '../og-work-places';
import { ResponseWrapper } from '../../shared';
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'jhi-og-work-place-skills-dialog',
    templateUrl: './og-work-place-skills-dialog.component.html'
})
export class OgWorkPlaceSkillsDialogComponent implements OnInit, OnDestroy {
    workplace: OgWorkPlaces;
    ogWorkPlaceSkills: OgWorkPlaceSkills;
    isSaving: boolean;

    idskills: RgSkills[];

    idgrades: RgSkillGrades[];

    idworkplaces: OgWorkPlaces[];
    dateSkillDp: any;
    eventSubscriber: Subscription;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ogWorkPlaceSkillsService: OgWorkPlaceSkillsService,
        private rgSkillsService: RgSkillsService,
        private rgSkillGradesService: RgSkillGradesService,
        private ogWorkPlacesService: OgWorkPlacesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.loadSkills();
        this.rgSkillGradesService
            .query({filter: 'ogworkplaceskills-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.ogWorkPlaceSkills.idGrade || !this.ogWorkPlaceSkills.idGrade.id) {
                    this.idgrades = res.json;
                } else {
                    this.rgSkillGradesService
                        .find(this.ogWorkPlaceSkills.idGrade.id)
                        .subscribe((subRes: RgSkillGrades) => {
                            this.idgrades = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.registerSkillChange();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    loadSkills() {
        this.rgSkillsService
            .query({filter: 'ogworkplaceskills-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.ogWorkPlaceSkills.idSkill || !this.ogWorkPlaceSkills.idSkill.id) {
                    this.idskills = res.json;
                } else {
                    this.rgSkillsService
                        .find(this.ogWorkPlaceSkills.idSkill.id)
                        .subscribe((subRes: RgSkills) => {
                            this.idskills = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    registerSkillChange() {
        this.eventSubscriber = this.eventManager.subscribe('rgSkillsListModification', () => this.loadSkills());
    }

    save() {
        this.isSaving = true;
        if (this.ogWorkPlaceSkills.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ogWorkPlaceSkillsService.update(this.ogWorkPlaceSkills));
        } else {
            this.ogWorkPlaceSkills.idWorkPlace = this.workplace;
            this.subscribeToSaveResponse(
                this.ogWorkPlaceSkillsService.create(this.ogWorkPlaceSkills));
        }
    }

    private subscribeToSaveResponse(result: Observable<OgWorkPlaceSkills>) {
        result.subscribe((res: OgWorkPlaceSkills) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: OgWorkPlaceSkills) {
        this.eventManager.broadcast({ name: 'ogWorkPlaceSkillsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRgSkillsById(index: number, item: RgSkills) {
        return item.id;
    }

    trackRgSkillGradesById(index: number, item: RgSkillGrades) {
        return item.id;
    }

    trackOgWorkPlacesById(index: number, item: OgWorkPlaces) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-og-work-place-skills-popup',
    template: ''
})
export class OgWorkPlaceSkillsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ogWorkPlaceSkillsPopupService: OgWorkPlaceSkillsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ogWorkPlaceSkillsPopupService
                    .open(OgWorkPlaceSkillsDialogComponent as Component, params['id']);
            } else if( params['workplaceId']) {
                this.ogWorkPlaceSkillsPopupService
                    .open(OgWorkPlaceSkillsDialogComponent as Component, null, params['workplaceId']);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
