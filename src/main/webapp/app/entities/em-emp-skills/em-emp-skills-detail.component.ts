import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpSkills } from './em-emp-skills.model';
import { EmEmpSkillsService } from './em-emp-skills.service';

@Component({
    selector: 'jhi-em-emp-skills-detail',
    templateUrl: './em-emp-skills-detail.component.html'
})
export class EmEmpSkillsDetailComponent implements OnInit, OnDestroy {

    emEmpSkills: EmEmpSkills;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emEmpSkillsService: EmEmpSkillsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmEmpSkills();
    }

    load(id) {
        this.emEmpSkillsService.find(id).subscribe((emEmpSkills) => {
            this.emEmpSkills = emEmpSkills;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmEmpSkills() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emEmpSkillsListModification',
            (response) => this.load(this.emEmpSkills.id)
        );
    }
}
