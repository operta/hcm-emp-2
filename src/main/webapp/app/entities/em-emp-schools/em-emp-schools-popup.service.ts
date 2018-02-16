import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmEmpSchools } from './em-emp-schools.model';
import { EmEmpSchoolsService } from './em-emp-schools.service';
import {EmEmployeesService} from "../em-employees/em-employees.service";
import {EmEmployees} from "../em-employees/em-employees.model";

@Injectable()
export class EmEmpSchoolsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emEmpSchoolsService: EmEmpSchoolsService,
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
                this.emEmpSchoolsService.find(id).subscribe((emEmpSchools) => {
                    if (emEmpSchools.dateFrom) {
                        emEmpSchools.dateFrom = {
                            year: emEmpSchools.dateFrom.getFullYear(),
                            month: emEmpSchools.dateFrom.getMonth() + 1,
                            day: emEmpSchools.dateFrom.getDate()
                        };
                    }
                    if (emEmpSchools.dateTo) {
                        emEmpSchools.dateTo = {
                            year: emEmpSchools.dateTo.getFullYear(),
                            month: emEmpSchools.dateTo.getMonth() + 1,
                            day: emEmpSchools.dateTo.getDate()
                        };
                    }
                    emEmpSchools.createdAt = this.datePipe
                        .transform(emEmpSchools.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    emEmpSchools.updatedAt = this.datePipe
                        .transform(emEmpSchools.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.emEmpSchoolsModalRef(component, emEmpSchools);
                    resolve(this.ngbModalRef);
                });
            } else {
                this.employeeService.find(employeeId).subscribe((employee) => {
                    this.ngbModalRef = this.emEmpSchoolsModalRef(component, new EmEmpSchools(), employee);
                    resolve(this.ngbModalRef);
                });

            }
        });
    }

    emEmpSchoolsModalRef(component: Component, emEmpSchools: EmEmpSchools, employee?: EmEmployees): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.emEmpSchools = emEmpSchools;
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
