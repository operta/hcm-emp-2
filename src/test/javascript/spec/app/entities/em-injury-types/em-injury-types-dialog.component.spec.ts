/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmInjuryTypesDialogComponent } from '../../../../../../main/webapp/app/entities/em-injury-types/em-injury-types-dialog.component';
import { EmInjuryTypesService } from '../../../../../../main/webapp/app/entities/em-injury-types/em-injury-types.service';
import { EmInjuryTypes } from '../../../../../../main/webapp/app/entities/em-injury-types/em-injury-types.model';

describe('Component Tests', () => {

    describe('EmInjuryTypes Management Dialog Component', () => {
        let comp: EmInjuryTypesDialogComponent;
        let fixture: ComponentFixture<EmInjuryTypesDialogComponent>;
        let service: EmInjuryTypesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmInjuryTypesDialogComponent],
                providers: [
                    EmInjuryTypesService
                ]
            })
            .overrideTemplate(EmInjuryTypesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmInjuryTypesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmInjuryTypesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmInjuryTypes(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.emInjuryTypes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emInjuryTypesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmInjuryTypes();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.emInjuryTypes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emInjuryTypesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
