import {Component, Input, OnInit} from '@angular/core';
import {EmEmpBankAccountsService} from "../../../entities/em-emp-bank-accounts/em-emp-bank-accounts.service";

@Component({
  selector: 'jhi-emp-bank-account',
  templateUrl: './emp-bank-account.component.html',
  styles: []
})
export class EmpBankAccountComponent implements OnInit {
    @Input() employee;
    @Input() isEditable;

  constructor(private bankAccountService: EmEmpBankAccountsService) { }

  ngOnInit() {
      // find by employee
      // // this.bankAccountService.find()

  }

}
