/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmPenaltiesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/em-penalties/em-penalties-delete-dialog.component';
import { EmPenaltiesService } from '../../../../../../main/webapp/app/entities/em-penalties/em-penalties.service';

describe('Component Tests', () => {

    describe('EmPenalties Management Delete Component', () => {
        let comp: EmPenaltiesDeleteDialogComponent;
        let fixture: ComponentFixture<EmPenaltiesDeleteDialogComponent>;
        let service: EmPenaltiesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmPenaltiesDeleteDialogComponent],
                providers: [
                    EmPenaltiesService
                ]
            })
            .overrideTemplate(EmPenaltiesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmPenaltiesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmPenaltiesService);
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
