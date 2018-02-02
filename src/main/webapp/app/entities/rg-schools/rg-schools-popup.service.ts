import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { RgSchools } from './rg-schools.model';
import { RgSchoolsService } from './rg-schools.service';

@Injectable()
export class RgSchoolsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private rgSchoolsService: RgSchoolsService

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
                this.rgSchoolsService.find(id).subscribe((rgSchools) => {
                    rgSchools.createdAt = this.datePipe
                        .transform(rgSchools.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    rgSchools.updatedAt = this.datePipe
                        .transform(rgSchools.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.rgSchoolsModalRef(component, rgSchools);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.rgSchoolsModalRef(component, new RgSchools());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    rgSchoolsModalRef(component: Component, rgSchools: RgSchools): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.rgSchools = rgSchools;
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
