/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { OgWorkPlacesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/og-work-places/og-work-places-delete-dialog.component';
import { OgWorkPlacesService } from '../../../../../../main/webapp/app/entities/og-work-places/og-work-places.service';

describe('Component Tests', () => {

    describe('OgWorkPlaces Management Delete Component', () => {
        let comp: OgWorkPlacesDeleteDialogComponent;
        let fixture: ComponentFixture<OgWorkPlacesDeleteDialogComponent>;
        let service: OgWorkPlacesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [OgWorkPlacesDeleteDialogComponent],
                providers: [
                    OgWorkPlacesService
                ]
            })
            .overrideTemplate(OgWorkPlacesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OgWorkPlacesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OgWorkPlacesService);
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
