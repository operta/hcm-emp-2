/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { OgOrgWorkPlacesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/og-org-work-places/og-org-work-places-delete-dialog.component';
import { OgOrgWorkPlacesService } from '../../../../../../main/webapp/app/entities/og-org-work-places/og-org-work-places.service';

describe('Component Tests', () => {

    describe('OgOrgWorkPlaces Management Delete Component', () => {
        let comp: OgOrgWorkPlacesDeleteDialogComponent;
        let fixture: ComponentFixture<OgOrgWorkPlacesDeleteDialogComponent>;
        let service: OgOrgWorkPlacesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [OgOrgWorkPlacesDeleteDialogComponent],
                providers: [
                    OgOrgWorkPlacesService
                ]
            })
            .overrideTemplate(OgOrgWorkPlacesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OgOrgWorkPlacesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OgOrgWorkPlacesService);
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
