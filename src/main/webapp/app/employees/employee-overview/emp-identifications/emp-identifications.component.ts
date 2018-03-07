import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EmEmpIdentificationsService} from "../../../entities/em-emp-identifications/em-emp-identifications.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {ResponseWrapper} from "../../../shared/model/response-wrapper.model";
import {EmEmpIdentifications} from "../../../entities/em-emp-identifications/em-emp-identifications.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'jhi-emp-identifications',
  templateUrl: './emp-identifications.component.html',
  styles: []
})
export class EmpIdentificationsComponent implements OnInit, OnDestroy {
    @Input() employee;
    @Input() isEditable;

    identifications: EmEmpIdentifications[];
    eventSubscription: Subscription;

    constructor(private identificationsService: EmEmpIdentificationsService,
                private eventManager: JhiEventManager,
                private alertService: JhiAlertService) { }

    ngOnInit() {
        this.loadIdentifications();
        this.registerChange();
    }

    registerChange() {
        this.eventSubscription = this.eventManager.subscribe('emEmpIdentificationsListModification', (response) => this.loadIdentifications());
    }

    loadIdentifications() {
        this.identificationsService.findByEmployeeId(this.employee.id).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    private onSuccess(data) {
        this.identifications = data;
    }

    private onError(error) {
        this.alertService.error(error, null, null);
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscription);
    }

}
