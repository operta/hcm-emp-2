/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpSchoolsDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-schools/em-emp-schools-dialog.component';
import { EmEmpSchoolsService } from '../../../../../../main/webapp/app/entities/em-emp-schools/em-emp-schools.service';
import { EmEmpSchools } from '../../../../../../main/webapp/app/entities/em-emp-schools/em-emp-schools.model';
import { RgSchoolsService } from '../../../../../../main/webapp/app/entities/rg-schools';
import { EmEmployeesService } from '../../../../../../main/webapp/app/entities/em-employees';
import { RgQualificationsService } from '../../../../../../main/webapp/app/entities/rg-qualifications';

describe('Component Tests', () => {

    describe('EmEmpSchools Management Dialog Component', () => {
        let comp: EmEmpSchoolsDialogComponent;
        let fixture: ComponentFixture<EmEmpSchoolsDialogComponent>;
        let service: EmEmpSchoolsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpSchoolsDialogComponent],
                providers: [
                    RgSchoolsService,
                    EmEmployeesService,
                    RgQualificationsService,
                    EmEmpSchoolsService
                ]
            })
            .overrideTemplate(EmEmpSchoolsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpSchoolsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpSchoolsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpSchools(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.emEmpSchools = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpSchoolsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpSchools();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.emEmpSchools = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpSchoolsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
