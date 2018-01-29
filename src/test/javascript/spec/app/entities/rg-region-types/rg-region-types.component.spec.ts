/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { RgRegionTypesComponent } from '../../../../../../main/webapp/app/entities/rg-region-types/rg-region-types.component';
import { RgRegionTypesService } from '../../../../../../main/webapp/app/entities/rg-region-types/rg-region-types.service';
import { RgRegionTypes } from '../../../../../../main/webapp/app/entities/rg-region-types/rg-region-types.model';

describe('Component Tests', () => {

    describe('RgRegionTypes Management Component', () => {
        let comp: RgRegionTypesComponent;
        let fixture: ComponentFixture<RgRegionTypesComponent>;
        let service: RgRegionTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgRegionTypesComponent],
                providers: [
                    RgRegionTypesService
                ]
            })
            .overrideTemplate(RgRegionTypesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgRegionTypesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgRegionTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new RgRegionTypes(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rgRegionTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
