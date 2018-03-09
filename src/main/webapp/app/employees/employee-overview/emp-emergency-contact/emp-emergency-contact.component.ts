import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EmEmployees} from "../../../entities/em-employees/em-employees.model";
import {EmEmpEmgContactsService} from "../../../entities/em-emp-emg-contacts/em-emp-emg-contacts.service";
import {EmEmpEmgContacts} from "../../../entities/em-emp-emg-contacts/em-emp-emg-contacts.model";
import {ResponseWrapper} from "../../../shared/model/response-wrapper.model";
import {Subscription} from "rxjs/Subscription";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";

@Component({
  selector: 'jhi-emp-emergency-contact',
  templateUrl: './emp-emergency-contact.component.html',
  styles: []
})
export class EmpEmergencyContactComponent implements OnInit, OnDestroy {
    @Input() employee: EmEmployees;
    @Input() isEditable: boolean;
    contact: EmEmpEmgContacts;
    eventSubscriber: Subscription;

    constructor(private contactService: EmEmpEmgContactsService,
                private eventManager: JhiEventManager,
                private jhiAlertService: JhiAlertService) { }

    ngOnInit() {
        this.loadContacts();
        this.registerContactChange();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber)
    }

    loadContacts() {
        this.contactService.findByEmployee(this.employee.id).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json),
            (res:ResponseWrapper) => this.onError(res.json)
        );
    }

    private onSuccess(data) {
        this.contact = data[0];
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    registerContactChange() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpEmgContactsListModification', () => this.loadContacts());
    }

}
