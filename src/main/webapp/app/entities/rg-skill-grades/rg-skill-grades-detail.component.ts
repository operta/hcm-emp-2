import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RgSkillGrades } from './rg-skill-grades.model';
import { RgSkillGradesService } from './rg-skill-grades.service';

@Component({
    selector: 'jhi-rg-skill-grades-detail',
    templateUrl: './rg-skill-grades-detail.component.html'
})
export class RgSkillGradesDetailComponent implements OnInit, OnDestroy {

    rgSkillGrades: RgSkillGrades;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rgSkillGradesService: RgSkillGradesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRgSkillGrades();
    }

    load(id) {
        this.rgSkillGradesService.find(id).subscribe((rgSkillGrades) => {
            this.rgSkillGrades = rgSkillGrades;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRgSkillGrades() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rgSkillGradesListModification',
            (response) => this.load(this.rgSkillGrades.id)
        );
    }
}
