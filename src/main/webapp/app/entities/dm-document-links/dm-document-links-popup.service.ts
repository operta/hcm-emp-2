import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { DmDocumentLinks } from './dm-document-links.model';
import { DmDocumentLinksService } from './dm-document-links.service';

@Injectable()
export class DmDocumentLinksPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private dmDocumentLinksService: DmDocumentLinksService

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
                this.dmDocumentLinksService.find(id).subscribe((dmDocumentLinks) => {
                    dmDocumentLinks.createdAt = this.datePipe
                        .transform(dmDocumentLinks.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    dmDocumentLinks.updatedAt = this.datePipe
                        .transform(dmDocumentLinks.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.dmDocumentLinksModalRef(component, dmDocumentLinks);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.dmDocumentLinksModalRef(component, new DmDocumentLinks());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    dmDocumentLinksModalRef(component: Component, dmDocumentLinks: DmDocumentLinks): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.dmDocumentLinks = dmDocumentLinks;
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
