import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpBankAccounts } from './em-emp-bank-accounts.model';
import { EmEmpBankAccountsPopupService } from './em-emp-bank-accounts-popup.service';
import { EmEmpBankAccountsService } from './em-emp-bank-accounts.service';
import { EmEmployees, EmEmployeesService } from '../em-employees';
import { LeLegalEntities, LeLegalEntitiesService } from '../le-legal-entities';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-em-emp-bank-accounts-dialog',
    templateUrl: './em-emp-bank-accounts-dialog.component.html'
})
export class EmEmpBankAccountsDialogComponent implements OnInit {

    emEmpBankAccounts: EmEmpBankAccounts;
    isSaving: boolean;

    idemployees: EmEmployees[];

    idbanks: LeLegalEntities[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private emEmpBankAccountsService: EmEmpBankAccountsService,
        private emEmployeesService: EmEmployeesService,
        private leLegalEntitiesService: LeLegalEntitiesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.emEmployeesService
            .query({filter: 'emempbankaccounts-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpBankAccounts.idEmployee || !this.emEmpBankAccounts.idEmployee.id) {
                    this.idemployees = res.json;
                } else {
                    this.emEmployeesService
                        .find(this.emEmpBankAccounts.idEmployee.id)
                        .subscribe((subRes: EmEmployees) => {
                            this.idemployees = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.leLegalEntitiesService.findByIdEntityType(24601).subscribe(
            (items) => this.idbanks = items,
            (subRes: ResponseWrapper) => this.onError(subRes.json)

        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.emEmpBankAccounts.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emEmpBankAccountsService.update(this.emEmpBankAccounts));
        } else {
            this.subscribeToSaveResponse(
                this.emEmpBankAccountsService.create(this.emEmpBankAccounts));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmEmpBankAccounts>) {
        result.subscribe((res: EmEmpBankAccounts) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmEmpBankAccounts) {
        this.eventManager.broadcast({ name: 'emEmpBankAccountsListModification', content: 'OK'});
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

    trackLeLegalEntitiesById(index: number, item: LeLegalEntities) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-em-emp-bank-accounts-popup',
    template: ''
})
export class EmEmpBankAccountsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpBankAccountsPopupService: EmEmpBankAccountsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emEmpBankAccountsPopupService
                    .open(EmEmpBankAccountsDialogComponent as Component, params['id']);
            } else {
                this.emEmpBankAccountsPopupService
                    .open(EmEmpBankAccountsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
