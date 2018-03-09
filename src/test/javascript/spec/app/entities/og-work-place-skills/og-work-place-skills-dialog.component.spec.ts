/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { OgWorkPlaceSkillsDialogComponent } from '../../../../../../main/webapp/app/entities/og-work-place-skills/og-work-place-skills-dialog.component';
import { OgWorkPlaceSkillsService } from '../../../../../../main/webapp/app/entities/og-work-place-skills/og-work-place-skills.service';
import { OgWorkPlaceSkills } from '../../../../../../main/webapp/app/entities/og-work-place-skills/og-work-place-skills.model';
import { RgSkillsService } from '../../../../../../main/webapp/app/entities/rg-skills';
import { RgSkillGradesService } from '../../../../../../main/webapp/app/entities/rg-skill-grades';
import { OgWorkPlacesService } from '../../../../../../main/webapp/app/entities/og-work-places';

describe('Component Tests', () => {

    describe('OgWorkPlaceSkills Management Dialog Component', () => {
        let comp: OgWorkPlaceSkillsDialogComponent;
        let fixture: ComponentFixture<OgWorkPlaceSkillsDialogComponent>;
        let service: OgWorkPlaceSkillsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [OgWorkPlaceSkillsDialogComponent],
                providers: [
                    RgSkillsService,
                    RgSkillGradesService,
                    OgWorkPlacesService,
                    OgWorkPlaceSkillsService
                ]
            })
            .overrideTemplate(OgWorkPlaceSkillsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OgWorkPlaceSkillsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OgWorkPlaceSkillsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OgWorkPlaceSkills(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.ogWorkPlaceSkills = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ogWorkPlaceSkillsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OgWorkPlaceSkills();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.ogWorkPlaceSkills = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ogWorkPlaceSkillsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
