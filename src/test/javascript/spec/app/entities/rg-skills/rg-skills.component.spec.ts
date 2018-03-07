/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { RgSkillsComponent } from '../../../../../../main/webapp/app/entities/rg-skills/rg-skills.component';
import { RgSkillsService } from '../../../../../../main/webapp/app/entities/rg-skills/rg-skills.service';
import { RgSkills } from '../../../../../../main/webapp/app/entities/rg-skills/rg-skills.model';

describe('Component Tests', () => {

    describe('RgSkills Management Component', () => {
        let comp: RgSkillsComponent;
        let fixture: ComponentFixture<RgSkillsComponent>;
        let service: RgSkillsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgSkillsComponent],
                providers: [
                    RgSkillsService
                ]
            })
            .overrideTemplate(RgSkillsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgSkillsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgSkillsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new RgSkills(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rgSkills[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
