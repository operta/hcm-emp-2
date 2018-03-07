/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmBorrowingTypesDialogComponent } from '../../../../../../main/webapp/app/entities/em-borrowing-types/em-borrowing-types-dialog.component';
import { EmBorrowingTypesService } from '../../../../../../main/webapp/app/entities/em-borrowing-types/em-borrowing-types.service';
import { EmBorrowingTypes } from '../../../../../../main/webapp/app/entities/em-borrowing-types/em-borrowing-types.model';

describe('Component Tests', () => {

    describe('EmBorrowingTypes Management Dialog Component', () => {
        let comp: EmBorrowingTypesDialogComponent;
        let fixture: ComponentFixture<EmBorrowingTypesDialogComponent>;
        let service: EmBorrowingTypesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmBorrowingTypesDialogComponent],
                providers: [
                    EmBorrowingTypesService
                ]
            })
            .overrideTemplate(EmBorrowingTypesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmBorrowingTypesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmBorrowingTypesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmBorrowingTypes(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.emBorrowingTypes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emBorrowingTypesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmBorrowingTypes();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.emBorrowingTypes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emBorrowingTypesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
