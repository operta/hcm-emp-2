/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmContractTypesDialogComponent } from '../../../../../../main/webapp/app/entities/em-contract-types/em-contract-types-dialog.component';
import { EmContractTypesService } from '../../../../../../main/webapp/app/entities/em-contract-types/em-contract-types.service';
import { EmContractTypes } from '../../../../../../main/webapp/app/entities/em-contract-types/em-contract-types.model';

describe('Component Tests', () => {

    describe('EmContractTypes Management Dialog Component', () => {
        let comp: EmContractTypesDialogComponent;
        let fixture: ComponentFixture<EmContractTypesDialogComponent>;
        let service: EmContractTypesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmContractTypesDialogComponent],
                providers: [
                    EmContractTypesService
                ]
            })
            .overrideTemplate(EmContractTypesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmContractTypesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmContractTypesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmContractTypes(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.emContractTypes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emContractTypesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmContractTypes();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.emContractTypes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emContractTypesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
