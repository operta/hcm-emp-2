/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpSchoolsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-schools/em-emp-schools-delete-dialog.component';
import { EmEmpSchoolsService } from '../../../../../../main/webapp/app/entities/em-emp-schools/em-emp-schools.service';

describe('Component Tests', () => {

    describe('EmEmpSchools Management Delete Component', () => {
        let comp: EmEmpSchoolsDeleteDialogComponent;
        let fixture: ComponentFixture<EmEmpSchoolsDeleteDialogComponent>;
        let service: EmEmpSchoolsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpSchoolsDeleteDialogComponent],
                providers: [
                    EmEmpSchoolsService
                ]
            })
            .overrideTemplate(EmEmpSchoolsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpSchoolsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpSchoolsService);
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
