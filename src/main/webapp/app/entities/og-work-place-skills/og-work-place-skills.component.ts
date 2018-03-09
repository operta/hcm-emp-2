import {Component, OnInit, OnDestroy, Input, OnChanges} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OgWorkPlaceSkills } from './og-work-place-skills.model';
import { OgWorkPlaceSkillsService } from './og-work-place-skills.service';
import { Principal, ResponseWrapper } from '../../shared';
import {OgWorkPlaces} from "../og-work-places/og-work-places.model";

@Component({
    selector: 'jhi-og-work-place-skills',
    templateUrl: './og-work-place-skills.component.html'
})
export class OgWorkPlaceSkillsComponent implements OnInit, OnDestroy, OnChanges {
    @Input() workplace: OgWorkPlaces;
    ogWorkPlaceSkills: OgWorkPlaceSkills[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ogWorkPlaceSkillsService: OgWorkPlaceSkillsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ogWorkPlaceSkillsService.findByWorkplace(this.workplace.id).subscribe(
            (res: ResponseWrapper) => {
                this.ogWorkPlaceSkills = res.json;
                console.log(res.json);
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        console.log(this.workplace);
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOgWorkPlaceSkills();
    }

    ngOnChanges() {
        this.loadAll();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OgWorkPlaceSkills) {
        return item.id;
    }
    registerChangeInOgWorkPlaceSkills() {
        this.eventSubscriber = this.eventManager.subscribe('ogWorkPlaceSkillsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
