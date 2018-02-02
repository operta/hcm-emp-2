/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpSalariesComponent } from '../../../../../../main/webapp/app/entities/em-emp-salaries/em-emp-salaries.component';
import { EmEmpSalariesService } from '../../../../../../main/webapp/app/entities/em-emp-salaries/em-emp-salaries.service';
import { EmEmpSalaries } from '../../../../../../main/webapp/app/entities/em-emp-salaries/em-emp-salaries.model';

describe('Component Tests', () => {

    describe('EmEmpSalaries Management Component', () => {
        let comp: EmEmpSalariesComponent;
        let fixture: ComponentFixture<EmEmpSalariesComponent>;
        let service: EmEmpSalariesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpSalariesComponent],
                providers: [
                    EmEmpSalariesService
                ]
            })
            .overrideTemplate(EmEmpSalariesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpSalariesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpSalariesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmEmpSalaries(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emEmpSalaries[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
