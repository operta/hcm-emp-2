import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { RgContactTypes } from './rg-contact-types.model';
import { RgContactTypesService } from './rg-contact-types.service';

@Injectable()
export class RgContactTypesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private rgContactTypesService: RgContactTypesService

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
                this.rgContactTypesService.find(id).subscribe((rgContactTypes) => {
                    rgContactTypes.createdAt = this.datePipe
                        .transform(rgContactTypes.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    rgContactTypes.updatedAt = this.datePipe
                        .transform(rgContactTypes.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.rgContactTypesModalRef(component, rgContactTypes);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.rgContactTypesModalRef(component, new RgContactTypes());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    rgContactTypesModalRef(component: Component, rgContactTypes: RgContactTypes): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.rgContactTypes = rgContactTypes;
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
