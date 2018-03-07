/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { RgIdentificationTypesComponent } from '../../../../../../main/webapp/app/entities/rg-identification-types/rg-identification-types.component';
import { RgIdentificationTypesService } from '../../../../../../main/webapp/app/entities/rg-identification-types/rg-identification-types.service';
import { RgIdentificationTypes } from '../../../../../../main/webapp/app/entities/rg-identification-types/rg-identification-types.model';

describe('Component Tests', () => {

    describe('RgIdentificationTypes Management Component', () => {
        let comp: RgIdentificationTypesComponent;
        let fixture: ComponentFixture<RgIdentificationTypesComponent>;
        let service: RgIdentificationTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgIdentificationTypesComponent],
                providers: [
                    RgIdentificationTypesService
                ]
            })
            .overrideTemplate(RgIdentificationTypesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgIdentificationTypesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgIdentificationTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new RgIdentificationTypes(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rgIdentificationTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
