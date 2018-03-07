import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EmEmpFamilies} from "../../../entities/em-emp-families/em-emp-families.model";
import {Subscription} from "rxjs/Subscription";
import {EmEmpFamiliesService} from "../../../entities/em-emp-families/em-emp-families.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {ResponseWrapper} from "../../../shared/model/response-wrapper.model";

@Component({
  selector: 'jhi-emp-families',
  templateUrl: './emp-families.component.html',
  styles: []
})
export class EmpFamiliesComponent implements OnInit, OnDestroy {
    @Input() employee;
    @Input() isEditable;

    families: EmEmpFamilies[];
    eventSubscription: Subscription;

    constructor(private familiesService: EmEmpFamiliesService,
                private eventManager: JhiEventManager,
                private alertService: JhiAlertService) { }

    ngOnInit() {
        this.loadFamilies();
        this.registerChange();
    }

    registerChange() {
        this.eventSubscription = this.eventManager.subscribe('emEmpFamiliesListModification', (response) => this.loadFamilies());
    }

    loadFamilies() {
        this.familiesService.findByEmployeeId(this.employee.id).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    private onSuccess(data) {
        this.families = data;
    }

    private onError(error) {
        this.alertService.error(error, null, null);
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscription);
    }

}
