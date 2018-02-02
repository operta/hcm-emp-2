import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { DmDocumentTypes } from './dm-document-types.model';
import { DmDocumentTypesService } from './dm-document-types.service';

@Injectable()
export class DmDocumentTypesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private dmDocumentTypesService: DmDocumentTypesService

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
                this.dmDocumentTypesService.find(id).subscribe((dmDocumentTypes) => {
                    dmDocumentTypes.createdAt = this.datePipe
                        .transform(dmDocumentTypes.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    dmDocumentTypes.updatedAt = this.datePipe
                        .transform(dmDocumentTypes.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.dmDocumentTypesModalRef(component, dmDocumentTypes);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.dmDocumentTypesModalRef(component, new DmDocumentTypes());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    dmDocumentTypesModalRef(component: Component, dmDocumentTypes: DmDocumentTypes): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.dmDocumentTypes = dmDocumentTypes;
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
