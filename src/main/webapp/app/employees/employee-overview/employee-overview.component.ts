import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Principal} from "../../shared/auth/principal.service";
import {Subscription} from "rxjs/Subscription";
import {JhiAlertService, JhiDataUtils, JhiEventManager} from "ng-jhipster";
import {EmEmployeesService} from "../../entities/em-employees/em-employees.service";
import {EmEmployees} from "../../entities/em-employees/em-employees.model";
import {EmEmpOrgWorkPlacesService} from "../../entities/em-emp-org-work-places/em-emp-org-work-places.service";
import {EmEmpOrgWorkPlaces} from "../../entities/em-emp-org-work-places/em-emp-org-work-places.model";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs/Observable";
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
    objectUrl: any;
    trustedUrl: any;

    constructor(private principal: Principal,
                private eventManager: JhiEventManager,
                private jhiAlertService: JhiAlertService,
                private employeeService: EmEmployeesService,
                private employeeWorkPlaceService: EmEmpOrgWorkPlacesService,
                private route: ActivatedRoute,
                private dataUtils: JhiDataUtils,
                private sanitizer: DomSanitizer) { }


    ngOnInit() {
        if (this.route.snapshot.params.id) {
            this.isEditable = true;
        }
        else {
            this.isEditable = false;
        }
        this.employee = this.route.snapshot.data['employee'];
        this.generateImage(this.employee);
        this.loadEmployeeWorkPlace();

        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });


        this.registerChangeInEmployeeOverview();
    }

    loadEmployeeWorkPlace() {
        this.employeeWorkPlaceService.findLastWorkPlaceForEmployee(this.employee.id).subscribe(
            (workplace) => {
                if(workplace){
                    this.employeeWorkPlace = workplace;
                }
            }, (error) => ''
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
        this.employeeService.find(this.employee.id).subscribe((item) => {
            this.employee = item;
            this.generateImage(this.employee);
        });
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }


    changeTabState(newState) {
        this.tabState = newState;
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
        setTimeout(() => { this.save()}, 1000);
    }

    save() {
        this.subscribeToSaveResponse(this.employeeService.updatePersonalInfo(this.employee));
    }

    private subscribeToSaveResponse(result: Observable<EmEmployees>) {
        result
            .subscribe(
                (res: EmEmployees) => {
                    this.onSaveSuccess(res);
                },
                (res: Response) => this.onSaveError()
            );
    }

    private onSaveSuccess(result) {
       this.employee = result;
        this.eventManager.broadcast({ name: 'profileImageChange', content: 'OK'});
        this.generateImage(this.employee);
    }

    private onSaveError() {
    }

    dataURItoBlob(dataURI) {
        const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const binary = atob(dataURI.split(',')[1]);
        const array = [];
        for (let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: mime});
    }

    generateImage(employee:any){
        const binaryData = [];
        binaryData.push(employee.imageBlob);
        this.objectUrl =  URL.createObjectURL(new Blob(binaryData, {type: employee.imageBlobContentType}));
        const dataUrl = 'data:' + employee.imageBlobContentType + ';base64,' + employee.imageBlob;
        this.objectUrl = URL.createObjectURL(this.dataURItoBlob(dataUrl));
        this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.objectUrl);
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
