import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RgSkillGrades } from './rg-skill-grades.model';
import { RgSkillGradesService } from './rg-skill-grades.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rg-skill-grades',
    templateUrl: './rg-skill-grades.component.html'
})
export class RgSkillGradesComponent implements OnInit, OnDestroy {
rgSkillGrades: RgSkillGrades[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private rgSkillGradesService: RgSkillGradesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.rgSkillGradesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.rgSkillGrades = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRgSkillGrades();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RgSkillGrades) {
        return item.id;
    }
    registerChangeInRgSkillGrades() {
        this.eventSubscriber = this.eventManager.subscribe('rgSkillGradesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
