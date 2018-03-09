/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpEmgContactsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-emg-contacts/em-emp-emg-contacts-delete-dialog.component';
import { EmEmpEmgContactsService } from '../../../../../../main/webapp/app/entities/em-emp-emg-contacts/em-emp-emg-contacts.service';

describe('Component Tests', () => {

    describe('EmEmpEmgContacts Management Delete Component', () => {
        let comp: EmEmpEmgContactsDeleteDialogComponent;
        let fixture: ComponentFixture<EmEmpEmgContactsDeleteDialogComponent>;
        let service: EmEmpEmgContactsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpEmgContactsDeleteDialogComponent],
                providers: [
                    EmEmpEmgContactsService
                ]
            })
            .overrideTemplate(EmEmpEmgContactsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpEmgContactsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpEmgContactsService);
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
