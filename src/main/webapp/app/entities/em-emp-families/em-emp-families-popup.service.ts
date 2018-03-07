import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmEmpFamilies } from './em-emp-families.model';
import { EmEmpFamiliesService } from './em-emp-families.service';
import {EmEmployeesService} from "../em-employees/em-employees.service";
import {EmEmployees} from "../em-employees/em-employees.model";

@Injectable()
export class EmEmpFamiliesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emEmpFamiliesService: EmEmpFamiliesService,
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
                this.emEmpFamiliesService.find(id).subscribe((emEmpFamilies) => {
                    emEmpFamilies.createdAt = this.datePipe
                        .transform(emEmpFamilies.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    emEmpFamilies.updatedAt = this.datePipe
                        .transform(emEmpFamilies.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.emEmpFamiliesModalRef(component, emEmpFamilies);
                    resolve(this.ngbModalRef);
                });
            } else if (employeeId) {
                this.employeeService.find(employeeId).subscribe(
                    (employee) => {
                        this.ngbModalRef = this.emEmpFamiliesModalRef(component, new EmEmpFamilies(), employee);
                        resolve(this.ngbModalRef);
                    }
                );
            } else {
                setTimeout(() => {
                    this.ngbModalRef = this.emEmpFamiliesModalRef(component, new EmEmpFamilies());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    emEmpFamiliesModalRef(component: Component, emEmpFamilies: EmEmpFamilies, employee?: EmEmployees): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        if(employee) {
            modalRef.componentInstance.employee = employee;
        }
        modalRef.componentInstance.emEmpFamilies = emEmpFamilies;
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
