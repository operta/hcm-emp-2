/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpIdentificationsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-identifications/em-emp-identifications-delete-dialog.component';
import { EmEmpIdentificationsService } from '../../../../../../main/webapp/app/entities/em-emp-identifications/em-emp-identifications.service';

describe('Component Tests', () => {

    describe('EmEmpIdentifications Management Delete Component', () => {
        let comp: EmEmpIdentificationsDeleteDialogComponent;
        let fixture: ComponentFixture<EmEmpIdentificationsDeleteDialogComponent>;
        let service: EmEmpIdentificationsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpIdentificationsDeleteDialogComponent],
                providers: [
                    EmEmpIdentificationsService
                ]
            })
            .overrideTemplate(EmEmpIdentificationsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpIdentificationsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpIdentificationsService);
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
