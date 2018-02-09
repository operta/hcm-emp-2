import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";
import {EmEmployeesService} from "../../../entities/em-employees/em-employees.service";
import {EventManager} from "@angular/platform-browser";
import {Subscription} from "rxjs/Subscription";
import {JhiEventManager} from "ng-jhipster";

@Component({
  selector: 'jhi-emp-personal-info',
  templateUrl: './emp-personal-info.component.html',
  styles: []
})
export class EmpPersonalInfoComponent implements OnInit, OnDestroy {
    @Input() employee;
    @Input() isEditable;
    eventSubscriber: Subscription;

    constructor(private employeeService: EmEmployeesService,
                private eventManager: JhiEventManager) { }

    ngOnInit() {
      this.registerChangeInPersonalInformation()
    }

    registerChangeInPersonalInformation() {
        this.eventSubscriber = this.eventManager.subscribe('EmployeeListModification', (response) =>   {
            this.employeeService.find(this.employee.id).subscribe(item => this.employee = item)
        });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }


}

