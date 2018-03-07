/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { RgIdentificationTypesDetailComponent } from '../../../../../../main/webapp/app/entities/rg-identification-types/rg-identification-types-detail.component';
import { RgIdentificationTypesService } from '../../../../../../main/webapp/app/entities/rg-identification-types/rg-identification-types.service';
import { RgIdentificationTypes } from '../../../../../../main/webapp/app/entities/rg-identification-types/rg-identification-types.model';

describe('Component Tests', () => {

    describe('RgIdentificationTypes Management Detail Component', () => {
        let comp: RgIdentificationTypesDetailComponent;
        let fixture: ComponentFixture<RgIdentificationTypesDetailComponent>;
        let service: RgIdentificationTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgIdentificationTypesDetailComponent],
                providers: [
                    RgIdentificationTypesService
                ]
            })
            .overrideTemplate(RgIdentificationTypesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgIdentificationTypesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgIdentificationTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new RgIdentificationTypes(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.rgIdentificationTypes).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
