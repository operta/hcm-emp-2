import {Component, Input, OnInit} from '@angular/core';
import {ResponseWrapper} from "../../../shared/model/response-wrapper.model";
import {EmEmpSchoolsService} from "../../../entities/em-emp-schools/em-emp-schools.service";
import {EmEmpSchools} from "../../../entities/em-emp-schools/em-emp-schools.model";
import {Subscription} from "rxjs/Subscription";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {Router} from "@angular/router";

@Component({
    selector: 'jhi-emp-education',
    templateUrl: './emp-education.component.html',
    styles: []
})
export class EmpEducationComponent implements OnInit {
    @Input() employeeId;
    emEmpSchools: EmEmpSchools[];
    eventSubscriber: Subscription;
    @Input() isEditable;


    constructor(
        private emEmpSchoolsService: EmEmpSchoolsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private router: Router) { }

    ngOnInit() {
        this.loadAll();
        this.registerChangeInEmEmpSchools();
    }

    loadAll() {
        this.emEmpSchoolsService.query().subscribe(
            (res: ResponseWrapper) => {
                let emEmpSchools: EmEmpSchools[] = res.json;
                this.emEmpSchools = emEmpSchools.filter(x => x.idEmployee.id === this.employeeId);
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    registerChangeInEmEmpSchools() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpSchoolsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    navigateEdit(schoolId: number) {
        this.router.navigate(['/', { outlets: { popup: 'em-emp-schools/'+ schoolId + '/edit'} }]);
    }
    navigateAdd() {
        this.router.navigate(['/', { outlets: { popup: ['em-emp-schools-new'] } }]);
    }

}
