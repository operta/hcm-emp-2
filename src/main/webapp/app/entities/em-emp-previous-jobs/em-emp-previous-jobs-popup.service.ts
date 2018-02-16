import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmEmpPreviousJobs } from './em-emp-previous-jobs.model';
import { EmEmpPreviousJobsService } from './em-emp-previous-jobs.service';
import {EmEmployeesService} from "../em-employees/em-employees.service";
import {EmEmployees} from "../em-employees/em-employees.model";

@Injectable()
export class EmEmpPreviousJobsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emEmpPreviousJobsService: EmEmpPreviousJobsService,
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
                this.emEmpPreviousJobsService.find(id).subscribe((emEmpPreviousJobs) => {
                    if (emEmpPreviousJobs.dateFrom) {
                        emEmpPreviousJobs.dateFrom = {
                            year: emEmpPreviousJobs.dateFrom.getFullYear(),
                            month: emEmpPreviousJobs.dateFrom.getMonth() + 1,
                            day: emEmpPreviousJobs.dateFrom.getDate()
                        };
                    }
                    if (emEmpPreviousJobs.dateTo) {
                        emEmpPreviousJobs.dateTo = {
                            year: emEmpPreviousJobs.dateTo.getFullYear(),
                            month: emEmpPreviousJobs.dateTo.getMonth() + 1,
                            day: emEmpPreviousJobs.dateTo.getDate()
                        };
                    }
                    emEmpPreviousJobs.createdAt = this.datePipe
                        .transform(emEmpPreviousJobs.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    emEmpPreviousJobs.updatedAt = this.datePipe
                        .transform(emEmpPreviousJobs.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.emEmpPreviousJobsModalRef(component, emEmpPreviousJobs);
                    resolve(this.ngbModalRef);
                });
            } else {
                this.employeeService.find(employeeId).subscribe((employee) => {
                    this.ngbModalRef = this.emEmpPreviousJobsModalRef(component, new EmEmpPreviousJobs(), employee);
                    resolve(this.ngbModalRef);
                });

            }
        });
    }

    emEmpPreviousJobsModalRef(component: Component, emEmpPreviousJobs: EmEmpPreviousJobs, employee?: EmEmployees): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.emEmpPreviousJobs = emEmpPreviousJobs;
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
