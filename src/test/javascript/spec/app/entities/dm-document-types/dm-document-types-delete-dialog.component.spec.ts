/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { DmDocumentTypesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/dm-document-types/dm-document-types-delete-dialog.component';
import { DmDocumentTypesService } from '../../../../../../main/webapp/app/entities/dm-document-types/dm-document-types.service';

describe('Component Tests', () => {

    describe('DmDocumentTypes Management Delete Component', () => {
        let comp: DmDocumentTypesDeleteDialogComponent;
        let fixture: ComponentFixture<DmDocumentTypesDeleteDialogComponent>;
        let service: DmDocumentTypesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [DmDocumentTypesDeleteDialogComponent],
                providers: [
                    DmDocumentTypesService
                ]
            })
            .overrideTemplate(DmDocumentTypesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DmDocumentTypesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DmDocumentTypesService);
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
