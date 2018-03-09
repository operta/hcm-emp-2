/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { OgWorkPlaceSkillsDetailComponent } from '../../../../../../main/webapp/app/entities/og-work-place-skills/og-work-place-skills-detail.component';
import { OgWorkPlaceSkillsService } from '../../../../../../main/webapp/app/entities/og-work-place-skills/og-work-place-skills.service';
import { OgWorkPlaceSkills } from '../../../../../../main/webapp/app/entities/og-work-place-skills/og-work-place-skills.model';

describe('Component Tests', () => {

    describe('OgWorkPlaceSkills Management Detail Component', () => {
        let comp: OgWorkPlaceSkillsDetailComponent;
        let fixture: ComponentFixture<OgWorkPlaceSkillsDetailComponent>;
        let service: OgWorkPlaceSkillsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [OgWorkPlaceSkillsDetailComponent],
                providers: [
                    OgWorkPlaceSkillsService
                ]
            })
            .overrideTemplate(OgWorkPlaceSkillsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OgWorkPlaceSkillsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OgWorkPlaceSkillsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new OgWorkPlaceSkills(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ogWorkPlaceSkills).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
