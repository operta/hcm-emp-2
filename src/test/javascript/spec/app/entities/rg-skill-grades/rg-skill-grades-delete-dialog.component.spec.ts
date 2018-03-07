/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { RgSkillGradesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/rg-skill-grades/rg-skill-grades-delete-dialog.component';
import { RgSkillGradesService } from '../../../../../../main/webapp/app/entities/rg-skill-grades/rg-skill-grades.service';

describe('Component Tests', () => {

    describe('RgSkillGrades Management Delete Component', () => {
        let comp: RgSkillGradesDeleteDialogComponent;
        let fixture: ComponentFixture<RgSkillGradesDeleteDialogComponent>;
        let service: RgSkillGradesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgSkillGradesDeleteDialogComponent],
                providers: [
                    RgSkillGradesService
                ]
            })
            .overrideTemplate(RgSkillGradesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgSkillGradesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgSkillGradesService);
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
