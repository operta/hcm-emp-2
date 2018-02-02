import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmEmpAccomplishments } from './em-emp-accomplishments.model';
import { EmEmpAccomplishmentsService } from './em-emp-accomplishments.service';

@Injectable()
export class EmEmpAccomplishmentsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emEmpAccomplishmentsService: EmEmpAccomplishmentsService

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
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.emEmpAccomplishmentsModalRef(component, new EmEmpAccomplishments());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    emEmpAccomplishmentsModalRef(component: Component, emEmpAccomplishments: EmEmpAccomplishments): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.emEmpAccomplishments = emEmpAccomplishments;
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
