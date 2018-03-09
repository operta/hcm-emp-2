import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {EmEmployeesService} from "../../../entities/em-employees/em-employees.service";
import {JhiEventManager} from "ng-jhipster";

@Component({
  selector: 'jhi-emp-ssn-and-tax-no',
  templateUrl: './emp-ssn-and-tax-no.component.html',
  styles: []
})
export class EmpSsnAndTaxNoComponent implements OnInit, OnDestroy {
    @Input() employee;
    @Input() isEditable;
    eventSubscriber: Subscription;

    constructor(private employeeService: EmEmployeesService,
                private eventManager: JhiEventManager) { }

    ngOnInit() {
        this.registerChangeInPersonalInformation()
    }

    registerChangeInPersonalInformation() {
        this.eventSubscriber = this.eventManager.subscribe('SsnAndTaxNoModification', (response) =>   {
            this.employeeService.find(this.employee.id).subscribe((item) => this.employee = item)
        });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }


}
