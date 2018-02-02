/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpAccomplishmentsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-accomplishments/em-emp-accomplishments-delete-dialog.component';
import { EmEmpAccomplishmentsService } from '../../../../../../main/webapp/app/entities/em-emp-accomplishments/em-emp-accomplishments.service';

describe('Component Tests', () => {

    describe('EmEmpAccomplishments Management Delete Component', () => {
        let comp: EmEmpAccomplishmentsDeleteDialogComponent;
        let fixture: ComponentFixture<EmEmpAccomplishmentsDeleteDialogComponent>;
        let service: EmEmpAccomplishmentsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpAccomplishmentsDeleteDialogComponent],
                providers: [
                    EmEmpAccomplishmentsService
                ]
            })
            .overrideTemplate(EmEmpAccomplishmentsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpAccomplishmentsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpAccomplishmentsService);
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
