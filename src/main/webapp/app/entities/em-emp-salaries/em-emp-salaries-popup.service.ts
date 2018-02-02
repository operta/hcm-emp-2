import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmEmpSalaries } from './em-emp-salaries.model';
import { EmEmpSalariesService } from './em-emp-salaries.service';

@Injectable()
export class EmEmpSalariesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emEmpSalariesService: EmEmpSalariesService

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
                this.emEmpSalariesService.find(id).subscribe((emEmpSalaries) => {
                    if (emEmpSalaries.dateFrom) {
                        emEmpSalaries.dateFrom = {
                            year: emEmpSalaries.dateFrom.getFullYear(),
                            month: emEmpSalaries.dateFrom.getMonth() + 1,
                            day: emEmpSalaries.dateFrom.getDate()
                        };
                    }
                    if (emEmpSalaries.dateTo) {
                        emEmpSalaries.dateTo = {
                            year: emEmpSalaries.dateTo.getFullYear(),
                            month: emEmpSalaries.dateTo.getMonth() + 1,
                            day: emEmpSalaries.dateTo.getDate()
                        };
                    }
                    emEmpSalaries.createdAt = this.datePipe
                        .transform(emEmpSalaries.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    emEmpSalaries.updatedAt = this.datePipe
                        .transform(emEmpSalaries.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.emEmpSalariesModalRef(component, emEmpSalaries);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.emEmpSalariesModalRef(component, new EmEmpSalaries());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    emEmpSalariesModalRef(component: Component, emEmpSalaries: EmEmpSalaries): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.emEmpSalaries = emEmpSalaries;
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
