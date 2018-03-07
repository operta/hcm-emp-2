import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmEmpInjuries } from './em-emp-injuries.model';
import { EmEmpInjuriesService } from './em-emp-injuries.service';
import {EmEmployeesService} from "../em-employees/em-employees.service";
import {EmEmployees} from "../em-employees/em-employees.model";

@Injectable()
export class EmEmpInjuriesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emEmpInjuriesService: EmEmpInjuriesService,
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
                this.emEmpInjuriesService.find(id).subscribe((emEmpInjuries) => {
                    emEmpInjuries.createdAt = this.datePipe
                        .transform(emEmpInjuries.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    emEmpInjuries.updatedAt = this.datePipe
                        .transform(emEmpInjuries.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.emEmpInjuriesModalRef(component, emEmpInjuries);
                    resolve(this.ngbModalRef);
                });
            } else if (employeeId) {
                this.employeeService.find(employeeId).subscribe(
                    (employee) => {
                        this.ngbModalRef = this.emEmpInjuriesModalRef(component, new EmEmpInjuries(), employee)
                        resolve(this.ngbModalRef);
                    }
                );
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.emEmpInjuriesModalRef(component, new EmEmpInjuries());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    emEmpInjuriesModalRef(component: Component, emEmpInjuries: EmEmpInjuries, employee?: EmEmployees): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        if(employee) {
            modalRef.componentInstance.employee = employee;
        }
        modalRef.componentInstance.emEmpInjuries = emEmpInjuries;
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
