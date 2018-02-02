import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmEmpNotes } from './em-emp-notes.model';
import { EmEmpNotesService } from './em-emp-notes.service';

@Injectable()
export class EmEmpNotesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emEmpNotesService: EmEmpNotesService

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
                this.emEmpNotesService.find(id).subscribe((emEmpNotes) => {
                    emEmpNotes.createdAt = this.datePipe
                        .transform(emEmpNotes.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    emEmpNotes.updatedAt = this.datePipe
                        .transform(emEmpNotes.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.emEmpNotesModalRef(component, emEmpNotes);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.emEmpNotesModalRef(component, new EmEmpNotes());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    emEmpNotesModalRef(component: Component, emEmpNotes: EmEmpNotes): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.emEmpNotes = emEmpNotes;
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
