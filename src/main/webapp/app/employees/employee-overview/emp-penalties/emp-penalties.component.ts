import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EmPenalties} from "../../../entities/em-penalties/em-penalties.model";
import {Subscription} from "rxjs/Subscription";
import {EmPenaltiesService} from "../../../entities/em-penalties/em-penalties.service";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {ResponseWrapper} from "../../../shared/model/response-wrapper.model";

@Component({
  selector: 'jhi-emp-penalties',
  templateUrl: './emp-penalties.component.html',
  styles: []
})
export class EmpPenaltiesComponent implements OnInit, OnDestroy {
    @Input() employee;
    @Input() isEditable;

    penalties: EmPenalties[];
    eventSubscription: Subscription;

    constructor(private penaltiesService: EmPenaltiesService,
                private eventManager: JhiEventManager,
                private alertService: JhiAlertService) { }

    ngOnInit() {
        this.loadPenalties();
        this.registerChange();
    }

    registerChange() {
        this.eventSubscription = this.eventManager.subscribe('emPenaltiesListModification', (response) => this.loadPenalties());
    }

    loadPenalties() {
        this.penaltiesService.findByEmployeeId(this.employee.id).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    private onSuccess(data) {
        this.penalties = data;
    }

    private onError(error) {
        this.alertService.error(error, null, null);
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscription);
    }
}
