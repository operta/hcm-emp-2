/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { OgOrgWorkPlacesComponent } from '../../../../../../main/webapp/app/entities/og-org-work-places/og-org-work-places.component';
import { OgOrgWorkPlacesService } from '../../../../../../main/webapp/app/entities/og-org-work-places/og-org-work-places.service';
import { OgOrgWorkPlaces } from '../../../../../../main/webapp/app/entities/og-org-work-places/og-org-work-places.model';

describe('Component Tests', () => {

    describe('OgOrgWorkPlaces Management Component', () => {
        let comp: OgOrgWorkPlacesComponent;
        let fixture: ComponentFixture<OgOrgWorkPlacesComponent>;
        let service: OgOrgWorkPlacesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [OgOrgWorkPlacesComponent],
                providers: [
                    OgOrgWorkPlacesService
                ]
            })
            .overrideTemplate(OgOrgWorkPlacesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OgOrgWorkPlacesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OgOrgWorkPlacesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new OgOrgWorkPlaces(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ogOrgWorkPlaces[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
