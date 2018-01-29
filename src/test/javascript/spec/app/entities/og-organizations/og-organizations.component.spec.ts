/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { OgOrganizationsComponent } from '../../../../../../main/webapp/app/entities/og-organizations/og-organizations.component';
import { OgOrganizationsService } from '../../../../../../main/webapp/app/entities/og-organizations/og-organizations.service';
import { OgOrganizations } from '../../../../../../main/webapp/app/entities/og-organizations/og-organizations.model';

describe('Component Tests', () => {

    describe('OgOrganizations Management Component', () => {
        let comp: OgOrganizationsComponent;
        let fixture: ComponentFixture<OgOrganizationsComponent>;
        let service: OgOrganizationsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [OgOrganizationsComponent],
                providers: [
                    OgOrganizationsService
                ]
            })
            .overrideTemplate(OgOrganizationsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OgOrganizationsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OgOrganizationsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new OgOrganizations(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ogOrganizations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
