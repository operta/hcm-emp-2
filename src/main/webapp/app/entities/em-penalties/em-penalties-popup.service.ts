import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmPenalties } from './em-penalties.model';
import { EmPenaltiesService } from './em-penalties.service';
import {EmEmployeesService} from "../em-employees/em-employees.service";
import {EmEmployees} from "../em-employees/em-employees.model";

@Injectable()
export class EmPenaltiesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emPenaltiesService: EmPenaltiesService,
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
                this.emPenaltiesService.find(id).subscribe((emPenalties) => {
                    if (emPenalties.dateFrom) {
                        emPenalties.dateFrom = {
                            year: emPenalties.dateFrom.getFullYear(),
                            month: emPenalties.dateFrom.getMonth() + 1,
                            day: emPenalties.dateFrom.getDate()
                        };
                    }
                    if (emPenalties.dateTo) {
                        emPenalties.dateTo = {
                            year: emPenalties.dateTo.getFullYear(),
                            month: emPenalties.dateTo.getMonth() + 1,
                            day: emPenalties.dateTo.getDate()
                        };
                    }
                    emPenalties.createdAt = this.datePipe
                        .transform(emPenalties.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    emPenalties.updatedAt = this.datePipe
                        .transform(emPenalties.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.emPenaltiesModalRef(component, emPenalties);
                    resolve(this.ngbModalRef);
                });
            } else if (employeeId) {
                this.employeeService.find(employeeId).subscribe(
                    (employee) => {
                        this.ngbModalRef = this.emPenaltiesModalRef(component, new EmPenalties(), employee);
                        resolve(this.ngbModalRef);
                    }
                );
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.emPenaltiesModalRef(component, new EmPenalties());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    emPenaltiesModalRef(component: Component, emPenalties: EmPenalties, employee?: EmEmployees): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        if(employee) {
            modalRef.componentInstance.employee = employee;
        }
        modalRef.componentInstance.emPenalties = emPenalties;
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
