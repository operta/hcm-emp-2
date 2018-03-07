import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {EmEmpBorrowingsService} from "../../../entities/em-emp-borrowings/em-emp-borrowings.service";
import {ResponseWrapper} from "../../../shared/model/response-wrapper.model";
import {EmEmpBorrowings} from "../../../entities/em-emp-borrowings/em-emp-borrowings.model";

@Component({
  selector: 'jhi-emp-borrowings',
  templateUrl: './emp-borrowings.component.html',
  styles: []
})
export class EmpBorrowingsComponent implements OnInit, OnDestroy {
    @Input() employee;
    @Input() isEditable;
    borrowings: EmEmpBorrowings[];
    eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager,
                private borrowingsService: EmEmpBorrowingsService,
                private alertService: JhiAlertService) { }

    ngOnInit() {
        this.loadBorrowings();
        this.registerChange();
    }

    registerChange() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpBorrowingsListModification', (response) => this.loadBorrowings());
    }

    loadBorrowings(){
        this.borrowingsService.findByEmployeeId(this.employee.id).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json),
            (res: ResponseWrapper) => this.onError(res.json)
        )
    }

    private onSuccess(data){
        this.borrowings = data;
    }

    private onError(error){
        this.alertService.error(error, null,null)
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber)
    }


    checkIsDamagedByEmployee(value: string) {
        if (value == 'T') {
            return true;
        }
        return false;
    }

}
