import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmEmpIdentifications } from './em-emp-identifications.model';
import { EmEmpIdentificationsService } from './em-emp-identifications.service';
import {EmEmployeesService} from "../em-employees/em-employees.service";
import {EmEmployees} from "../em-employees/em-employees.model";

@Injectable()
export class EmEmpIdentificationsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emEmpIdentificationsService: EmEmpIdentificationsService,
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
                this.emEmpIdentificationsService.find(id).subscribe((emEmpIdentifications) => {
                    if (emEmpIdentifications.validThrough) {
                        emEmpIdentifications.validThrough = {
                            year: emEmpIdentifications.validThrough.getFullYear(),
                            month: emEmpIdentifications.validThrough.getMonth() + 1,
                            day: emEmpIdentifications.validThrough.getDate()
                        };
                    }
                    emEmpIdentifications.createdAt = this.datePipe
                        .transform(emEmpIdentifications.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    emEmpIdentifications.updatedAt = this.datePipe
                        .transform(emEmpIdentifications.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.emEmpIdentificationsModalRef(component, emEmpIdentifications);
                    resolve(this.ngbModalRef);
                });
            } else if (employeeId) {
                this.employeeService.find(employeeId).subscribe(
                    (employee) => {
                        this.ngbModalRef = this.emEmpIdentificationsModalRef(component, new EmEmpIdentifications(), employee);
                        resolve(this.ngbModalRef);
                    }
                );
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.emEmpIdentificationsModalRef(component, new EmEmpIdentifications());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    emEmpIdentificationsModalRef(component: Component, emEmpIdentifications: EmEmpIdentifications, employee?: EmEmployees): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        if(employee) {
            modalRef.componentInstance.employee = employee;
        }
        modalRef.componentInstance.emEmpIdentifications = emEmpIdentifications;
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
