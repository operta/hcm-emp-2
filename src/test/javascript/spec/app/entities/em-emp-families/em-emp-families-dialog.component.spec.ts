/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpFamiliesDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-families/em-emp-families-dialog.component';
import { EmEmpFamiliesService } from '../../../../../../main/webapp/app/entities/em-emp-families/em-emp-families.service';
import { EmEmpFamilies } from '../../../../../../main/webapp/app/entities/em-emp-families/em-emp-families.model';
import { RgFamilyRolesService } from '../../../../../../main/webapp/app/entities/rg-family-roles';
import { EmEmployeesService } from '../../../../../../main/webapp/app/entities/em-employees';

describe('Component Tests', () => {

    describe('EmEmpFamilies Management Dialog Component', () => {
        let comp: EmEmpFamiliesDialogComponent;
        let fixture: ComponentFixture<EmEmpFamiliesDialogComponent>;
        let service: EmEmpFamiliesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpFamiliesDialogComponent],
                providers: [
                    RgFamilyRolesService,
                    EmEmployeesService,
                    EmEmpFamiliesService
                ]
            })
            .overrideTemplate(EmEmpFamiliesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpFamiliesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpFamiliesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpFamilies(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.emEmpFamilies = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpFamiliesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpFamilies();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.emEmpFamilies = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpFamiliesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
