/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpPreviousJobsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-previous-jobs/em-emp-previous-jobs-delete-dialog.component';
import { EmEmpPreviousJobsService } from '../../../../../../main/webapp/app/entities/em-emp-previous-jobs/em-emp-previous-jobs.service';

describe('Component Tests', () => {

    describe('EmEmpPreviousJobs Management Delete Component', () => {
        let comp: EmEmpPreviousJobsDeleteDialogComponent;
        let fixture: ComponentFixture<EmEmpPreviousJobsDeleteDialogComponent>;
        let service: EmEmpPreviousJobsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpPreviousJobsDeleteDialogComponent],
                providers: [
                    EmEmpPreviousJobsService
                ]
            })
            .overrideTemplate(EmEmpPreviousJobsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpPreviousJobsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpPreviousJobsService);
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
