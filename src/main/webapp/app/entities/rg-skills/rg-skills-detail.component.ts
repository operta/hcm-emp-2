import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RgSkills } from './rg-skills.model';
import { RgSkillsService } from './rg-skills.service';

@Component({
    selector: 'jhi-rg-skills-detail',
    templateUrl: './rg-skills-detail.component.html'
})
export class RgSkillsDetailComponent implements OnInit, OnDestroy {

    rgSkills: RgSkills;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rgSkillsService: RgSkillsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRgSkills();
    }

    load(id) {
        this.rgSkillsService.find(id).subscribe((rgSkills) => {
            this.rgSkills = rgSkills;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRgSkills() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rgSkillsListModification',
            (response) => this.load(this.rgSkills.id)
        );
    }
}
