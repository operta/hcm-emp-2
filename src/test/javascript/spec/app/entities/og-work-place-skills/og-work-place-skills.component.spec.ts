/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { OgWorkPlaceSkillsComponent } from '../../../../../../main/webapp/app/entities/og-work-place-skills/og-work-place-skills.component';
import { OgWorkPlaceSkillsService } from '../../../../../../main/webapp/app/entities/og-work-place-skills/og-work-place-skills.service';
import { OgWorkPlaceSkills } from '../../../../../../main/webapp/app/entities/og-work-place-skills/og-work-place-skills.model';

describe('Component Tests', () => {

    describe('OgWorkPlaceSkills Management Component', () => {
        let comp: OgWorkPlaceSkillsComponent;
        let fixture: ComponentFixture<OgWorkPlaceSkillsComponent>;
        let service: OgWorkPlaceSkillsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [OgWorkPlaceSkillsComponent],
                providers: [
                    OgWorkPlaceSkillsService
                ]
            })
            .overrideTemplate(OgWorkPlaceSkillsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OgWorkPlaceSkillsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OgWorkPlaceSkillsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new OgWorkPlaceSkills(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ogWorkPlaceSkills[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
