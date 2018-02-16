import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmEmpNotes } from './em-emp-notes.model';
import { EmEmpNotesService } from './em-emp-notes.service';
import {EmEmployeesService} from "../em-employees/em-employees.service";
import {EmEmployees} from "../em-employees/em-employees.model";

@Injectable()
export class EmEmpNotesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emEmpNotesService: EmEmpNotesService,
        private employeeService: EmEmployeesService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, employeeId?: number | any): Promise<NgbModalRef> {
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
                this.employeeService.find(employeeId).subscribe((employee) => {
                    this.ngbModalRef = this.emEmpNotesModalRef(component, new EmEmpNotes(), employee);
                    resolve(this.ngbModalRef);
                });
            }
        });
    }

    emEmpNotesModalRef(component: Component, emEmpNotes: EmEmpNotes, employee?: EmEmployees): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.emEmpNotes = emEmpNotes;
        if(employee){
            modalRef.componentInstance.employee = employee;
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
