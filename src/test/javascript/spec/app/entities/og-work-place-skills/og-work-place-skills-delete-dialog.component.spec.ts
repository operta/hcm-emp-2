/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { OgWorkPlaceSkillsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/og-work-place-skills/og-work-place-skills-delete-dialog.component';
import { OgWorkPlaceSkillsService } from '../../../../../../main/webapp/app/entities/og-work-place-skills/og-work-place-skills.service';

describe('Component Tests', () => {

    describe('OgWorkPlaceSkills Management Delete Component', () => {
        let comp: OgWorkPlaceSkillsDeleteDialogComponent;
        let fixture: ComponentFixture<OgWorkPlaceSkillsDeleteDialogComponent>;
        let service: OgWorkPlaceSkillsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [OgWorkPlaceSkillsDeleteDialogComponent],
                providers: [
                    OgWorkPlaceSkillsService
                ]
            })
            .overrideTemplate(OgWorkPlaceSkillsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OgWorkPlaceSkillsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OgWorkPlaceSkillsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
