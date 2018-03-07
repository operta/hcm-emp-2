/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmBorrowingTypesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/em-borrowing-types/em-borrowing-types-delete-dialog.component';
import { EmBorrowingTypesService } from '../../../../../../main/webapp/app/entities/em-borrowing-types/em-borrowing-types.service';

describe('Component Tests', () => {

    describe('EmBorrowingTypes Management Delete Component', () => {
        let comp: EmBorrowingTypesDeleteDialogComponent;
        let fixture: ComponentFixture<EmBorrowingTypesDeleteDialogComponent>;
        let service: EmBorrowingTypesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmBorrowingTypesDeleteDialogComponent],
                providers: [
                    EmBorrowingTypesService
                ]
            })
            .overrideTemplate(EmBorrowingTypesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmBorrowingTypesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmBorrowingTypesService);
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
