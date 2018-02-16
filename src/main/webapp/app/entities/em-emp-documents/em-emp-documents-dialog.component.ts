import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmEmpDocuments } from './em-emp-documents.model';
import { EmEmpDocumentsPopupService } from './em-emp-documents-popup.service';
import { EmEmpDocumentsService } from './em-emp-documents.service';
import { EmEmployees, EmEmployeesService } from '../em-employees';
import { DmDocumentTypes, DmDocumentTypesService } from '../dm-document-types';
import { DmDocumentLinks, DmDocumentLinksService } from '../dm-document-links';
import { ResponseWrapper } from '../../shared';
import {Subscription} from "rxjs/Subscription";
import {Principal} from "../../shared/auth/principal.service";

@Component({
    selector: 'jhi-em-emp-documents-dialog',
    templateUrl: './em-emp-documents-dialog.component.html'
})
export class EmEmpDocumentsDialogComponent implements OnInit, OnDestroy {

    emEmpDocuments: EmEmpDocuments;
    isSaving: boolean;
    employee: EmEmployees;


    iddocumenttypes: DmDocumentTypes[];

    iddocumentlinks: DmDocumentLinks[];
    dateCreatedDp: any;
    validFromDp: any;
    validToDp: any;
    eventSubscriber: Subscription;
    documentLink: DmDocumentLinks;
    accountId: number;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private emEmpDocumentsService: EmEmpDocumentsService,
        private dmDocumentTypesService: DmDocumentTypesService,
        private dmDocumentLinksService: DmDocumentLinksService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    ngOnInit() {
        this.isSaving = false;

        this.dmDocumentTypesService
            .query({filter: 'emempdocuments-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpDocuments.idDocumentType || !this.emEmpDocuments.idDocumentType.id) {
                    this.iddocumenttypes = res.json;
                } else {
                    this.dmDocumentTypesService
                        .find(this.emEmpDocuments.idDocumentType.id)
                        .subscribe((subRes: DmDocumentTypes) => {
                            this.iddocumenttypes = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.dmDocumentLinksService
            .query({filter: 'emempdocuments-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.emEmpDocuments.idDocumentLink || !this.emEmpDocuments.idDocumentLink.id) {
                    this.iddocumentlinks = res.json;
                } else {
                    this.dmDocumentLinksService
                        .find(this.emEmpDocuments.idDocumentLink.id)
                        .subscribe((subRes: DmDocumentLinks) => {
                            this.iddocumentlinks = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.registerChangeInAddress();
        this.principal.identity().then(
            (account) => this.accountId = account.id
        );
    }




    registerChangeInAddress() {
        this.eventSubscriber = this.eventManager.subscribe('dmDocumentLinksListModification', (response) =>   {
            this.documentLink = response.content;
        });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }


    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.emEmpDocuments.idDocumentLink = this.documentLink;
        console.log(this.emEmpDocuments);
        if (this.emEmpDocuments.id !== undefined) {
            this.subscribeToSaveResponse(
                this.emEmpDocumentsService.update(this.emEmpDocuments));
        } else {
            this.emEmpDocuments.idEmployee = this.employee;
            this.subscribeToSaveResponse(
                this.emEmpDocumentsService.create(this.emEmpDocuments));
        }
    }

    private subscribeToSaveResponse(result: Observable<EmEmpDocuments>) {
        result.subscribe((res: EmEmpDocuments) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EmEmpDocuments) {
        this.eventManager.broadcast({ name: 'emEmpDocumentsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEmEmployeesById(index: number, item: EmEmployees) {
        return item.id;
    }

    trackDmDocumentTypesById(index: number, item: DmDocumentTypes) {
        return item.id;
    }

    trackDmDocumentLinksById(index: number, item: DmDocumentLinks) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-em-emp-documents-popup',
    template: ''
})
export class EmEmpDocumentsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private emEmpDocumentsPopupService: EmEmpDocumentsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.emEmpDocumentsPopupService
                    .open(EmEmpDocumentsDialogComponent as Component, params['id']);
            } else {
                this.emEmpDocumentsPopupService
                    .open(EmEmpDocumentsDialogComponent as Component, null, params['employeeId']);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
