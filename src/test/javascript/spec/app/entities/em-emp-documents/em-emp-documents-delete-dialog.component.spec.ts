/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpDocumentsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-documents/em-emp-documents-delete-dialog.component';
import { EmEmpDocumentsService } from '../../../../../../main/webapp/app/entities/em-emp-documents/em-emp-documents.service';

describe('Component Tests', () => {

    describe('EmEmpDocuments Management Delete Component', () => {
        let comp: EmEmpDocumentsDeleteDialogComponent;
        let fixture: ComponentFixture<EmEmpDocumentsDeleteDialogComponent>;
        let service: EmEmpDocumentsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpDocumentsDeleteDialogComponent],
                providers: [
                    EmEmpDocumentsService
                ]
            })
            .overrideTemplate(EmEmpDocumentsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpDocumentsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpDocumentsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
