/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { RgIdentificationTypesDialogComponent } from '../../../../../../main/webapp/app/entities/rg-identification-types/rg-identification-types-dialog.component';
import { RgIdentificationTypesService } from '../../../../../../main/webapp/app/entities/rg-identification-types/rg-identification-types.service';
import { RgIdentificationTypes } from '../../../../../../main/webapp/app/entities/rg-identification-types/rg-identification-types.model';

describe('Component Tests', () => {

    describe('RgIdentificationTypes Management Dialog Component', () => {
        let comp: RgIdentificationTypesDialogComponent;
        let fixture: ComponentFixture<RgIdentificationTypesDialogComponent>;
        let service: RgIdentificationTypesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgIdentificationTypesDialogComponent],
                providers: [
                    RgIdentificationTypesService
                ]
            })
            .overrideTemplate(RgIdentificationTypesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgIdentificationTypesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgIdentificationTypesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RgIdentificationTypes(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.rgIdentificationTypes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'rgIdentificationTypesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RgIdentificationTypes();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.rgIdentificationTypes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'rgIdentificationTypesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
