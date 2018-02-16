import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EmEmpBankAccountsService} from "../../../entities/em-emp-bank-accounts/em-emp-bank-accounts.service";
import {EmEmpBankAccounts} from "../../../entities/em-emp-bank-accounts/em-emp-bank-accounts.model";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {Subscription} from "rxjs/Subscription";
import {ResponseWrapper} from "../../../shared/model/response-wrapper.model";

@Component({
  selector: 'jhi-emp-bank-account',
  templateUrl: './emp-bank-account.component.html',
  styles: []
})
export class EmpBankAccountComponent implements OnInit, OnDestroy {
    @Input() employee;
    @Input() isEditable;
    bankAccounts: EmEmpBankAccounts;
    eventSubscriber: Subscription;

  constructor(private bankAccountService: EmEmpBankAccountsService,
              private eventManager: JhiEventManager,
              private jhiAlertService: JhiAlertService) { }

  ngOnInit() {
      console.log(this.employee);
      this.loadAll();
      this.registerChangeInAddress()
  }

    registerChangeInAddress() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpBankAccountsListModification', (response) =>   this.loadAll());
    }

    loadAll() {
      console.log(this.employee.id);
      this.bankAccountService.findByIdEmployee(this.employee.id).subscribe(
          (item: EmEmpBankAccounts) => this.bankAccounts = item,
          (error: Error) => this.onError(error)
      )
    }


    private onError(error) {
        this.jhiAlertService.error("Employee has no bank account", null, null);
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

}


