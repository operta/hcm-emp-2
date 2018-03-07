/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { RgIdentificationTypesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/rg-identification-types/rg-identification-types-delete-dialog.component';
import { RgIdentificationTypesService } from '../../../../../../main/webapp/app/entities/rg-identification-types/rg-identification-types.service';

describe('Component Tests', () => {

    describe('RgIdentificationTypes Management Delete Component', () => {
        let comp: RgIdentificationTypesDeleteDialogComponent;
        let fixture: ComponentFixture<RgIdentificationTypesDeleteDialogComponent>;
        let service: RgIdentificationTypesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgIdentificationTypesDeleteDialogComponent],
                providers: [
                    RgIdentificationTypesService
                ]
            })
            .overrideTemplate(RgIdentificationTypesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgIdentificationTypesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgIdentificationTypesService);
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
