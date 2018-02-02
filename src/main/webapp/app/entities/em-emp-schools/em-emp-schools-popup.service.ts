import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmEmpSchools } from './em-emp-schools.model';
import { EmEmpSchoolsService } from './em-emp-schools.service';

@Injectable()
export class EmEmpSchoolsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emEmpSchoolsService: EmEmpSchoolsService

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
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.emEmpSchoolsModalRef(component, new EmEmpSchools());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    emEmpSchoolsModalRef(component: Component, emEmpSchools: EmEmpSchools): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.emEmpSchools = emEmpSchools;
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
