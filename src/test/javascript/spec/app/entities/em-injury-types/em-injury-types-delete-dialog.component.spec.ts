/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmInjuryTypesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/em-injury-types/em-injury-types-delete-dialog.component';
import { EmInjuryTypesService } from '../../../../../../main/webapp/app/entities/em-injury-types/em-injury-types.service';

describe('Component Tests', () => {

    describe('EmInjuryTypes Management Delete Component', () => {
        let comp: EmInjuryTypesDeleteDialogComponent;
        let fixture: ComponentFixture<EmInjuryTypesDeleteDialogComponent>;
        let service: EmInjuryTypesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmInjuryTypesDeleteDialogComponent],
                providers: [
                    EmInjuryTypesService
                ]
            })
            .overrideTemplate(EmInjuryTypesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmInjuryTypesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmInjuryTypesService);
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
