/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { OgWorkPlaceTypesComponent } from '../../../../../../main/webapp/app/entities/og-work-place-types/og-work-place-types.component';
import { OgWorkPlaceTypesService } from '../../../../../../main/webapp/app/entities/og-work-place-types/og-work-place-types.service';
import { OgWorkPlaceTypes } from '../../../../../../main/webapp/app/entities/og-work-place-types/og-work-place-types.model';

describe('Component Tests', () => {

    describe('OgWorkPlaceTypes Management Component', () => {
        let comp: OgWorkPlaceTypesComponent;
        let fixture: ComponentFixture<OgWorkPlaceTypesComponent>;
        let service: OgWorkPlaceTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [OgWorkPlaceTypesComponent],
                providers: [
                    OgWorkPlaceTypesService
                ]
            })
            .overrideTemplate(OgWorkPlaceTypesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OgWorkPlaceTypesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OgWorkPlaceTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new OgWorkPlaceTypes(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ogWorkPlaceTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
