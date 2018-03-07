import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EmEmpRewards} from "../../../entities/em-emp-rewards/em-emp-rewards.model";
import {Subscription} from "rxjs/Subscription";
import {EmEmpRewardsService} from "../../../entities/em-emp-rewards/em-emp-rewards.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {ResponseWrapper} from "../../../shared/model/response-wrapper.model";

@Component({
  selector: 'jhi-emp-rewards',
  templateUrl: './emp-rewards.component.html',
  styles: []
})
export class EmpRewardsComponent implements OnInit, OnDestroy {
    @Input() employee;
    @Input() isEditable;

    rewards: EmEmpRewards[];
    eventSubscription: Subscription;

    constructor(private rewardsService: EmEmpRewardsService,
                private eventManager: JhiEventManager,
                private alertService: JhiAlertService) { }

    ngOnInit() {
        this.loadRewards();
        this.registerChange();
    }

    registerChange() {
        this.eventSubscription = this.eventManager.subscribe('emEmpRewardsListModification', (response) => this.loadRewards());
    }

    loadRewards() {
        this.rewardsService.findByEmployeeId(this.employee.id).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    private onSuccess(data) {
        this.rewards = data;
    }

    private onError(error) {
        this.alertService.error(error, null, null);
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscription);
    }
}
