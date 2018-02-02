import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { OgOrgWorkPlaces } from './og-org-work-places.model';
import { OgOrgWorkPlacesService } from './og-org-work-places.service';

@Injectable()
export class OgOrgWorkPlacesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private ogOrgWorkPlacesService: OgOrgWorkPlacesService

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
                this.ogOrgWorkPlacesService.find(id).subscribe((ogOrgWorkPlaces) => {
                    ogOrgWorkPlaces.createdAt = this.datePipe
                        .transform(ogOrgWorkPlaces.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    ogOrgWorkPlaces.updatedAt = this.datePipe
                        .transform(ogOrgWorkPlaces.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.ogOrgWorkPlacesModalRef(component, ogOrgWorkPlaces);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.ogOrgWorkPlacesModalRef(component, new OgOrgWorkPlaces());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    ogOrgWorkPlacesModalRef(component: Component, ogOrgWorkPlaces: OgOrgWorkPlaces): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ogOrgWorkPlaces = ogOrgWorkPlaces;
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
