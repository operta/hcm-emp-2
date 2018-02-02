/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { OgWorkPlacesDetailComponent } from '../../../../../../main/webapp/app/entities/og-work-places/og-work-places-detail.component';
import { OgWorkPlacesService } from '../../../../../../main/webapp/app/entities/og-work-places/og-work-places.service';
import { OgWorkPlaces } from '../../../../../../main/webapp/app/entities/og-work-places/og-work-places.model';

describe('Component Tests', () => {

    describe('OgWorkPlaces Management Detail Component', () => {
        let comp: OgWorkPlacesDetailComponent;
        let fixture: ComponentFixture<OgWorkPlacesDetailComponent>;
        let service: OgWorkPlacesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [OgWorkPlacesDetailComponent],
                providers: [
                    OgWorkPlacesService
                ]
            })
            .overrideTemplate(OgWorkPlacesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OgWorkPlacesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OgWorkPlacesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new OgWorkPlaces(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ogWorkPlaces).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
