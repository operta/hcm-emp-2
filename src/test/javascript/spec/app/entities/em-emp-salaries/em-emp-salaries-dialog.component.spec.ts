/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpSalariesDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-salaries/em-emp-salaries-dialog.component';
import { EmEmpSalariesService } from '../../../../../../main/webapp/app/entities/em-emp-salaries/em-emp-salaries.service';
import { EmEmpSalaries } from '../../../../../../main/webapp/app/entities/em-emp-salaries/em-emp-salaries.model';
import { EmEmployeesService } from '../../../../../../main/webapp/app/entities/em-employees';
import { OgWorkPlacesService } from '../../../../../../main/webapp/app/entities/og-work-places';
import { EmContractTypesService } from '../../../../../../main/webapp/app/entities/em-contract-types';

describe('Component Tests', () => {

    describe('EmEmpSalaries Management Dialog Component', () => {
        let comp: EmEmpSalariesDialogComponent;
        let fixture: ComponentFixture<EmEmpSalariesDialogComponent>;
        let service: EmEmpSalariesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpSalariesDialogComponent],
                providers: [
                    EmEmployeesService,
                    OgWorkPlacesService,
                    EmContractTypesService,
                    EmEmpSalariesService
                ]
            })
            .overrideTemplate(EmEmpSalariesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpSalariesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpSalariesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpSalaries(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.emEmpSalaries = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpSalariesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpSalaries();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.emEmpSalaries = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpSalariesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
