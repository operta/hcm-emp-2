/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmRewardTypesDialogComponent } from '../../../../../../main/webapp/app/entities/em-reward-types/em-reward-types-dialog.component';
import { EmRewardTypesService } from '../../../../../../main/webapp/app/entities/em-reward-types/em-reward-types.service';
import { EmRewardTypes } from '../../../../../../main/webapp/app/entities/em-reward-types/em-reward-types.model';

describe('Component Tests', () => {

    describe('EmRewardTypes Management Dialog Component', () => {
        let comp: EmRewardTypesDialogComponent;
        let fixture: ComponentFixture<EmRewardTypesDialogComponent>;
        let service: EmRewardTypesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmRewardTypesDialogComponent],
                providers: [
                    EmRewardTypesService
                ]
            })
            .overrideTemplate(EmRewardTypesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmRewardTypesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmRewardTypesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmRewardTypes(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.emRewardTypes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emRewardTypesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmRewardTypes();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.emRewardTypes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emRewardTypesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
