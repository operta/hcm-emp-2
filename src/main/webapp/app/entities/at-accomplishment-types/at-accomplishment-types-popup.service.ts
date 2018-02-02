import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AtAccomplishmentTypes } from './at-accomplishment-types.model';
import { AtAccomplishmentTypesService } from './at-accomplishment-types.service';

@Injectable()
export class AtAccomplishmentTypesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private atAccomplishmentTypesService: AtAccomplishmentTypesService

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
                this.atAccomplishmentTypesService.find(id).subscribe((atAccomplishmentTypes) => {
                    atAccomplishmentTypes.createdAt = this.datePipe
                        .transform(atAccomplishmentTypes.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    atAccomplishmentTypes.updatedAt = this.datePipe
                        .transform(atAccomplishmentTypes.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.atAccomplishmentTypesModalRef(component, atAccomplishmentTypes);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.atAccomplishmentTypesModalRef(component, new AtAccomplishmentTypes());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    atAccomplishmentTypesModalRef(component: Component, atAccomplishmentTypes: AtAccomplishmentTypes): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.atAccomplishmentTypes = atAccomplishmentTypes;
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
