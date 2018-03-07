/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpSkillsComponent } from '../../../../../../main/webapp/app/entities/em-emp-skills/em-emp-skills.component';
import { EmEmpSkillsService } from '../../../../../../main/webapp/app/entities/em-emp-skills/em-emp-skills.service';
import { EmEmpSkills } from '../../../../../../main/webapp/app/entities/em-emp-skills/em-emp-skills.model';

describe('Component Tests', () => {

    describe('EmEmpSkills Management Component', () => {
        let comp: EmEmpSkillsComponent;
        let fixture: ComponentFixture<EmEmpSkillsComponent>;
        let service: EmEmpSkillsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpSkillsComponent],
                providers: [
                    EmEmpSkillsService
                ]
            })
            .overrideTemplate(EmEmpSkillsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpSkillsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpSkillsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmEmpSkills(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emEmpSkills[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
