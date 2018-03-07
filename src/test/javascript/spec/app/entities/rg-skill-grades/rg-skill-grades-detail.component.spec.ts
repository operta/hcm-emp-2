/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { RgSkillGradesDetailComponent } from '../../../../../../main/webapp/app/entities/rg-skill-grades/rg-skill-grades-detail.component';
import { RgSkillGradesService } from '../../../../../../main/webapp/app/entities/rg-skill-grades/rg-skill-grades.service';
import { RgSkillGrades } from '../../../../../../main/webapp/app/entities/rg-skill-grades/rg-skill-grades.model';

describe('Component Tests', () => {

    describe('RgSkillGrades Management Detail Component', () => {
        let comp: RgSkillGradesDetailComponent;
        let fixture: ComponentFixture<RgSkillGradesDetailComponent>;
        let service: RgSkillGradesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgSkillGradesDetailComponent],
                providers: [
                    RgSkillGradesService
                ]
            })
            .overrideTemplate(RgSkillGradesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgSkillGradesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgSkillGradesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new RgSkillGrades(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.rgSkillGrades).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
