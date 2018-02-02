/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { OgWorkPlaceTypesDetailComponent } from '../../../../../../main/webapp/app/entities/og-work-place-types/og-work-place-types-detail.component';
import { OgWorkPlaceTypesService } from '../../../../../../main/webapp/app/entities/og-work-place-types/og-work-place-types.service';
import { OgWorkPlaceTypes } from '../../../../../../main/webapp/app/entities/og-work-place-types/og-work-place-types.model';

describe('Component Tests', () => {

    describe('OgWorkPlaceTypes Management Detail Component', () => {
        let comp: OgWorkPlaceTypesDetailComponent;
        let fixture: ComponentFixture<OgWorkPlaceTypesDetailComponent>;
        let service: OgWorkPlaceTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [OgWorkPlaceTypesDetailComponent],
                providers: [
                    OgWorkPlaceTypesService
                ]
            })
            .overrideTemplate(OgWorkPlaceTypesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OgWorkPlaceTypesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OgWorkPlaceTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new OgWorkPlaceTypes(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ogWorkPlaceTypes).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
