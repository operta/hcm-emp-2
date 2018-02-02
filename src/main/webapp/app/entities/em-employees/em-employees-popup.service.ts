import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmEmployees } from './em-employees.model';
import { EmEmployeesService } from './em-employees.service';

@Injectable()
export class EmEmployeesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emEmployeesService: EmEmployeesService

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
                this.emEmployeesService.find(id).subscribe((emEmployees) => {
                    if (emEmployees.dateOfBirth) {
                        emEmployees.dateOfBirth = {
                            year: emEmployees.dateOfBirth.getFullYear(),
                            month: emEmployees.dateOfBirth.getMonth() + 1,
                            day: emEmployees.dateOfBirth.getDate()
                        };
                    }
                    if (emEmployees.hireDate) {
                        emEmployees.hireDate = {
                            year: emEmployees.hireDate.getFullYear(),
                            month: emEmployees.hireDate.getMonth() + 1,
                            day: emEmployees.hireDate.getDate()
                        };
                    }
                    emEmployees.createdAt = this.datePipe
                        .transform(emEmployees.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    emEmployees.updatedAt = this.datePipe
                        .transform(emEmployees.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.emEmployeesModalRef(component, emEmployees);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.emEmployeesModalRef(component, new EmEmployees());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    emEmployeesModalRef(component: Component, emEmployees: EmEmployees): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.emEmployees = emEmployees;
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
