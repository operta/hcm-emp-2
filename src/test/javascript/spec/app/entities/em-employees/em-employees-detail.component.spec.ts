/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmployeesDetailComponent } from '../../../../../../main/webapp/app/entities/em-employees/em-employees-detail.component';
import { EmEmployeesService } from '../../../../../../main/webapp/app/entities/em-employees/em-employees.service';
import { EmEmployees } from '../../../../../../main/webapp/app/entities/em-employees/em-employees.model';

describe('Component Tests', () => {

    describe('EmEmployees Management Detail Component', () => {
        let comp: EmEmployeesDetailComponent;
        let fixture: ComponentFixture<EmEmployeesDetailComponent>;
        let service: EmEmployeesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmployeesDetailComponent],
                providers: [
                    EmEmployeesService
                ]
            })
            .overrideTemplate(EmEmployeesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmployeesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmployeesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmEmployees(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emEmployees).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
