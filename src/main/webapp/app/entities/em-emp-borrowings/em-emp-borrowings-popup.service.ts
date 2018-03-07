import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmEmpBorrowings } from './em-emp-borrowings.model';
import { EmEmpBorrowingsService } from './em-emp-borrowings.service';
import {EmEmployeesService} from "../em-employees/em-employees.service";
import {EmEmployees} from "../em-employees/em-employees.model";

@Injectable()
export class EmEmpBorrowingsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emEmpBorrowingsService: EmEmpBorrowingsService,
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
                this.emEmpBorrowingsService.find(id).subscribe((emEmpBorrowings) => {
                    if (emEmpBorrowings.dateFrom) {
                        emEmpBorrowings.dateFrom = {
                            year: emEmpBorrowings.dateFrom.getFullYear(),
                            month: emEmpBorrowings.dateFrom.getMonth() + 1,
                            day: emEmpBorrowings.dateFrom.getDate()
                        };
                    }
                    if (emEmpBorrowings.dateTo) {
                        emEmpBorrowings.dateTo = {
                            year: emEmpBorrowings.dateTo.getFullYear(),
                            month: emEmpBorrowings.dateTo.getMonth() + 1,
                            day: emEmpBorrowings.dateTo.getDate()
                        };
                    }
                    emEmpBorrowings.createdAt = this.datePipe
                        .transform(emEmpBorrowings.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    emEmpBorrowings.updatedAt = this.datePipe
                        .transform(emEmpBorrowings.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.emEmpBorrowingsModalRef(component, emEmpBorrowings);
                    resolve(this.ngbModalRef);
                });
            } else {

                this.employeeService.find(employeeId).subscribe((employee) => {
                    this.ngbModalRef = this.emEmpBorrowingsModalRef(component, new EmEmpBorrowings(), employee);
                    resolve(this.ngbModalRef);
                });
            }
        });
    }

    emEmpBorrowingsModalRef(component: Component, emEmpBorrowings: EmEmpBorrowings, employee?: EmEmployees): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.emEmpBorrowings = emEmpBorrowings;
        if(employee) {
            modalRef.componentInstance.employee = employee
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
