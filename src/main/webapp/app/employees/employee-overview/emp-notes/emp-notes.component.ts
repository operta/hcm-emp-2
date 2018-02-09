import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EmEmpNotesService} from "../../../entities/em-emp-notes/em-emp-notes.service";
import {EmEmpNotes} from "../../../entities/em-emp-notes/em-emp-notes.model";
import {Subscription} from "rxjs/Subscription";
import {JhiEventManager} from "ng-jhipster";

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
              private eventManager: JhiEventManager) { }

  ngOnInit() {
    this.notesService.findByIdEmployee(this.employee.id).subscribe(
        (items) => {
            this.notes = items;
            console.log(this.notes);
        }
    );
      this.registerChangeInAddress()
  }

    registerChangeInAddress() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpNotesListModification', (response) =>   {
            this.notesService.findByIdEmployee(this.employee.id).subscribe(
                (items) => {
                    this.notes = items;
                    console.log(this.notes);
                }
            );
        });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }


}
