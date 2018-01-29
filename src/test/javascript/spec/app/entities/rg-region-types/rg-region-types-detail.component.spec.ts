/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { RgRegionTypesDetailComponent } from '../../../../../../main/webapp/app/entities/rg-region-types/rg-region-types-detail.component';
import { RgRegionTypesService } from '../../../../../../main/webapp/app/entities/rg-region-types/rg-region-types.service';
import { RgRegionTypes } from '../../../../../../main/webapp/app/entities/rg-region-types/rg-region-types.model';

describe('Component Tests', () => {

    describe('RgRegionTypes Management Detail Component', () => {
        let comp: RgRegionTypesDetailComponent;
        let fixture: ComponentFixture<RgRegionTypesDetailComponent>;
        let service: RgRegionTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgRegionTypesDetailComponent],
                providers: [
                    RgRegionTypesService
                ]
            })
            .overrideTemplate(RgRegionTypesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgRegionTypesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgRegionTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new RgRegionTypes(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.rgRegionTypes).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
