/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { RgSkillsDetailComponent } from '../../../../../../main/webapp/app/entities/rg-skills/rg-skills-detail.component';
import { RgSkillsService } from '../../../../../../main/webapp/app/entities/rg-skills/rg-skills.service';
import { RgSkills } from '../../../../../../main/webapp/app/entities/rg-skills/rg-skills.model';

describe('Component Tests', () => {

    describe('RgSkills Management Detail Component', () => {
        let comp: RgSkillsDetailComponent;
        let fixture: ComponentFixture<RgSkillsDetailComponent>;
        let service: RgSkillsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgSkillsDetailComponent],
                providers: [
                    RgSkillsService
                ]
            })
            .overrideTemplate(RgSkillsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgSkillsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgSkillsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new RgSkills(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.rgSkills).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
