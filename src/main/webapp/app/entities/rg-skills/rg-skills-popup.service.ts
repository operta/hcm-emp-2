import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { RgSkills } from './rg-skills.model';
import { RgSkillsService } from './rg-skills.service';

@Injectable()
export class RgSkillsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private rgSkillsService: RgSkillsService

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
                this.rgSkillsService.find(id).subscribe((rgSkills) => {
                    rgSkills.createdAt = this.datePipe
                        .transform(rgSkills.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    rgSkills.updatedAt = this.datePipe
                        .transform(rgSkills.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.rgSkillsModalRef(component, rgSkills);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.rgSkillsModalRef(component, new RgSkills());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    rgSkillsModalRef(component: Component, rgSkills: RgSkills): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.rgSkills = rgSkills;
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
