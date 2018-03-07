import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmInjuryTypes } from './em-injury-types.model';
import { EmInjuryTypesService } from './em-injury-types.service';

@Injectable()
export class EmInjuryTypesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emInjuryTypesService: EmInjuryTypesService

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
                this.emInjuryTypesService.find(id).subscribe((emInjuryTypes) => {
                    emInjuryTypes.createdAt = this.datePipe
                        .transform(emInjuryTypes.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    emInjuryTypes.updatedAt = this.datePipe
                        .transform(emInjuryTypes.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.emInjuryTypesModalRef(component, emInjuryTypes);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.emInjuryTypesModalRef(component, new EmInjuryTypes());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    emInjuryTypesModalRef(component: Component, emInjuryTypes: EmInjuryTypes): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.emInjuryTypes = emInjuryTypes;
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
