/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpPreviousJobsDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-previous-jobs/em-emp-previous-jobs-dialog.component';
import { EmEmpPreviousJobsService } from '../../../../../../main/webapp/app/entities/em-emp-previous-jobs/em-emp-previous-jobs.service';
import { EmEmpPreviousJobs } from '../../../../../../main/webapp/app/entities/em-emp-previous-jobs/em-emp-previous-jobs.model';
import { EmEmployeesService } from '../../../../../../main/webapp/app/entities/em-employees';

describe('Component Tests', () => {

    describe('EmEmpPreviousJobs Management Dialog Component', () => {
        let comp: EmEmpPreviousJobsDialogComponent;
        let fixture: ComponentFixture<EmEmpPreviousJobsDialogComponent>;
        let service: EmEmpPreviousJobsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpPreviousJobsDialogComponent],
                providers: [
                    EmEmployeesService,
                    EmEmpPreviousJobsService
                ]
            })
            .overrideTemplate(EmEmpPreviousJobsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpPreviousJobsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpPreviousJobsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpPreviousJobs(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.emEmpPreviousJobs = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpPreviousJobsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpPreviousJobs();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.emEmpPreviousJobs = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpPreviousJobsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
