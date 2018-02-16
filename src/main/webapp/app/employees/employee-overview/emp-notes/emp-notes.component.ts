import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EmEmpNotesService} from "../../../entities/em-emp-notes/em-emp-notes.service";
import {EmEmpNotes} from "../../../entities/em-emp-notes/em-emp-notes.model";
import {Subscription} from "rxjs/Subscription";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {ResponseWrapper} from "../../../shared/model/response-wrapper.model";

@Component({
  selector: 'jhi-emp-notes',
  templateUrl: './emp-notes.component.html',
  styles: []
})
export class EmpNotesComponent implements OnInit, OnDestroy {
    @Input() employee;
    @Input() isEditable;
    notes: EmEmpNotes[];
    eventSubscriber: Subscription;

  constructor(private notesService: EmEmpNotesService,
              private eventManager: JhiEventManager,
              private jhiAlertService: JhiAlertService) { }

    ngOnInit() {
        this.loadAll();
        this.registerChangeInAddress()
    }

    registerChangeInAddress() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpNotesListModification', (response) =>  this.loadAll());
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    loadAll() {
        this.notesService.findByIdEmployee(this.employee.id).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );

    }

    private onSuccess(data, headers) {
        this.notes = data;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }


}
