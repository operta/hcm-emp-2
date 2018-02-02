import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { OgWorkPlaces } from './og-work-places.model';
import { OgWorkPlacesService } from './og-work-places.service';

@Injectable()
export class OgWorkPlacesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private ogWorkPlacesService: OgWorkPlacesService

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
                this.ogWorkPlacesService.find(id).subscribe((ogWorkPlaces) => {
                    ogWorkPlaces.createdAt = this.datePipe
                        .transform(ogWorkPlaces.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    ogWorkPlaces.updatedAt = this.datePipe
                        .transform(ogWorkPlaces.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.ogWorkPlacesModalRef(component, ogWorkPlaces);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.ogWorkPlacesModalRef(component, new OgWorkPlaces());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    ogWorkPlacesModalRef(component: Component, ogWorkPlaces: OgWorkPlaces): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ogWorkPlaces = ogWorkPlaces;
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
