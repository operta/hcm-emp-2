/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { RgSkillGradesComponent } from '../../../../../../main/webapp/app/entities/rg-skill-grades/rg-skill-grades.component';
import { RgSkillGradesService } from '../../../../../../main/webapp/app/entities/rg-skill-grades/rg-skill-grades.service';
import { RgSkillGrades } from '../../../../../../main/webapp/app/entities/rg-skill-grades/rg-skill-grades.model';

describe('Component Tests', () => {

    describe('RgSkillGrades Management Component', () => {
        let comp: RgSkillGradesComponent;
        let fixture: ComponentFixture<RgSkillGradesComponent>;
        let service: RgSkillGradesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgSkillGradesComponent],
                providers: [
                    RgSkillGradesService
                ]
            })
            .overrideTemplate(RgSkillGradesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgSkillGradesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgSkillGradesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new RgSkillGrades(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rgSkillGrades[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
