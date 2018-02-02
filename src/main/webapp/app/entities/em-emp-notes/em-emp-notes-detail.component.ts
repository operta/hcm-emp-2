import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EmEmpNotes } from './em-emp-notes.model';
import { EmEmpNotesService } from './em-emp-notes.service';

@Component({
    selector: 'jhi-em-emp-notes-detail',
    templateUrl: './em-emp-notes-detail.component.html'
})
export class EmEmpNotesDetailComponent implements OnInit, OnDestroy {

    emEmpNotes: EmEmpNotes;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private emEmpNotesService: EmEmpNotesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmEmpNotes();
    }

    load(id) {
        this.emEmpNotesService.find(id).subscribe((emEmpNotes) => {
            this.emEmpNotes = emEmpNotes;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmEmpNotes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'emEmpNotesListModification',
            (response) => this.load(this.emEmpNotes.id)
        );
    }
}
