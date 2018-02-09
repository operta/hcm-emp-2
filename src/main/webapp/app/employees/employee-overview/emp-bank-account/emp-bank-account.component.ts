import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EmEmpBankAccountsService} from "../../../entities/em-emp-bank-accounts/em-emp-bank-accounts.service";
import {EmEmpBankAccounts} from "../../../entities/em-emp-bank-accounts/em-emp-bank-accounts.model";
import {JhiEventManager} from "ng-jhipster";
import {Subscription} from "rxjs/Subscription";

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
              private eventManager: JhiEventManager) { }

  ngOnInit() {
      this.bankAccountService.findByIdEmployee(this.employee.id).subscribe(
          (items) => this.bankAccounts = items
      );
      this.registerChangeInAddress()
  }

    registerChangeInAddress() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpBankAccountsListModification', (response) =>   {
            this.bankAccountService.findByIdEmployee(this.employee.id).subscribe(
                (items) => this.bankAccounts = items
            );
        });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

}


