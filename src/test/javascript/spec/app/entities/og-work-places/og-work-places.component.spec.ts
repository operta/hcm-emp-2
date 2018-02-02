/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { OgWorkPlacesComponent } from '../../../../../../main/webapp/app/entities/og-work-places/og-work-places.component';
import { OgWorkPlacesService } from '../../../../../../main/webapp/app/entities/og-work-places/og-work-places.service';
import { OgWorkPlaces } from '../../../../../../main/webapp/app/entities/og-work-places/og-work-places.model';

describe('Component Tests', () => {

    describe('OgWorkPlaces Management Component', () => {
        let comp: OgWorkPlacesComponent;
        let fixture: ComponentFixture<OgWorkPlacesComponent>;
        let service: OgWorkPlacesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [OgWorkPlacesComponent],
                providers: [
                    OgWorkPlacesService
                ]
            })
            .overrideTemplate(OgWorkPlacesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OgWorkPlacesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OgWorkPlacesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new OgWorkPlaces(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ogWorkPlaces[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
