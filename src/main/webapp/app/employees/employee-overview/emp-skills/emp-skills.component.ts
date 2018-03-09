import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EmEmpSkills} from "../../../entities/em-emp-skills/em-emp-skills.model";
import {Subscription} from "rxjs/Subscription";
import {EmEmpSkillsService} from "../../../entities/em-emp-skills/em-emp-skills.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {ResponseWrapper} from "../../../shared/model/response-wrapper.model";

@Component({
  selector: 'jhi-emp-skills',
  templateUrl: './emp-skills.component.html',
  styles: []
})
export class EmpSkillsComponent implements OnInit, OnDestroy {
    @Input() employee;
    @Input() isEditable;

    skills: EmEmpSkills[];
    eventSubscription: Subscription;

    constructor(private skillsService: EmEmpSkillsService,
                private eventManager: JhiEventManager,
                private alertService: JhiAlertService) { }

    ngOnInit() {
        this.loadSkills();
        this.registerChange();
    }

    registerChange() {
        this.eventSubscription = this.eventManager.subscribe('emEmpSkillsListModification', (response) => this.loadSkills());
    }

    loadSkills() {
        this.skillsService.findByEmployeeId(this.employee.id).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    private onSuccess(data) {
        this.skills = data;
    }

    private onError(error) {
        this.alertService.error(error, null, null);
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscription);
    }
}
