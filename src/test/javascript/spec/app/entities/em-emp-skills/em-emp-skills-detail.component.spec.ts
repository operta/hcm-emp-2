/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpSkillsDetailComponent } from '../../../../../../main/webapp/app/entities/em-emp-skills/em-emp-skills-detail.component';
import { EmEmpSkillsService } from '../../../../../../main/webapp/app/entities/em-emp-skills/em-emp-skills.service';
import { EmEmpSkills } from '../../../../../../main/webapp/app/entities/em-emp-skills/em-emp-skills.model';

describe('Component Tests', () => {

    describe('EmEmpSkills Management Detail Component', () => {
        let comp: EmEmpSkillsDetailComponent;
        let fixture: ComponentFixture<EmEmpSkillsDetailComponent>;
        let service: EmEmpSkillsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpSkillsDetailComponent],
                providers: [
                    EmEmpSkillsService
                ]
            })
            .overrideTemplate(EmEmpSkillsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpSkillsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpSkillsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmEmpSkills(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emEmpSkills).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
