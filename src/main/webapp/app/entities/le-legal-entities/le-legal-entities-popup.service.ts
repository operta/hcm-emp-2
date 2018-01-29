import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { LeLegalEntities } from './le-legal-entities.model';
import { LeLegalEntitiesService } from './le-legal-entities.service';

@Injectable()
export class LeLegalEntitiesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private leLegalEntitiesService: LeLegalEntitiesService

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
                this.leLegalEntitiesService.find(id).subscribe((leLegalEntities) => {
                    leLegalEntities.createdAt = this.datePipe
                        .transform(leLegalEntities.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    leLegalEntities.updatedAt = this.datePipe
                        .transform(leLegalEntities.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.leLegalEntitiesModalRef(component, leLegalEntities);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.leLegalEntitiesModalRef(component, new LeLegalEntities());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    leLegalEntitiesModalRef(component: Component, leLegalEntities: LeLegalEntities): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.leLegalEntities = leLegalEntities;
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
