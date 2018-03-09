/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { RgContactTypesDetailComponent } from '../../../../../../main/webapp/app/entities/rg-contact-types/rg-contact-types-detail.component';
import { RgContactTypesService } from '../../../../../../main/webapp/app/entities/rg-contact-types/rg-contact-types.service';
import { RgContactTypes } from '../../../../../../main/webapp/app/entities/rg-contact-types/rg-contact-types.model';

describe('Component Tests', () => {

    describe('RgContactTypes Management Detail Component', () => {
        let comp: RgContactTypesDetailComponent;
        let fixture: ComponentFixture<RgContactTypesDetailComponent>;
        let service: RgContactTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgContactTypesDetailComponent],
                providers: [
                    RgContactTypesService
                ]
            })
            .overrideTemplate(RgContactTypesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgContactTypesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgContactTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new RgContactTypes(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.rgContactTypes).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
