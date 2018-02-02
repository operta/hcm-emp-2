import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { RgQualifications } from './rg-qualifications.model';
import { RgQualificationsService } from './rg-qualifications.service';

@Injectable()
export class RgQualificationsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private rgQualificationsService: RgQualificationsService

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
                this.rgQualificationsService.find(id).subscribe((rgQualifications) => {
                    rgQualifications.createdAt = this.datePipe
                        .transform(rgQualifications.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    rgQualifications.updatedAt = this.datePipe
                        .transform(rgQualifications.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.rgQualificationsModalRef(component, rgQualifications);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.rgQualificationsModalRef(component, new RgQualifications());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    rgQualificationsModalRef(component: Component, rgQualifications: RgQualifications): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.rgQualifications = rgQualifications;
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
