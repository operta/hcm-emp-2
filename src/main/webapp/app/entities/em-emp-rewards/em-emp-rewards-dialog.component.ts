import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpRewards } from './em-emp-rewards.model';
import { EmEmpRewardsPopupService } from './em-emp-rewards-popup.service';
import { EmEmpRewardsService } from './em-emp-rewards.service';
import { EmEmployees, EmEmployeesService } from '../em-employees';
import { EmRewardTypes, EmRewardTypesService } from '../em-reward-types';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-rewards-dialog',
    templateUrl: './em-emp-rewards-dialog.component.html'
})
export class EmEmpRewardsDialogComponent implements OnInit {
    employee: EmEmployees;
    emEmpRewards: EmEmpRewards;
    isSaving: boolean;

    idemployees: EmEmployees[];

    idrewards: EmRewardTypes[];
    dateRewardDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private emEmpRewardsService: EmEmpRewardsService,
        private emEmployeesService: EmEmployeesService,
        private emRewardTypesService: EmRewardTypesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.emEmployeesService
            .query({filter: 'ememprewards-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpRewards.idEmployee || !this.emEmpRewards.idEmployee.id) {
                    this.idemployees = res.json;
                } else {
                    this.emEmployeesService
                        .find(this.emEmpRewards.idEmployee.id)
                        .subscribe((subRes: EmEmployees) => {
                            this.idemployees = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.emRewardTypesService
            .query({filter: 'ememprewards-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpRewards.idReward || !this.emEmpRewards.idReward.id) {
                    this.idrewards = res.json;
                } else {
                    this.emRewardTypesService
                        .find(this.emEmpRewards.idReward.id)
                        .subscribe((subRes: EmRewardTypes) => {
                            this.idrewards = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.emEmpRewards.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emEmpRewardsService.update(this.emEmpRewards));
        } else {
            if(this.employee) {
                this.emEmpRewards.idEmployee = this.employee;
            }
            this.subscribeToSaveResponse(
                this.emEmpRewardsService.create(this.emEmpRewards));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmEmpRewards>) {
        result.subscribe((res: EmEmpRewards) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmEmpRewards) {
        this.eventManager.broadcast({ name: 'emEmpRewardsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEmEmployeesById(index: number, item: EmEmployees) {
        return item.id;
    }

    trackEmRewardTypesById(index: number, item: EmRewardTypes) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-em-emp-rewards-popup',
    template: ''
})
export class EmEmpRewardsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpRewardsPopupService: EmEmpRewardsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emEmpRewardsPopupService
                    .open(EmEmpRewardsDialogComponent as Component, params['id']);
            } else if (params['employeeId']) {
                this.emEmpRewardsPopupService.open(EmEmpRewardsDialogComponent as Component, null, params['employeeId']);
            } else {
                this.emEmpRewardsPopupService
                    .open(EmEmpRewardsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
