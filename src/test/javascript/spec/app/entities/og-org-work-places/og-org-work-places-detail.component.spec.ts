/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { OgOrgWorkPlacesDetailComponent } from '../../../../../../main/webapp/app/entities/og-org-work-places/og-org-work-places-detail.component';
import { OgOrgWorkPlacesService } from '../../../../../../main/webapp/app/entities/og-org-work-places/og-org-work-places.service';
import { OgOrgWorkPlaces } from '../../../../../../main/webapp/app/entities/og-org-work-places/og-org-work-places.model';

describe('Component Tests', () => {

    describe('OgOrgWorkPlaces Management Detail Component', () => {
        let comp: OgOrgWorkPlacesDetailComponent;
        let fixture: ComponentFixture<OgOrgWorkPlacesDetailComponent>;
        let service: OgOrgWorkPlacesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [OgOrgWorkPlacesDetailComponent],
                providers: [
                    OgOrgWorkPlacesService
                ]
            })
            .overrideTemplate(OgOrgWorkPlacesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OgOrgWorkPlacesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OgOrgWorkPlacesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new OgOrgWorkPlaces(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ogOrgWorkPlaces).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
