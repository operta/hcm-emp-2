/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpDocumentsDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-documents/em-emp-documents-dialog.component';
import { EmEmpDocumentsService } from '../../../../../../main/webapp/app/entities/em-emp-documents/em-emp-documents.service';
import { EmEmpDocuments } from '../../../../../../main/webapp/app/entities/em-emp-documents/em-emp-documents.model';
import { EmEmployeesService } from '../../../../../../main/webapp/app/entities/em-employees';
import { DmDocumentTypesService } from '../../../../../../main/webapp/app/entities/dm-document-types';
import { DmDocumentLinksService } from '../../../../../../main/webapp/app/entities/dm-document-links';

describe('Component Tests', () => {

    describe('EmEmpDocuments Management Dialog Component', () => {
        let comp: EmEmpDocumentsDialogComponent;
        let fixture: ComponentFixture<EmEmpDocumentsDialogComponent>;
        let service: EmEmpDocumentsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpDocumentsDialogComponent],
                providers: [
                    EmEmployeesService,
                    DmDocumentTypesService,
                    DmDocumentLinksService,
                    EmEmpDocumentsService
                ]
            })
            .overrideTemplate(EmEmpDocumentsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpDocumentsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpDocumentsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpDocuments(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.emEmpDocuments = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpDocumentsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpDocuments();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.emEmpDocuments = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpDocumentsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
