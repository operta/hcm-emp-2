import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { OgOrgTypes } from './og-org-types.model';
import { OgOrgTypesService } from './og-org-types.service';

@Injectable()
export class OgOrgTypesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private ogOrgTypesService: OgOrgTypesService

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
                this.ogOrgTypesService.find(id).subscribe((ogOrgTypes) => {
                    ogOrgTypes.createdAt = this.datePipe
                        .transform(ogOrgTypes.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    ogOrgTypes.updatedAt = this.datePipe
                        .transform(ogOrgTypes.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.ogOrgTypesModalRef(component, ogOrgTypes);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.ogOrgTypesModalRef(component, new OgOrgTypes());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    ogOrgTypesModalRef(component: Component, ogOrgTypes: OgOrgTypes): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ogOrgTypes = ogOrgTypes;
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
