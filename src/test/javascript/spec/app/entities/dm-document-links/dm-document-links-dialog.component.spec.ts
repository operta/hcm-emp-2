/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { DmDocumentLinksDialogComponent } from '../../../../../../main/webapp/app/entities/dm-document-links/dm-document-links-dialog.component';
import { DmDocumentLinksService } from '../../../../../../main/webapp/app/entities/dm-document-links/dm-document-links.service';
import { DmDocumentLinks } from '../../../../../../main/webapp/app/entities/dm-document-links/dm-document-links.model';

describe('Component Tests', () => {

    describe('DmDocumentLinks Management Dialog Component', () => {
        let comp: DmDocumentLinksDialogComponent;
        let fixture: ComponentFixture<DmDocumentLinksDialogComponent>;
        let service: DmDocumentLinksService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [DmDocumentLinksDialogComponent],
                providers: [
                    DmDocumentLinksService
                ]
            })
            .overrideTemplate(DmDocumentLinksDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DmDocumentLinksDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DmDocumentLinksService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DmDocumentLinks(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.dmDocumentLinks = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'dmDocumentLinksListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DmDocumentLinks();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.dmDocumentLinks = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'dmDocumentLinksListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
