/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpFamiliesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-families/em-emp-families-delete-dialog.component';
import { EmEmpFamiliesService } from '../../../../../../main/webapp/app/entities/em-emp-families/em-emp-families.service';

describe('Component Tests', () => {

    describe('EmEmpFamilies Management Delete Component', () => {
        let comp: EmEmpFamiliesDeleteDialogComponent;
        let fixture: ComponentFixture<EmEmpFamiliesDeleteDialogComponent>;
        let service: EmEmpFamiliesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpFamiliesDeleteDialogComponent],
                providers: [
                    EmEmpFamiliesService
                ]
            })
            .overrideTemplate(EmEmpFamiliesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpFamiliesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpFamiliesService);
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
