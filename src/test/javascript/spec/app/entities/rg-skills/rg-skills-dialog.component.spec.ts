/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { RgSkillsDialogComponent } from '../../../../../../main/webapp/app/entities/rg-skills/rg-skills-dialog.component';
import { RgSkillsService } from '../../../../../../main/webapp/app/entities/rg-skills/rg-skills.service';
import { RgSkills } from '../../../../../../main/webapp/app/entities/rg-skills/rg-skills.model';

describe('Component Tests', () => {

    describe('RgSkills Management Dialog Component', () => {
        let comp: RgSkillsDialogComponent;
        let fixture: ComponentFixture<RgSkillsDialogComponent>;
        let service: RgSkillsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgSkillsDialogComponent],
                providers: [
                    RgSkillsService
                ]
            })
            .overrideTemplate(RgSkillsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgSkillsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgSkillsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RgSkills(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.rgSkills = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'rgSkillsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RgSkills();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.rgSkills = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'rgSkillsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
