import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpSkills } from './em-emp-skills.model';
import { EmEmpSkillsService } from './em-emp-skills.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-skills',
    templateUrl: './em-emp-skills.component.html'
})
export class EmEmpSkillsComponent implements OnInit, OnDestroy {
emEmpSkills: EmEmpSkills[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emEmpSkillsService: EmEmpSkillsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.emEmpSkillsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.emEmpSkills = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmEmpSkills();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmEmpSkills) {
        return item.id;
    }
    registerChangeInEmEmpSkills() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpSkillsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
