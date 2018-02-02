/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpOrgWorkPlacesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-org-work-places/em-emp-org-work-places-delete-dialog.component';
import { EmEmpOrgWorkPlacesService } from '../../../../../../main/webapp/app/entities/em-emp-org-work-places/em-emp-org-work-places.service';

describe('Component Tests', () => {

    describe('EmEmpOrgWorkPlaces Management Delete Component', () => {
        let comp: EmEmpOrgWorkPlacesDeleteDialogComponent;
        let fixture: ComponentFixture<EmEmpOrgWorkPlacesDeleteDialogComponent>;
        let service: EmEmpOrgWorkPlacesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpOrgWorkPlacesDeleteDialogComponent],
                providers: [
                    EmEmpOrgWorkPlacesService
                ]
            })
            .overrideTemplate(EmEmpOrgWorkPlacesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpOrgWorkPlacesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpOrgWorkPlacesService);
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
