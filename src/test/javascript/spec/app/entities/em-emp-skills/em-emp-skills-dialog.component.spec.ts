/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpSkillsDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-skills/em-emp-skills-dialog.component';
import { EmEmpSkillsService } from '../../../../../../main/webapp/app/entities/em-emp-skills/em-emp-skills.service';
import { EmEmpSkills } from '../../../../../../main/webapp/app/entities/em-emp-skills/em-emp-skills.model';
import { EmEmployeesService } from '../../../../../../main/webapp/app/entities/em-employees';
import { RgSkillsService } from '../../../../../../main/webapp/app/entities/rg-skills';
import { RgSkillGradesService } from '../../../../../../main/webapp/app/entities/rg-skill-grades';

describe('Component Tests', () => {

    describe('EmEmpSkills Management Dialog Component', () => {
        let comp: EmEmpSkillsDialogComponent;
        let fixture: ComponentFixture<EmEmpSkillsDialogComponent>;
        let service: EmEmpSkillsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpSkillsDialogComponent],
                providers: [
                    EmEmployeesService,
                    RgSkillsService,
                    RgSkillGradesService,
                    EmEmpSkillsService
                ]
            })
            .overrideTemplate(EmEmpSkillsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpSkillsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpSkillsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpSkills(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.emEmpSkills = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpSkillsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpSkills();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.emEmpSkills = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpSkillsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
