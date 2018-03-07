import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpSkills } from './em-emp-skills.model';
import { EmEmpSkillsPopupService } from './em-emp-skills-popup.service';
import { EmEmpSkillsService } from './em-emp-skills.service';
import { EmEmployees, EmEmployeesService } from '../em-employees';
import { RgSkills, RgSkillsService } from '../rg-skills';
import { RgSkillGrades, RgSkillGradesService } from '../rg-skill-grades';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-skills-dialog',
    templateUrl: './em-emp-skills-dialog.component.html'
})
export class EmEmpSkillsDialogComponent implements OnInit {
    employee: EmEmployees;
    emEmpSkills: EmEmpSkills;
    isSaving: boolean;

    idemployees: EmEmployees[];

    idskills: RgSkills[];

    idgrades: RgSkillGrades[];
    dateSkillDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private emEmpSkillsService: EmEmpSkillsService,
        private emEmployeesService: EmEmployeesService,
        private rgSkillsService: RgSkillsService,
        private rgSkillGradesService: RgSkillGradesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.emEmployeesService
            .query({filter: 'emempskills-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpSkills.idEmployee || !this.emEmpSkills.idEmployee.id) {
                    this.idemployees = res.json;
                } else {
                    this.emEmployeesService
                        .find(this.emEmpSkills.idEmployee.id)
                        .subscribe((subRes: EmEmployees) => {
                            this.idemployees = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.rgSkillsService
            .query({filter: 'emempskills-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpSkills.idSkill || !this.emEmpSkills.idSkill.id) {
                    this.idskills = res.json;
                } else {
                    this.rgSkillsService
                        .find(this.emEmpSkills.idSkill.id)
                        .subscribe((subRes: RgSkills) => {
                            this.idskills = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.rgSkillGradesService
            .query({filter: 'emempskills-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpSkills.idGrade || !this.emEmpSkills.idGrade.id) {
                    this.idgrades = res.json;
                } else {
                    this.rgSkillGradesService
                        .find(this.emEmpSkills.idGrade.id)
                        .subscribe((subRes: RgSkillGrades) => {
                            this.idgrades = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.emEmpSkills.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emEmpSkillsService.update(this.emEmpSkills));
        } else {
            if(this.employee) {
                this.emEmpSkills.idEmployee = this.employee;
            }
            this.subscribeToSaveResponse(
                this.emEmpSkillsService.create(this.emEmpSkills));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmEmpSkills>) {
        result.subscribe((res: EmEmpSkills) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmEmpSkills) {
        this.eventManager.broadcast({ name: 'emEmpSkillsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEmEmployeesById(index: number, item: EmEmployees) {
        return item.id;
    }

    trackRgSkillsById(index: number, item: RgSkills) {
        return item.id;
    }

    trackRgSkillGradesById(index: number, item: RgSkillGrades) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-em-emp-skills-popup',
    template: ''
})
export class EmEmpSkillsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpSkillsPopupService: EmEmpSkillsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emEmpSkillsPopupService
                    .open(EmEmpSkillsDialogComponent as Component, params['id']);
            } else if (params['employeeId']) {
                this.emEmpSkillsPopupService.open(EmEmpSkillsDialogComponent as Component, null, params['employeeId']);
            } else {
                this.emEmpSkillsPopupService
                    .open(EmEmpSkillsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
