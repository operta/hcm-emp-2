/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { OgWorkPlacesDialogComponent } from '../../../../../../main/webapp/app/entities/og-work-places/og-work-places-dialog.component';
import { OgWorkPlacesService } from '../../../../../../main/webapp/app/entities/og-work-places/og-work-places.service';
import { OgWorkPlaces } from '../../../../../../main/webapp/app/entities/og-work-places/og-work-places.model';
import { OgWorkPlaceTypesService } from '../../../../../../main/webapp/app/entities/og-work-place-types';

describe('Component Tests', () => {

    describe('OgWorkPlaces Management Dialog Component', () => {
        let comp: OgWorkPlacesDialogComponent;
        let fixture: ComponentFixture<OgWorkPlacesDialogComponent>;
        let service: OgWorkPlacesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [OgWorkPlacesDialogComponent],
                providers: [
                    OgWorkPlaceTypesService,
                    OgWorkPlacesService
                ]
            })
            .overrideTemplate(OgWorkPlacesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OgWorkPlacesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OgWorkPlacesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OgWorkPlaces(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.ogWorkPlaces = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ogWorkPlacesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OgWorkPlaces();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.ogWorkPlaces = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ogWorkPlacesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
