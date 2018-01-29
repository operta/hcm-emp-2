/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { RgRegionsComponent } from '../../../../../../main/webapp/app/entities/rg-regions/rg-regions.component';
import { RgRegionsService } from '../../../../../../main/webapp/app/entities/rg-regions/rg-regions.service';
import { RgRegions } from '../../../../../../main/webapp/app/entities/rg-regions/rg-regions.model';

describe('Component Tests', () => {

    describe('RgRegions Management Component', () => {
        let comp: RgRegionsComponent;
        let fixture: ComponentFixture<RgRegionsComponent>;
        let service: RgRegionsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgRegionsComponent],
                providers: [
                    RgRegionsService
                ]
            })
            .overrideTemplate(RgRegionsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgRegionsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgRegionsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new RgRegions(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rgRegions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
