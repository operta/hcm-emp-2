/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpBorrowingsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-borrowings/em-emp-borrowings-delete-dialog.component';
import { EmEmpBorrowingsService } from '../../../../../../main/webapp/app/entities/em-emp-borrowings/em-emp-borrowings.service';

describe('Component Tests', () => {

    describe('EmEmpBorrowings Management Delete Component', () => {
        let comp: EmEmpBorrowingsDeleteDialogComponent;
        let fixture: ComponentFixture<EmEmpBorrowingsDeleteDialogComponent>;
        let service: EmEmpBorrowingsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpBorrowingsDeleteDialogComponent],
                providers: [
                    EmEmpBorrowingsService
                ]
            })
            .overrideTemplate(EmEmpBorrowingsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpBorrowingsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpBorrowingsService);
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
