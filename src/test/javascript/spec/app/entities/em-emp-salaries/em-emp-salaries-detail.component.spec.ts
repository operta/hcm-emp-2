/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpSalariesDetailComponent } from '../../../../../../main/webapp/app/entities/em-emp-salaries/em-emp-salaries-detail.component';
import { EmEmpSalariesService } from '../../../../../../main/webapp/app/entities/em-emp-salaries/em-emp-salaries.service';
import { EmEmpSalaries } from '../../../../../../main/webapp/app/entities/em-emp-salaries/em-emp-salaries.model';

describe('Component Tests', () => {

    describe('EmEmpSalaries Management Detail Component', () => {
        let comp: EmEmpSalariesDetailComponent;
        let fixture: ComponentFixture<EmEmpSalariesDetailComponent>;
        let service: EmEmpSalariesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpSalariesDetailComponent],
                providers: [
                    EmEmpSalariesService
                ]
            })
            .overrideTemplate(EmEmpSalariesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpSalariesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpSalariesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmEmpSalaries(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emEmpSalaries).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
