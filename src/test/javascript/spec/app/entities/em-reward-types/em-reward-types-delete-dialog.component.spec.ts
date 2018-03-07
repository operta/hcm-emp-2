/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmRewardTypesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/em-reward-types/em-reward-types-delete-dialog.component';
import { EmRewardTypesService } from '../../../../../../main/webapp/app/entities/em-reward-types/em-reward-types.service';

describe('Component Tests', () => {

    describe('EmRewardTypes Management Delete Component', () => {
        let comp: EmRewardTypesDeleteDialogComponent;
        let fixture: ComponentFixture<EmRewardTypesDeleteDialogComponent>;
        let service: EmRewardTypesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmRewardTypesDeleteDialogComponent],
                providers: [
                    EmRewardTypesService
                ]
            })
            .overrideTemplate(EmRewardTypesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmRewardTypesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmRewardTypesService);
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
