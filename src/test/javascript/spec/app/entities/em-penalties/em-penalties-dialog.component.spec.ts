/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmPenaltiesDialogComponent } from '../../../../../../main/webapp/app/entities/em-penalties/em-penalties-dialog.component';
import { EmPenaltiesService } from '../../../../../../main/webapp/app/entities/em-penalties/em-penalties.service';
import { EmPenalties } from '../../../../../../main/webapp/app/entities/em-penalties/em-penalties.model';
import { EmEmployeesService } from '../../../../../../main/webapp/app/entities/em-employees';

describe('Component Tests', () => {

    describe('EmPenalties Management Dialog Component', () => {
        let comp: EmPenaltiesDialogComponent;
        let fixture: ComponentFixture<EmPenaltiesDialogComponent>;
        let service: EmPenaltiesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmPenaltiesDialogComponent],
                providers: [
                    EmEmployeesService,
                    EmPenaltiesService
                ]
            })
            .overrideTemplate(EmPenaltiesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmPenaltiesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmPenaltiesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmPenalties(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.emPenalties = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emPenaltiesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmPenalties();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.emPenalties = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emPenaltiesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
