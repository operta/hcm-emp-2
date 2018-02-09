import {Component, Input, OnInit} from '@angular/core';
import {ResponseWrapper} from "../../../shared/model/response-wrapper.model";
import {DmDocumentTypesService} from "../../../entities/dm-document-types/dm-document-types.service";
import {JhiAlertService, JhiDataUtils, JhiEventManager} from "ng-jhipster";
import {DmDocumentTypes} from "../../../entities/dm-document-types/dm-document-types.model";
import {EmEmpDocumentsService} from "../../../entities/em-emp-documents/em-emp-documents.service";
import {EmEmpDocuments} from "../../../entities/em-emp-documents/em-emp-documents.model";
import {Subscription} from "rxjs/Subscription";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'jhi-emp-documents',
  templateUrl: './emp-documents.component.html',
  styleUrls: ['./emp-documents.component.css']
})
export class EmpDocumentsComponent implements OnInit {
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
        this.loadAll();
        this.registerChangeInAddress()
    }


    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }


    registerChangeInAddress() {
        this.eventSubscriber = this.eventManager.subscribe('emEmpDocumentsListModification', (response) =>   {
            this.empDocumentsService.findByIdEmployee(this.employee.id).subscribe(
                (items) => {
                    this.empDocuments = items;
                    console.log(this.empDocuments);
                    this.filterEmpDocuments();
            });
         });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }


    loadAll() {
        this.documentTypesService.query().subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );

        this.empDocumentsService.findByIdEmployee(this.employee.id).subscribe(
            (items) => {
                this.empDocuments = items;
                console.log(this.empDocuments);
                this.filterEmpDocuments();
            }
        );
    }


    filterEmpDocuments() {
        this.hiringDocuments = this.empDocuments.filter((item) => item.idDocumentType.id == 26051);
        console.log(this.hiringDocuments);
        this.taskListDocuments = this.empDocuments.filter((item) => item.idDocumentType.id == 26052);
        console.log(this.taskListDocuments);
        this.otherDocuments = this.empDocuments.filter((item) => item.idDocumentType.id == 26053);
        console.log(this.otherDocuments);

    }


    private onSuccess(data, headers) {

        this.documentTypes = data;
        console.log(this.documentTypes);
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
