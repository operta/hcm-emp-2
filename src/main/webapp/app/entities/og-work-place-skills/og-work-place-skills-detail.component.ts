import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OgWorkPlaceSkills } from './og-work-place-skills.model';
import { OgWorkPlaceSkillsService } from './og-work-place-skills.service';

@Component({
    selector: 'jhi-og-work-place-skills-detail',
    templateUrl: './og-work-place-skills-detail.component.html'
})
export class OgWorkPlaceSkillsDetailComponent implements OnInit, OnDestroy {

    ogWorkPlaceSkills: OgWorkPlaceSkills;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ogWorkPlaceSkillsService: OgWorkPlaceSkillsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOgWorkPlaceSkills();
    }

    load(id) {
        this.ogWorkPlaceSkillsService.find(id).subscribe((ogWorkPlaceSkills) => {
            this.ogWorkPlaceSkills = ogWorkPlaceSkills;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOgWorkPlaceSkills() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ogWorkPlaceSkillsListModification',
            (response) => this.load(this.ogWorkPlaceSkills.id)
        );
    }
}
