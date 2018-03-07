import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RgSkills } from './rg-skills.model';
import { RgSkillsService } from './rg-skills.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rg-skills',
    templateUrl: './rg-skills.component.html'
})
export class RgSkillsComponent implements OnInit, OnDestroy {
rgSkills: RgSkills[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private rgSkillsService: RgSkillsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.rgSkillsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.rgSkills = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRgSkills();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RgSkills) {
        return item.id;
    }
    registerChangeInRgSkills() {
        this.eventSubscriber = this.eventManager.subscribe('rgSkillsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
