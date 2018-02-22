import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmEmpOrgWorkPlaces } from './em-emp-org-work-places.model';
import { EmEmpOrgWorkPlacesService } from './em-emp-org-work-places.service';
import {EmEmployeesService} from "../em-employees/em-employees.service";
import {EmEmployees} from "../em-employees/em-employees.model";

@Injectable()
export class EmEmpOrgWorkPlacesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emEmpOrgWorkPlacesService: EmEmpOrgWorkPlacesService,
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
                this.emEmpOrgWorkPlacesService.find(id).subscribe((emEmpOrgWorkPlaces) => {
                    if (emEmpOrgWorkPlaces.dateFrom) {
                        emEmpOrgWorkPlaces.dateFrom = {
                            year: emEmpOrgWorkPlaces.dateFrom.getFullYear(),
                            month: emEmpOrgWorkPlaces.dateFrom.getMonth() + 1,
                            day: emEmpOrgWorkPlaces.dateFrom.getDate()
                        };
                    }
                    if (emEmpOrgWorkPlaces.dateTo) {
                        emEmpOrgWorkPlaces.dateTo = {
                            year: emEmpOrgWorkPlaces.dateTo.getFullYear(),
                            month: emEmpOrgWorkPlaces.dateTo.getMonth() + 1,
                            day: emEmpOrgWorkPlaces.dateTo.getDate()
                        };
                    }
                    emEmpOrgWorkPlaces.createdAt = this.datePipe
                        .transform(emEmpOrgWorkPlaces.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    emEmpOrgWorkPlaces.updatedAt = this.datePipe
                        .transform(emEmpOrgWorkPlaces.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.emEmpOrgWorkPlacesModalRef(component, emEmpOrgWorkPlaces);
                    resolve(this.ngbModalRef);
                });
            } else {
                this.employeeService.find(employeeId).subscribe((employee) => {
                    this.ngbModalRef = this.emEmpOrgWorkPlacesModalRef(component, new EmEmpOrgWorkPlaces(), employee);
                    resolve(this.ngbModalRef);
                });
            }
        });
    }

    emEmpOrgWorkPlacesModalRef(component: Component, emEmpOrgWorkPlaces: EmEmpOrgWorkPlaces, employee?: EmEmployees): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.emEmpOrgWorkPlaces = emEmpOrgWorkPlaces;
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
