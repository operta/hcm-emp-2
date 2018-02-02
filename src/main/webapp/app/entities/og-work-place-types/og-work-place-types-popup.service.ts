import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { OgWorkPlaceTypes } from './og-work-place-types.model';
import { OgWorkPlaceTypesService } from './og-work-place-types.service';

@Injectable()
export class OgWorkPlaceTypesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private ogWorkPlaceTypesService: OgWorkPlaceTypesService

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
                this.ogWorkPlaceTypesService.find(id).subscribe((ogWorkPlaceTypes) => {
                    ogWorkPlaceTypes.createdAt = this.datePipe
                        .transform(ogWorkPlaceTypes.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    ogWorkPlaceTypes.updatedAt = this.datePipe
                        .transform(ogWorkPlaceTypes.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.ogWorkPlaceTypesModalRef(component, ogWorkPlaceTypes);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.ogWorkPlaceTypesModalRef(component, new OgWorkPlaceTypes());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    ogWorkPlaceTypesModalRef(component: Component, ogWorkPlaceTypes: OgWorkPlaceTypes): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ogWorkPlaceTypes = ogWorkPlaceTypes;
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
