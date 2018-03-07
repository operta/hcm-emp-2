/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmInjuryTypesComponent } from '../../../../../../main/webapp/app/entities/em-injury-types/em-injury-types.component';
import { EmInjuryTypesService } from '../../../../../../main/webapp/app/entities/em-injury-types/em-injury-types.service';
import { EmInjuryTypes } from '../../../../../../main/webapp/app/entities/em-injury-types/em-injury-types.model';

describe('Component Tests', () => {

    describe('EmInjuryTypes Management Component', () => {
        let comp: EmInjuryTypesComponent;
        let fixture: ComponentFixture<EmInjuryTypesComponent>;
        let service: EmInjuryTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmInjuryTypesComponent],
                providers: [
                    EmInjuryTypesService
                ]
            })
            .overrideTemplate(EmInjuryTypesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmInjuryTypesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmInjuryTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmInjuryTypes(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emInjuryTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
