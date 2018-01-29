import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { LeLegalEntityTypes } from './le-legal-entity-types.model';
import { LeLegalEntityTypesService } from './le-legal-entity-types.service';

@Injectable()
export class LeLegalEntityTypesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private leLegalEntityTypesService: LeLegalEntityTypesService

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
                this.leLegalEntityTypesService.find(id).subscribe((leLegalEntityTypes) => {
                    leLegalEntityTypes.createdAt = this.datePipe
                        .transform(leLegalEntityTypes.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    leLegalEntityTypes.updatedAt = this.datePipe
                        .transform(leLegalEntityTypes.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.leLegalEntityTypesModalRef(component, leLegalEntityTypes);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.leLegalEntityTypesModalRef(component, new LeLegalEntityTypes());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    leLegalEntityTypesModalRef(component: Component, leLegalEntityTypes: LeLegalEntityTypes): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.leLegalEntityTypes = leLegalEntityTypes;
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
