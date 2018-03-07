import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmBorrowingTypes } from './em-borrowing-types.model';
import { EmBorrowingTypesService } from './em-borrowing-types.service';

@Injectable()
export class EmBorrowingTypesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emBorrowingTypesService: EmBorrowingTypesService

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
                this.emBorrowingTypesService.find(id).subscribe((emBorrowingTypes) => {
                    emBorrowingTypes.createdAt = this.datePipe
                        .transform(emBorrowingTypes.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    emBorrowingTypes.updatedAt = this.datePipe
                        .transform(emBorrowingTypes.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.emBorrowingTypesModalRef(component, emBorrowingTypes);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.emBorrowingTypesModalRef(component, new EmBorrowingTypes());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    emBorrowingTypesModalRef(component: Component, emBorrowingTypes: EmBorrowingTypes): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.emBorrowingTypes = emBorrowingTypes;
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
