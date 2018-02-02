/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { RgQualificationsComponent } from '../../../../../../main/webapp/app/entities/rg-qualifications/rg-qualifications.component';
import { RgQualificationsService } from '../../../../../../main/webapp/app/entities/rg-qualifications/rg-qualifications.service';
import { RgQualifications } from '../../../../../../main/webapp/app/entities/rg-qualifications/rg-qualifications.model';

describe('Component Tests', () => {

    describe('RgQualifications Management Component', () => {
        let comp: RgQualificationsComponent;
        let fixture: ComponentFixture<RgQualificationsComponent>;
        let service: RgQualificationsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgQualificationsComponent],
                providers: [
                    RgQualificationsService
                ]
            })
            .overrideTemplate(RgQualificationsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgQualificationsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgQualificationsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new RgQualifications(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rgQualifications[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
