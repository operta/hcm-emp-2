import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {EmEmpAccomplishmentsService} from "../../../entities/em-emp-accomplishments/em-emp-accomplishments.service";
import {Subscription} from "rxjs/Subscription";
import {ResponseWrapper} from "../../../shared/model/response-wrapper.model";
import {EmEmpAccomplishments} from "../../../entities/em-emp-accomplishments/em-emp-accomplishments.model";
import {AtAccomplishmentTypes} from "../../../entities/at-accomplishment-types/at-accomplishment-types.model";
import {Router} from "@angular/router";

@Component({
    selector: 'jhi-emp-accomplishments',
    templateUrl: './emp-accomplishments.component.html',
    styles: []
})
export class EmpAccomplishmentsComponent implements OnInit,OnDestroy {
    @Input() employeeId;
    @Input() isEditable;
    emEmpAccomplishments: EmEmpAccomplishments[];
    certifications: EmEmpAccomplishments[];
    courses: EmEmpAccomplishments[];
    honors: EmEmpAccomplishments[];
    languages: EmEmpAccomplishments[];
    projects: EmEmpAccomplishments[];
    publications: EmEmpAccomplishments[];
    eventSubscriber: Subscription;
    accomplishmentId: number;

    constructor(
        private emEmpAccomplishmentsService: EmEmpAccomplishmentsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private router: Router
    ) { }

    loadAll() {
        this.emEmpAccomplishmentsService.queryByEmployee(this.employeeId).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }


    ngOnInit() {
        this.loadAll();
        this.registerChangeInEmEmpAccomplishments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmEmpAccomplishments() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpAccomplishmentsListModification', (response) => this.loadAll());
    }

    checkIsPresent(ongoingString): boolean {
        if (ongoingString == "T") {
            return true;
        }
        return false;
    }


    filterAccomplishmentsByType() {
        this.certifications = this.emEmpAccomplishments.filter((item) => item.idAccomplishmentType.id == 1);
        this.courses = this.emEmpAccomplishments.filter((item) => item.idAccomplishmentType.id == 2);
        this.honors = this.emEmpAccomplishments.filter((item) => item.idAccomplishmentType.id == 3);
        this.languages = this.emEmpAccomplishments.filter((item) => item.idAccomplishmentType.id == 4);
        this.projects = this.emEmpAccomplishments.filter((item) => item.idAccomplishmentType.id == 5);
        this.publications = this.emEmpAccomplishments.filter((item) => item.idAccomplishmentType.id == 6);
    }

    private onSuccess(data) {
        this.emEmpAccomplishments = data;
        this.filterAccomplishmentsByType();
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    newAccomplishmentType(accomplishmentType: AtAccomplishmentTypes) {
        this.accomplishmentId = accomplishmentType.id;
        return accomplishmentType.name;
    }

    navigateEdit(id: number) {
        this.router.navigate(['/', { outlets: { popup: 'em-emp-accomplishments/'+ id + '/edit'} }]);
    }

    navigateAdd() {
        this.router.navigate(['/', { outlets: { popup: ['em-emp-accomplishments-new'] } }]);
    }

    getBar(grade) {
        if(!grade) {
            return 'css-bar-0';
        }
        if(grade === 0) {
            return 'css-bar-0';
        }  else if (grade <= 5) {
            return 'css-bar-5';
        } else if (grade <= 10) {
            return 'css-bar-10';
        } else if (grade <= 15) {
            return 'css-bar-15';
        } else if (grade <= 20) {
            return 'css-bar-20';
        } else if (grade <= 25) {
            return 'css-bar-25';
        } else if (grade <= 30) {
            return 'css-bar-30';
        } else if (grade <= 35) {
            return 'css-bar-35';
        } else if (grade <= 40) {
            return 'css-bar-40';
        } else if (grade <= 45) {
            return 'css-bar-45';
        } else if (grade <= 50) {
            return 'css-bar-50';
        } else if (grade <= 55) {
            return 'css-bar-55';
        } else if (grade <= 60) {
            return 'css-bar-65';
        } else if (grade <= 65) {
            return 'css-bar-65';
        } else if (grade <= 70) {
            return 'css-bar-70';
        } else if (grade <= 75) {
            return 'css-bar-75';
        } else if (grade <= 80) {
            return 'css-bar-80';
        } else if (grade <= 85) {
            return 'css-bar-85';
        } else if (grade <= 90) {
            return 'css-bar-90';
        } else if (grade <= 95) {
            return 'css-bar-95';
        } else if (grade === 100) {
            return 'css-bar-100';
        } else {
            return 'css-bar-0';
        }
    }
}
