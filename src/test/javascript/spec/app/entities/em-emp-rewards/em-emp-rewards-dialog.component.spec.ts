/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpRewardsDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-rewards/em-emp-rewards-dialog.component';
import { EmEmpRewardsService } from '../../../../../../main/webapp/app/entities/em-emp-rewards/em-emp-rewards.service';
import { EmEmpRewards } from '../../../../../../main/webapp/app/entities/em-emp-rewards/em-emp-rewards.model';
import { EmEmployeesService } from '../../../../../../main/webapp/app/entities/em-employees';
import { EmRewardTypesService } from '../../../../../../main/webapp/app/entities/em-reward-types';

describe('Component Tests', () => {

    describe('EmEmpRewards Management Dialog Component', () => {
        let comp: EmEmpRewardsDialogComponent;
        let fixture: ComponentFixture<EmEmpRewardsDialogComponent>;
        let service: EmEmpRewardsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpRewardsDialogComponent],
                providers: [
                    EmEmployeesService,
                    EmRewardTypesService,
                    EmEmpRewardsService
                ]
            })
            .overrideTemplate(EmEmpRewardsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpRewardsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpRewardsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpRewards(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.emEmpRewards = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpRewardsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpRewards();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.emEmpRewards = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpRewardsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
