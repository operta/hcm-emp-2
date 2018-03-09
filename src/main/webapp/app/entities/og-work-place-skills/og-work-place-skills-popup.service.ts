import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { OgWorkPlaceSkills } from './og-work-place-skills.model';
import { OgWorkPlaceSkillsService } from './og-work-place-skills.service';
import {OgWorkPlacesService} from "../og-work-places/og-work-places.service";
import {OgWorkPlaces} from "../og-work-places/og-work-places.model";

@Injectable()
export class OgWorkPlaceSkillsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private ogWorkPlaceSkillsService: OgWorkPlaceSkillsService,
        private workplaceService: OgWorkPlacesService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, workplaceId?: number |any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.ogWorkPlaceSkillsService.find(id).subscribe((ogWorkPlaceSkills) => {
                    if (ogWorkPlaceSkills.dateSkill) {
                        ogWorkPlaceSkills.dateSkill = {
                            year: ogWorkPlaceSkills.dateSkill.getFullYear(),
                            month: ogWorkPlaceSkills.dateSkill.getMonth() + 1,
                            day: ogWorkPlaceSkills.dateSkill.getDate()
                        };
                    }
                    ogWorkPlaceSkills.createdAt = this.datePipe
                        .transform(ogWorkPlaceSkills.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    ogWorkPlaceSkills.updatedAt = this.datePipe
                        .transform(ogWorkPlaceSkills.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.ogWorkPlaceSkillsModalRef(component, ogWorkPlaceSkills);
                    resolve(this.ngbModalRef);
                });
            } else if (workplaceId) {
                this.workplaceService.find(workplaceId).subscribe((item) => {
                    this.ngbModalRef = this.ogWorkPlaceSkillsModalRef(component, new OgWorkPlaceSkills(), item);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.ogWorkPlaceSkillsModalRef(component, new OgWorkPlaceSkills());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    ogWorkPlaceSkillsModalRef(component: Component, ogWorkPlaceSkills: OgWorkPlaceSkills, workplace?: OgWorkPlaces): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ogWorkPlaceSkills = ogWorkPlaceSkills;
        if(workplace) {
            modalRef.componentInstance.workplace = workplace;
        }
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
