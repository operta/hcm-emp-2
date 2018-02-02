/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpSalariesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-salaries/em-emp-salaries-delete-dialog.component';
import { EmEmpSalariesService } from '../../../../../../main/webapp/app/entities/em-emp-salaries/em-emp-salaries.service';

describe('Component Tests', () => {

    describe('EmEmpSalaries Management Delete Component', () => {
        let comp: EmEmpSalariesDeleteDialogComponent;
        let fixture: ComponentFixture<EmEmpSalariesDeleteDialogComponent>;
        let service: EmEmpSalariesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpSalariesDeleteDialogComponent],
                providers: [
                    EmEmpSalariesService
                ]
            })
            .overrideTemplate(EmEmpSalariesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpSalariesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpSalariesService);
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
