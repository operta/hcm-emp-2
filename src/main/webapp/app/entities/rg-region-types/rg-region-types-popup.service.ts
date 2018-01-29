import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { RgRegionTypes } from './rg-region-types.model';
import { RgRegionTypesService } from './rg-region-types.service';

@Injectable()
export class RgRegionTypesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private rgRegionTypesService: RgRegionTypesService

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
                this.rgRegionTypesService.find(id).subscribe((rgRegionTypes) => {
                    rgRegionTypes.createdAt = this.datePipe
                        .transform(rgRegionTypes.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    rgRegionTypes.updatedAt = this.datePipe
                        .transform(rgRegionTypes.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.rgRegionTypesModalRef(component, rgRegionTypes);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.rgRegionTypesModalRef(component, new RgRegionTypes());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    rgRegionTypesModalRef(component: Component, rgRegionTypes: RgRegionTypes): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.rgRegionTypes = rgRegionTypes;
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
