/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { DmDocumentLinksDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/dm-document-links/dm-document-links-delete-dialog.component';
import { DmDocumentLinksService } from '../../../../../../main/webapp/app/entities/dm-document-links/dm-document-links.service';

describe('Component Tests', () => {

    describe('DmDocumentLinks Management Delete Component', () => {
        let comp: DmDocumentLinksDeleteDialogComponent;
        let fixture: ComponentFixture<DmDocumentLinksDeleteDialogComponent>;
        let service: DmDocumentLinksService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [DmDocumentLinksDeleteDialogComponent],
                providers: [
                    DmDocumentLinksService
                ]
            })
            .overrideTemplate(DmDocumentLinksDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DmDocumentLinksDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DmDocumentLinksService);
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
