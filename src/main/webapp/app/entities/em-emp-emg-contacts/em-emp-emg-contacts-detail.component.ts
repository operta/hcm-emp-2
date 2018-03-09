import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpEmgContacts } from './em-emp-emg-contacts.model';
import { EmEmpEmgContactsService } from './em-emp-emg-contacts.service';

@Component({
    selector: 'jhi-em-emp-emg-contacts-detail',
    templateUrl: './em-emp-emg-contacts-detail.component.html'
})
export class EmEmpEmgContactsDetailComponent implements OnInit, OnDestroy {

    emEmpEmgContacts: EmEmpEmgContacts;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emEmpEmgContactsService: EmEmpEmgContactsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmEmpEmgContacts();
    }

    load(id) {
        this.emEmpEmgContactsService.find(id).subscribe((emEmpEmgContacts) => {
            this.emEmpEmgContacts = emEmpEmgContacts;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmEmpEmgContacts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emEmpEmgContactsListModification',
            (response) => this.load(this.emEmpEmgContacts.id)
        );
    }
}
