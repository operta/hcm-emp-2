import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import {EmEmployeesService} from "../../../entities/em-employees/em-employees.service";
import {EmEmployees} from "../../../entities/em-employees/em-employees.model";



@Injectable()
export class EmpSsnAndTaxNoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private employeeService: EmEmployeesService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.employeeService.find(id).subscribe((employee) => {
                    employee.createdAt = this.datePipe
                        .transform(employee.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    employee.updatedAt = this.datePipe
                        .transform(employee.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.employeeModalRef(component, employee);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.employeeModalRef(component, new EmEmployees());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    employeeModalRef(component: Component, employee: EmEmployees): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.employee = employee;
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
