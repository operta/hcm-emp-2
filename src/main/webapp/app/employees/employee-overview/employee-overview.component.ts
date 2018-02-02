import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Principal} from "../../shared/auth/principal.service";
import {EventManager} from "@angular/platform-browser";
import {ResponseWrapper} from "../../shared/model/response-wrapper.model";
import {Subscription} from "rxjs/Subscription";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {EmEmployeesService} from "../../entities/em-employees/em-employees.service";
import {EmEmployees} from "../../entities/em-employees/em-employees.model";
declare  let $:any;
@Component({
  selector: 'jhi-employee-overview',
  templateUrl: './employee-overview.component.html',
  styles: []
})
export class EmployeeOverviewComponent implements OnInit, AfterViewInit, OnDestroy {
    tabState = 'personal';
    currentAccount: any;
    eventSubscriber: Subscription;
    employee: EmEmployees;


    constructor(private principal: Principal,
                private eventManager: JhiEventManager,
                private jhiAlertService: JhiAlertService,
                private employeeService: EmEmployeesService) { }

    load() {
        this.employeeService.findByUser(this.currentAccount.id).subscribe(
            (emEmployees) => this.employee = emEmployees
        );
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
            this.load();
        });
        this.registerChangeInEmployeeOverview();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmployeeOverview() {
        this.eventSubscriber = this.eventManager.subscribe('employeeOverviewModification', (response) => this.load());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }


    changeTabState(newState) {
        this.tabState = newState;
    }

    ngAfterViewInit() {
      $('#dataScroll').slimScroll({
          height: ''
          , position: 'right'
          , color: '#dcdcdc'
          , });
      $('#dataScrollExp').slimScroll({
          height: ''
          , position: 'right'
          , color: '#dcdcdc'
          , });
      $('#dataScrollEdu').slimScroll({
          height: ''
          , position: 'right'
          , color: '#dcdcdc'
          , });
      $('#dataScrollTra').slimScroll({
          height: ''
          , position: 'right'
          , color: '#dcdcdc'
          , });
      $('#dataScrollAcc').slimScroll({
          height: ''
          , position: 'right'
          , color: '#dcdcdc'
          , });
      $('#dataScrollDoc').slimScroll({
          height: ''
          , position: 'right'
          , color: '#dcdcdc'
          , });
      $('#dataScrollPer').slimScroll({
          height: ''
          , position: 'right'
          , color: '#dcdcdc'
          , });
      $('#dataScrollNotes').slimScroll({
          height: ''
          , position: 'right'
          , color: '#dcdcdc'
          , });
    }

}
