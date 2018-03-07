/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpBorrowingsDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-borrowings/em-emp-borrowings-dialog.component';
import { EmEmpBorrowingsService } from '../../../../../../main/webapp/app/entities/em-emp-borrowings/em-emp-borrowings.service';
import { EmEmpBorrowings } from '../../../../../../main/webapp/app/entities/em-emp-borrowings/em-emp-borrowings.model';
import { EmEmployeesService } from '../../../../../../main/webapp/app/entities/em-employees';
import { EmBorrowingTypesService } from '../../../../../../main/webapp/app/entities/em-borrowing-types';

describe('Component Tests', () => {

    describe('EmEmpBorrowings Management Dialog Component', () => {
        let comp: EmEmpBorrowingsDialogComponent;
        let fixture: ComponentFixture<EmEmpBorrowingsDialogComponent>;
        let service: EmEmpBorrowingsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpBorrowingsDialogComponent],
                providers: [
                    EmEmployeesService,
                    EmBorrowingTypesService,
                    EmEmpBorrowingsService
                ]
            })
            .overrideTemplate(EmEmpBorrowingsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpBorrowingsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpBorrowingsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpBorrowings(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.emEmpBorrowings = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpBorrowingsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpBorrowings();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.emEmpBorrowings = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpBorrowingsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
