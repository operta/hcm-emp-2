import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ResponseWrapper} from "../../../shared/model/response-wrapper.model";
import {DmDocumentTypesService} from "../../../entities/dm-document-types/dm-document-types.service";
import {JhiAlertService, JhiDataUtils, JhiEventManager} from "ng-jhipster";
import {DmDocumentTypes} from "../../../entities/dm-document-types/dm-document-types.model";
import {EmEmpDocumentsService} from "../../../entities/em-emp-documents/em-emp-documents.service";
import {EmEmpDocuments} from "../../../entities/em-emp-documents/em-emp-documents.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'jhi-emp-documents',
  templateUrl: './emp-documents.component.html',
  styleUrls: ['./emp-documents.component.css']
})
export class EmpDocumentsComponent implements OnInit, OnDestroy {
    @Input() employee;
    @Input() isEditable;
    documentTypes: DmDocumentTypes[];
    empDocuments: EmEmpDocuments[];
    hiringDocuments: EmEmpDocuments[];
    taskListDocuments: EmEmpDocuments[];
    otherDocuments: EmEmpDocuments[];
    eventSubscriber: Subscription;
    file: Blob;
    fileURL: string;

    constructor(private documentTypesService: DmDocumentTypesService,
                private empDocumentsService: EmEmpDocumentsService,
                private jhiAlertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private dataUtils: JhiDataUtils) { }

    ngOnInit() {
        this.loadTypes();
        this.loadDocuments();
        this.registerChangeInAddress()
    }


    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }


    registerChangeInAddress() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpDocumentsListModification', (response) =>   {
            this.loadDocuments();
         });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }


    loadTypes() {
        this.documentTypesService.query().subscribe(
            (res: ResponseWrapper) => this.onSuccessTypes(res.json),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadDocuments() {
        this.empDocumentsService.findByIdEmployee(this.employee.id).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }


    filterEmpDocuments() {
        this.hiringDocuments = this.empDocuments.filter((item) => item.idDocumentType.id == 26051);
        this.taskListDocuments = this.empDocuments.filter((item) => item.idDocumentType.id == 26052);
        this.otherDocuments = this.empDocuments.filter((item) => item.idDocumentType.id == 26053);
    }

    private onSuccess(data){
        this.empDocuments = data;
        this.filterEmpDocuments();
    }
    private onSuccessTypes(data) {
        this.documentTypes = data;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
