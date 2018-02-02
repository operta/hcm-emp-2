/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { OgWorkPlaceTypesDialogComponent } from '../../../../../../main/webapp/app/entities/og-work-place-types/og-work-place-types-dialog.component';
import { OgWorkPlaceTypesService } from '../../../../../../main/webapp/app/entities/og-work-place-types/og-work-place-types.service';
import { OgWorkPlaceTypes } from '../../../../../../main/webapp/app/entities/og-work-place-types/og-work-place-types.model';

describe('Component Tests', () => {

    describe('OgWorkPlaceTypes Management Dialog Component', () => {
        let comp: OgWorkPlaceTypesDialogComponent;
        let fixture: ComponentFixture<OgWorkPlaceTypesDialogComponent>;
        let service: OgWorkPlaceTypesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [OgWorkPlaceTypesDialogComponent],
                providers: [
                    OgWorkPlaceTypesService
                ]
            })
            .overrideTemplate(OgWorkPlaceTypesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OgWorkPlaceTypesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OgWorkPlaceTypesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OgWorkPlaceTypes(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.ogWorkPlaceTypes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ogWorkPlaceTypesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OgWorkPlaceTypes();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.ogWorkPlaceTypes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ogWorkPlaceTypesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
