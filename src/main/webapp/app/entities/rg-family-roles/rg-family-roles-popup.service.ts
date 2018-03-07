import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { RgFamilyRoles } from './rg-family-roles.model';
import { RgFamilyRolesService } from './rg-family-roles.service';

@Injectable()
export class RgFamilyRolesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private rgFamilyRolesService: RgFamilyRolesService

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
                this.rgFamilyRolesService.find(id).subscribe((rgFamilyRoles) => {
                    rgFamilyRoles.createdAt = this.datePipe
                        .transform(rgFamilyRoles.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    rgFamilyRoles.updatedAt = this.datePipe
                        .transform(rgFamilyRoles.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.rgFamilyRolesModalRef(component, rgFamilyRoles);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.rgFamilyRolesModalRef(component, new RgFamilyRoles());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    rgFamilyRolesModalRef(component: Component, rgFamilyRoles: RgFamilyRoles): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.rgFamilyRoles = rgFamilyRoles;
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
