/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { RgRegionsDetailComponent } from '../../../../../../main/webapp/app/entities/rg-regions/rg-regions-detail.component';
import { RgRegionsService } from '../../../../../../main/webapp/app/entities/rg-regions/rg-regions.service';
import { RgRegions } from '../../../../../../main/webapp/app/entities/rg-regions/rg-regions.model';

describe('Component Tests', () => {

    describe('RgRegions Management Detail Component', () => {
        let comp: RgRegionsDetailComponent;
        let fixture: ComponentFixture<RgRegionsDetailComponent>;
        let service: RgRegionsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgRegionsDetailComponent],
                providers: [
                    RgRegionsService
                ]
            })
            .overrideTemplate(RgRegionsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgRegionsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgRegionsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new RgRegions(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.rgRegions).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
