import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { RgIdentificationTypes } from './rg-identification-types.model';
import { RgIdentificationTypesService } from './rg-identification-types.service';

@Injectable()
export class RgIdentificationTypesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private rgIdentificationTypesService: RgIdentificationTypesService

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
                this.rgIdentificationTypesService.find(id).subscribe((rgIdentificationTypes) => {
                    rgIdentificationTypes.createdAt = this.datePipe
                        .transform(rgIdentificationTypes.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    rgIdentificationTypes.updatedAt = this.datePipe
                        .transform(rgIdentificationTypes.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.rgIdentificationTypesModalRef(component, rgIdentificationTypes);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.rgIdentificationTypesModalRef(component, new RgIdentificationTypes());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    rgIdentificationTypesModalRef(component: Component, rgIdentificationTypes: RgIdentificationTypes): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.rgIdentificationTypes = rgIdentificationTypes;
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
