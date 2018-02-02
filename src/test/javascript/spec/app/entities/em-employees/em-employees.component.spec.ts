/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmployeesComponent } from '../../../../../../main/webapp/app/entities/em-employees/em-employees.component';
import { EmEmployeesService } from '../../../../../../main/webapp/app/entities/em-employees/em-employees.service';
import { EmEmployees } from '../../../../../../main/webapp/app/entities/em-employees/em-employees.model';

describe('Component Tests', () => {

    describe('EmEmployees Management Component', () => {
        let comp: EmEmployeesComponent;
        let fixture: ComponentFixture<EmEmployeesComponent>;
        let service: EmEmployeesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmployeesComponent],
                providers: [
                    EmEmployeesService
                ]
            })
            .overrideTemplate(EmEmployeesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmployeesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmployeesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmEmployees(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emEmployees[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
