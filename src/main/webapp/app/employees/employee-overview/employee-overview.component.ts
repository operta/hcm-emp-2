import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Principal} from "../../shared/auth/principal.service";
import {Subscription} from "rxjs/Subscription";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {EmEmployeesService} from "../../entities/em-employees/em-employees.service";
import {EmEmployees} from "../../entities/em-employees/em-employees.model";
import {EmEmpOrgWorkPlacesService} from "../../entities/em-emp-org-work-places/em-emp-org-work-places.service";
import {EmEmpOrgWorkPlaces} from "../../entities/em-emp-org-work-places/em-emp-org-work-places.model";
import {ActivatedRoute} from "@angular/router";
declare  let $:any;
@Component({
  selector: 'jhi-employee-overview',
  templateUrl: './employee-overview.component.html',
  styles: []
})
export class EmployeeOverviewComponent implements OnInit, AfterViewInit, OnDestroy{
    tabState = 'personal';
    currentAccount: any;
    eventSubscriber1: Subscription;
    eventSubscriber2: Subscription;
    employee: EmEmployees;
    employeeWorkPlace: EmEmpOrgWorkPlaces;
    isEditable = false;

    constructor(private principal: Principal,
                private eventManager: JhiEventManager,
                private jhiAlertService: JhiAlertService,
                private employeeService: EmEmployeesService,
                private employeeWorkPlaceService: EmEmpOrgWorkPlacesService,
                private route: ActivatedRoute) { }


    ngOnInit() {
        if (this.route.snapshot.params.id) {
            this.isEditable = true;
        }
        else {
            this.isEditable = false;
        }
        this.employee = this.route.snapshot.data['employee'];
        this.loadEmployeeWorkPlace();

        this.principal.identity().then((account) => {
            this.currentAccount = account;

            // if(this.currentAccount.id === this.employee.idUser.id) {
            //     this.isEditable = false;
            // }
        });
        this.registerChangeInEmployeeOverview();
    }

    loadEmployeeWorkPlace() {
        this.employeeWorkPlaceService.findLastWorkPlaceForEmployee(this.employee.id).subscribe(
            (workplace) => {
                this.employeeWorkPlace = workplace
            }
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber1);
        this.eventManager.destroy(this.eventSubscriber2);
    }

    registerChangeInEmployeeOverview() {
        this.eventSubscriber1 = this.eventManager.subscribe('emEmployeesListModification', (response) => this.reload());
        this.eventSubscriber2 = this.eventManager.subscribe('emEmpOrgWorkPlacesListModification', (response) => this.loadEmployeeWorkPlace())
    }


    reload(){
        this.employeeService.find(this.employee.id).subscribe((item) => this.employee = item);
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
        $('.dataScrollUniversal').slimScroll({
            height: ''
            , position: 'right'
            , color: '#dcdcdc'
            , });

    }

}
