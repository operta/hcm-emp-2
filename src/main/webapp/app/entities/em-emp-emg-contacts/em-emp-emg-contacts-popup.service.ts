import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmEmpEmgContacts } from './em-emp-emg-contacts.model';
import { EmEmpEmgContactsService } from './em-emp-emg-contacts.service';
import {EmEmployeesService} from "../em-employees/em-employees.service";
import {EmEmployees} from "../em-employees/em-employees.model";

@Injectable()
export class EmEmpEmgContactsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emEmpEmgContactsService: EmEmpEmgContactsService,
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
                this.emEmpEmgContactsService.find(id).subscribe((emEmpEmgContacts) => {
                    emEmpEmgContacts.createdAt = this.datePipe
                        .transform(emEmpEmgContacts.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    emEmpEmgContacts.updatedAt = this.datePipe
                        .transform(emEmpEmgContacts.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.emEmpEmgContactsModalRef(component, emEmpEmgContacts);
                    resolve(this.ngbModalRef);
                });
            } else if(employeeId) {
                this.employeeService.find(employeeId).subscribe((item) => {
                    this.ngbModalRef = this.emEmpEmgContactsModalRef(component, new EmEmpEmgContacts(), item);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.emEmpEmgContactsModalRef(component, new EmEmpEmgContacts());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    emEmpEmgContactsModalRef(component: Component, emEmpEmgContacts: EmEmpEmgContacts, employee?: EmEmployees): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.emEmpEmgContacts = emEmpEmgContacts;
        if(employee) {
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
