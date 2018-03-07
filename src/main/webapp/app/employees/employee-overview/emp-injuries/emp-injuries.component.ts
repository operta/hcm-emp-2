import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EmEmpInjuries} from "../../../entities/em-emp-injuries/em-emp-injuries.model";
import {Subscription} from "rxjs/Subscription";
import {EmEmpInjuriesService} from "../../../entities/em-emp-injuries/em-emp-injuries.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {ResponseWrapper} from "../../../shared/model/response-wrapper.model";

@Component({
  selector: 'jhi-emp-injuries',
  templateUrl: './emp-injuries.component.html',
  styles: []
})
export class EmpInjuriesComponent implements OnInit, OnDestroy {
    @Input() employee;
    @Input() isEditable;

    injuries: EmEmpInjuries[];
    eventSubscription: Subscription;

    constructor(private injuriesService: EmEmpInjuriesService,
                private eventManager: JhiEventManager,
                private alertService: JhiAlertService) { }

    ngOnInit() {
        this.loadInjuries();
        this.registerChange();
    }

    registerChange() {
        this.eventSubscription = this.eventManager.subscribe('emEmpInjuriesListModification', (response) => this.loadInjuries());
    }

    loadInjuries() {
        this.injuriesService.findByEmployeeId(this.employee.id).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    private onSuccess(data) {
        this.injuries = data;
    }

    private onError(error) {
        this.alertService.error(error, null, null);
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscription);
    }
}
