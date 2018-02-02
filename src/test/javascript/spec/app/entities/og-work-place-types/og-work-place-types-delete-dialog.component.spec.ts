/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { OgWorkPlaceTypesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/og-work-place-types/og-work-place-types-delete-dialog.component';
import { OgWorkPlaceTypesService } from '../../../../../../main/webapp/app/entities/og-work-place-types/og-work-place-types.service';

describe('Component Tests', () => {

    describe('OgWorkPlaceTypes Management Delete Component', () => {
        let comp: OgWorkPlaceTypesDeleteDialogComponent;
        let fixture: ComponentFixture<OgWorkPlaceTypesDeleteDialogComponent>;
        let service: OgWorkPlaceTypesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [OgWorkPlaceTypesDeleteDialogComponent],
                providers: [
                    OgWorkPlaceTypesService
                ]
            })
            .overrideTemplate(OgWorkPlaceTypesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OgWorkPlaceTypesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OgWorkPlaceTypesService);
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
