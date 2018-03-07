/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { RgSkillGradesDialogComponent } from '../../../../../../main/webapp/app/entities/rg-skill-grades/rg-skill-grades-dialog.component';
import { RgSkillGradesService } from '../../../../../../main/webapp/app/entities/rg-skill-grades/rg-skill-grades.service';
import { RgSkillGrades } from '../../../../../../main/webapp/app/entities/rg-skill-grades/rg-skill-grades.model';

describe('Component Tests', () => {

    describe('RgSkillGrades Management Dialog Component', () => {
        let comp: RgSkillGradesDialogComponent;
        let fixture: ComponentFixture<RgSkillGradesDialogComponent>;
        let service: RgSkillGradesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgSkillGradesDialogComponent],
                providers: [
                    RgSkillGradesService
                ]
            })
            .overrideTemplate(RgSkillGradesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgSkillGradesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgSkillGradesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RgSkillGrades(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.rgSkillGrades = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'rgSkillGradesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RgSkillGrades();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.rgSkillGrades = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'rgSkillGradesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
