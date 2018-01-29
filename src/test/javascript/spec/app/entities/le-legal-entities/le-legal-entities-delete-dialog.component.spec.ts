/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { LeLegalEntitiesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/le-legal-entities/le-legal-entities-delete-dialog.component';
import { LeLegalEntitiesService } from '../../../../../../main/webapp/app/entities/le-legal-entities/le-legal-entities.service';

describe('Component Tests', () => {

    describe('LeLegalEntities Management Delete Component', () => {
        let comp: LeLegalEntitiesDeleteDialogComponent;
        let fixture: ComponentFixture<LeLegalEntitiesDeleteDialogComponent>;
        let service: LeLegalEntitiesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [LeLegalEntitiesDeleteDialogComponent],
                providers: [
                    LeLegalEntitiesService
                ]
            })
            .overrideTemplate(LeLegalEntitiesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LeLegalEntitiesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeLegalEntitiesService);
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
