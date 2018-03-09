/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { RgContactTypesComponent } from '../../../../../../main/webapp/app/entities/rg-contact-types/rg-contact-types.component';
import { RgContactTypesService } from '../../../../../../main/webapp/app/entities/rg-contact-types/rg-contact-types.service';
import { RgContactTypes } from '../../../../../../main/webapp/app/entities/rg-contact-types/rg-contact-types.model';

describe('Component Tests', () => {

    describe('RgContactTypes Management Component', () => {
        let comp: RgContactTypesComponent;
        let fixture: ComponentFixture<RgContactTypesComponent>;
        let service: RgContactTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgContactTypesComponent],
                providers: [
                    RgContactTypesService
                ]
            })
            .overrideTemplate(RgContactTypesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgContactTypesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgContactTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new RgContactTypes(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rgContactTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
