/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmStatusesDialogComponent } from '../../../../../../main/webapp/app/entities/em-statuses/em-statuses-dialog.component';
import { EmStatusesService } from '../../../../../../main/webapp/app/entities/em-statuses/em-statuses.service';
import { EmStatuses } from '../../../../../../main/webapp/app/entities/em-statuses/em-statuses.model';

describe('Component Tests', () => {

    describe('EmStatuses Management Dialog Component', () => {
        let comp: EmStatusesDialogComponent;
        let fixture: ComponentFixture<EmStatusesDialogComponent>;
        let service: EmStatusesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmStatusesDialogComponent],
                providers: [
                    EmStatusesService
                ]
            })
            .overrideTemplate(EmStatusesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmStatusesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmStatusesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmStatuses(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.emStatuses = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emStatusesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmStatuses();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.emStatuses = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emStatusesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
