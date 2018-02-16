import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmEmpDocuments } from './em-emp-documents.model';
import { EmEmpDocumentsService } from './em-emp-documents.service';
import {EmEmployeesService} from "../em-employees/em-employees.service";
import {EmEmployees} from "../em-employees/em-employees.model";

@Injectable()
export class EmEmpDocumentsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emEmpDocumentsService: EmEmpDocumentsService,
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
                this.emEmpDocumentsService.find(id).subscribe((emEmpDocuments) => {
                    if (emEmpDocuments.dateCreated) {
                        emEmpDocuments.dateCreated = {
                            year: emEmpDocuments.dateCreated.getFullYear(),
                            month: emEmpDocuments.dateCreated.getMonth() + 1,
                            day: emEmpDocuments.dateCreated.getDate()
                        };
                    }
                    if (emEmpDocuments.validFrom) {
                        emEmpDocuments.validFrom = {
                            year: emEmpDocuments.validFrom.getFullYear(),
                            month: emEmpDocuments.validFrom.getMonth() + 1,
                            day: emEmpDocuments.validFrom.getDate()
                        };
                    }
                    if (emEmpDocuments.validTo) {
                        emEmpDocuments.validTo = {
                            year: emEmpDocuments.validTo.getFullYear(),
                            month: emEmpDocuments.validTo.getMonth() + 1,
                            day: emEmpDocuments.validTo.getDate()
                        };
                    }
                    emEmpDocuments.createdAt = this.datePipe
                        .transform(emEmpDocuments.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    emEmpDocuments.updatedAt = this.datePipe
                        .transform(emEmpDocuments.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.emEmpDocumentsModalRef(component, emEmpDocuments);
                    resolve(this.ngbModalRef);
                });
            } else {
                this.employeeService.find(employeeId).subscribe((employee) => {
                    this.ngbModalRef = this.emEmpDocumentsModalRef(component, new EmEmpDocuments(), employee);
                    resolve(this.ngbModalRef);
                })

            }
        });
    }

    emEmpDocumentsModalRef(component: Component, emEmpDocuments: EmEmpDocuments, employee?: EmEmployees): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.emEmpDocuments = emEmpDocuments;
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
