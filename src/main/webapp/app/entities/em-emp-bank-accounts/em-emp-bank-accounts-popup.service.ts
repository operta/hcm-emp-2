import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmEmpBankAccounts } from './em-emp-bank-accounts.model';
import { EmEmpBankAccountsService } from './em-emp-bank-accounts.service';
import {EmEmployees} from "../em-employees/em-employees.model";
import {EmEmployeesService} from "../em-employees/em-employees.service";

@Injectable()
export class EmEmpBankAccountsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emEmpBankAccountsService: EmEmpBankAccountsService,
        private employeeService: EmEmployeesService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, employeeId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.emEmpBankAccountsService.find(id).subscribe((emEmpBankAccounts) => {
                    emEmpBankAccounts.createdAt = this.datePipe
                        .transform(emEmpBankAccounts.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    emEmpBankAccounts.updatedAt = this.datePipe
                        .transform(emEmpBankAccounts.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.emEmpBankAccountsModalRef(component, emEmpBankAccounts);
                    resolve(this.ngbModalRef);
                });
            } else {
                this.employeeService.find(employeeId).subscribe((employee) => {
                    this.ngbModalRef = this.emEmpBankAccountsModalRef(component, new EmEmpBankAccounts(), employee);
                    resolve(this.ngbModalRef);
                });

            }
        });
    }

    emEmpBankAccountsModalRef(component: Component, emEmpBankAccounts: EmEmpBankAccounts, employee?: EmEmployees): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.emEmpBankAccounts = emEmpBankAccounts;
        if(employee){
            modalRef.componentInstance.employee = employee;
        }
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
