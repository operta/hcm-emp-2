/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpNotesDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-notes/em-emp-notes-dialog.component';
import { EmEmpNotesService } from '../../../../../../main/webapp/app/entities/em-emp-notes/em-emp-notes.service';
import { EmEmpNotes } from '../../../../../../main/webapp/app/entities/em-emp-notes/em-emp-notes.model';
import { EmEmployeesService } from '../../../../../../main/webapp/app/entities/em-employees';

describe('Component Tests', () => {

    describe('EmEmpNotes Management Dialog Component', () => {
        let comp: EmEmpNotesDialogComponent;
        let fixture: ComponentFixture<EmEmpNotesDialogComponent>;
        let service: EmEmpNotesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpNotesDialogComponent],
                providers: [
                    EmEmployeesService,
                    EmEmpNotesService
                ]
            })
            .overrideTemplate(EmEmpNotesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpNotesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpNotesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpNotes(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.emEmpNotes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpNotesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpNotes();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.emEmpNotes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpNotesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
