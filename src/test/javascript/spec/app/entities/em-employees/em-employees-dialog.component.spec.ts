/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmployeesDialogComponent } from '../../../../../../main/webapp/app/entities/em-employees/em-employees-dialog.component';
import { EmEmployeesService } from '../../../../../../main/webapp/app/entities/em-employees/em-employees.service';
import { EmEmployees } from '../../../../../../main/webapp/app/entities/em-employees/em-employees.model';
import { RgQualificationsService } from '../../../../../../main/webapp/app/entities/rg-qualifications';
import { EmEmpTypesService } from '../../../../../../main/webapp/app/entities/em-emp-types';
import { LeLegalEntitiesService } from '../../../../../../main/webapp/app/entities/le-legal-entities';
import { EmStatusesService } from '../../../../../../main/webapp/app/entities/em-statuses';
import { UserService } from '../../../../../../main/webapp/app/shared';

describe('Component Tests', () => {

    describe('EmEmployees Management Dialog Component', () => {
        let comp: EmEmployeesDialogComponent;
        let fixture: ComponentFixture<EmEmployeesDialogComponent>;
        let service: EmEmployeesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmployeesDialogComponent],
                providers: [
                    RgQualificationsService,
                    EmEmpTypesService,
                    LeLegalEntitiesService,
                    EmStatusesService,
                    UserService,
                    EmEmployeesService
                ]
            })
            .overrideTemplate(EmEmployeesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmployeesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmployeesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmployees(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.emEmployees = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmployeesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmployees();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.emEmployees = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmployeesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
