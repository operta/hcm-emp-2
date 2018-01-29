/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { OgOrganizationsDetailComponent } from '../../../../../../main/webapp/app/entities/og-organizations/og-organizations-detail.component';
import { OgOrganizationsService } from '../../../../../../main/webapp/app/entities/og-organizations/og-organizations.service';
import { OgOrganizations } from '../../../../../../main/webapp/app/entities/og-organizations/og-organizations.model';

describe('Component Tests', () => {

    describe('OgOrganizations Management Detail Component', () => {
        let comp: OgOrganizationsDetailComponent;
        let fixture: ComponentFixture<OgOrganizationsDetailComponent>;
        let service: OgOrganizationsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [OgOrganizationsDetailComponent],
                providers: [
                    OgOrganizationsService
                ]
            })
            .overrideTemplate(OgOrganizationsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OgOrganizationsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OgOrganizationsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new OgOrganizations(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ogOrganizations).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
