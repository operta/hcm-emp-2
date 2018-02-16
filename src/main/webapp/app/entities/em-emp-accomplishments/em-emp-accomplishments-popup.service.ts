import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmEmpAccomplishments } from './em-emp-accomplishments.model';
import { EmEmpAccomplishmentsService } from './em-emp-accomplishments.service';
import {EmEmployeesService} from "../em-employees/em-employees.service";
import {EmEmployees} from "../em-employees/em-employees.model";

@Injectable()
export class EmEmpAccomplishmentsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emEmpAccomplishmentsService: EmEmpAccomplishmentsService,
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
                this.emEmpAccomplishmentsService.find(id).subscribe((emEmpAccomplishments) => {
                    if (emEmpAccomplishments.dateFrom) {
                        emEmpAccomplishments.dateFrom = {
                            year: emEmpAccomplishments.dateFrom.getFullYear(),
                            month: emEmpAccomplishments.dateFrom.getMonth() + 1,
                            day: emEmpAccomplishments.dateFrom.getDate()
                        };
                    }
                    if (emEmpAccomplishments.dateTo) {
                        emEmpAccomplishments.dateTo = {
                            year: emEmpAccomplishments.dateTo.getFullYear(),
                            month: emEmpAccomplishments.dateTo.getMonth() + 1,
                            day: emEmpAccomplishments.dateTo.getDate()
                        };
                    }
                    emEmpAccomplishments.createdAt = this.datePipe
                        .transform(emEmpAccomplishments.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    emEmpAccomplishments.updatedAt = this.datePipe
                        .transform(emEmpAccomplishments.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.emEmpAccomplishmentsModalRef(component, emEmpAccomplishments);
                    resolve(this.ngbModalRef);
                });
            } else {
                this.employeeService.find(employeeId).subscribe((employee) => {
                    this.ngbModalRef = this.emEmpAccomplishmentsModalRef(component, new EmEmpAccomplishments(), employee);
                    resolve(this.ngbModalRef);
                });

            }
        });
    }

    emEmpAccomplishmentsModalRef(component: Component, emEmpAccomplishments: EmEmpAccomplishments, employee?: EmEmployees): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.emEmpAccomplishments = emEmpAccomplishments;
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
