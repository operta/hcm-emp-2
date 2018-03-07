import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmEmpSkills } from './em-emp-skills.model';
import { EmEmpSkillsService } from './em-emp-skills.service';
import {EmEmployeesService} from "../em-employees/em-employees.service";
import {EmEmployees} from "../em-employees/em-employees.model";

@Injectable()
export class EmEmpSkillsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emEmpSkillsService: EmEmpSkillsService,
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
                this.emEmpSkillsService.find(id).subscribe((emEmpSkills) => {
                    if (emEmpSkills.dateSkill) {
                        emEmpSkills.dateSkill = {
                            year: emEmpSkills.dateSkill.getFullYear(),
                            month: emEmpSkills.dateSkill.getMonth() + 1,
                            day: emEmpSkills.dateSkill.getDate()
                        };
                    }
                    emEmpSkills.createdAt = this.datePipe
                        .transform(emEmpSkills.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    emEmpSkills.updatedAt = this.datePipe
                        .transform(emEmpSkills.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.emEmpSkillsModalRef(component, emEmpSkills);
                    resolve(this.ngbModalRef);
                });
            } else if (employeeId) {
                this.employeeService.find(employeeId).subscribe(
                    (employee) => {
                        this.ngbModalRef = this.emEmpSkillsModalRef(component, new EmEmpSkills(), employee);
                        resolve(this.ngbModalRef);
                    }
                );
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.emEmpSkillsModalRef(component, new EmEmpSkills());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    emEmpSkillsModalRef(component: Component, emEmpSkills: EmEmpSkills, employee?: EmEmployees): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.emEmpSkills = emEmpSkills;
        if(employee) {
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
