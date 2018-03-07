import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmEmpRewards } from './em-emp-rewards.model';
import { EmEmpRewardsService } from './em-emp-rewards.service';
import {EmEmployeesService} from "../em-employees/em-employees.service";
import {EmEmployees} from "../em-employees/em-employees.model";

@Injectable()
export class EmEmpRewardsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private emEmpRewardsService: EmEmpRewardsService,
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
                this.emEmpRewardsService.find(id).subscribe((emEmpRewards) => {
                    if (emEmpRewards.dateReward) {
                        emEmpRewards.dateReward = {
                            year: emEmpRewards.dateReward.getFullYear(),
                            month: emEmpRewards.dateReward.getMonth() + 1,
                            day: emEmpRewards.dateReward.getDate()
                        };
                    }
                    emEmpRewards.createdAt = this.datePipe
                        .transform(emEmpRewards.createdAt, 'yyyy-MM-ddTHH:mm:ss');
                    emEmpRewards.updatedAt = this.datePipe
                        .transform(emEmpRewards.updatedAt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.emEmpRewardsModalRef(component, emEmpRewards);
                    resolve(this.ngbModalRef);
                });
            } else if (employeeId) {
                this.employeeService.find(employeeId).subscribe(
                    (employee) => {
                        this.emEmpRewardsModalRef(component, new EmEmpRewards(), employee);
                        resolve(this.ngbModalRef);
                    }
                );
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.emEmpRewardsModalRef(component, new EmEmpRewards());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    emEmpRewardsModalRef(component: Component, emEmpRewards: EmEmpRewards, employee?: EmEmployees): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.emEmpRewards = emEmpRewards;
        if (employee) {
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
