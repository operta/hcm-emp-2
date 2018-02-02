/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpTypesComponent } from '../../../../../../main/webapp/app/entities/em-emp-types/em-emp-types.component';
import { EmEmpTypesService } from '../../../../../../main/webapp/app/entities/em-emp-types/em-emp-types.service';
import { EmEmpTypes } from '../../../../../../main/webapp/app/entities/em-emp-types/em-emp-types.model';

describe('Component Tests', () => {

    describe('EmEmpTypes Management Component', () => {
        let comp: EmEmpTypesComponent;
        let fixture: ComponentFixture<EmEmpTypesComponent>;
        let service: EmEmpTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpTypesComponent],
                providers: [
                    EmEmpTypesService
                ]
            })
            .overrideTemplate(EmEmpTypesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpTypesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmEmpTypes(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emEmpTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
