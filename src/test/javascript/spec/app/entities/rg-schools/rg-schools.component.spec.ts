/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { RgSchoolsComponent } from '../../../../../../main/webapp/app/entities/rg-schools/rg-schools.component';
import { RgSchoolsService } from '../../../../../../main/webapp/app/entities/rg-schools/rg-schools.service';
import { RgSchools } from '../../../../../../main/webapp/app/entities/rg-schools/rg-schools.model';

describe('Component Tests', () => {

    describe('RgSchools Management Component', () => {
        let comp: RgSchoolsComponent;
        let fixture: ComponentFixture<RgSchoolsComponent>;
        let service: RgSchoolsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgSchoolsComponent],
                providers: [
                    RgSchoolsService
                ]
            })
            .overrideTemplate(RgSchoolsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgSchoolsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgSchoolsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new RgSchools(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rgSchools[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
