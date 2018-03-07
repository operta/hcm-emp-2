import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmRewardTypes } from './em-reward-types.model';
import { EmRewardTypesService } from './em-reward-types.service';

@Injectable()
export class EmRewardTypesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emRewardTypesService: EmRewardTypesService

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
                this.emRewardTypesService.find(id).subscribe((emRewardTypes) => {
                    emRewardTypes.createdAt = this.datePipe
                        .transform(emRewardTypes.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    emRewardTypes.updatedAt = this.datePipe
                        .transform(emRewardTypes.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.emRewardTypesModalRef(component, emRewardTypes);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.emRewardTypesModalRef(component, new EmRewardTypes());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    emRewardTypesModalRef(component: Component, emRewardTypes: EmRewardTypes): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.emRewardTypes = emRewardTypes;
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
