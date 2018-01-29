import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { OgOrganizations } from './og-organizations.model';
import { OgOrganizationsService } from './og-organizations.service';

@Injectable()
export class OgOrganizationsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private ogOrganizationsService: OgOrganizationsService

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
                this.ogOrganizationsService.find(id).subscribe((ogOrganizations) => {
                    ogOrganizations.createdAt = this.datePipe
                        .transform(ogOrganizations.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    ogOrganizations.updatedAt = this.datePipe
                        .transform(ogOrganizations.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.ogOrganizationsModalRef(component, ogOrganizations);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.ogOrganizationsModalRef(component, new OgOrganizations());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    ogOrganizationsModalRef(component: Component, ogOrganizations: OgOrganizations): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ogOrganizations = ogOrganizations;
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
