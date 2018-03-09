/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpEmgContactsDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-emg-contacts/em-emp-emg-contacts-dialog.component';
import { EmEmpEmgContactsService } from '../../../../../../main/webapp/app/entities/em-emp-emg-contacts/em-emp-emg-contacts.service';
import { EmEmpEmgContacts } from '../../../../../../main/webapp/app/entities/em-emp-emg-contacts/em-emp-emg-contacts.model';
import { EmEmployeesService } from '../../../../../../main/webapp/app/entities/em-employees';
import { RgContactTypesService } from '../../../../../../main/webapp/app/entities/rg-contact-types';

describe('Component Tests', () => {

    describe('EmEmpEmgContacts Management Dialog Component', () => {
        let comp: EmEmpEmgContactsDialogComponent;
        let fixture: ComponentFixture<EmEmpEmgContactsDialogComponent>;
        let service: EmEmpEmgContactsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpEmgContactsDialogComponent],
                providers: [
                    EmEmployeesService,
                    RgContactTypesService,
                    EmEmpEmgContactsService
                ]
            })
            .overrideTemplate(EmEmpEmgContactsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpEmgContactsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpEmgContactsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpEmgContacts(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.emEmpEmgContacts = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpEmgContactsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpEmgContacts();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.emEmpEmgContacts = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpEmgContactsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
