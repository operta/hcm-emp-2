/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpSchoolsComponent } from '../../../../../../main/webapp/app/entities/em-emp-schools/em-emp-schools.component';
import { EmEmpSchoolsService } from '../../../../../../main/webapp/app/entities/em-emp-schools/em-emp-schools.service';
import { EmEmpSchools } from '../../../../../../main/webapp/app/entities/em-emp-schools/em-emp-schools.model';

describe('Component Tests', () => {

    describe('EmEmpSchools Management Component', () => {
        let comp: EmEmpSchoolsComponent;
        let fixture: ComponentFixture<EmEmpSchoolsComponent>;
        let service: EmEmpSchoolsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpSchoolsComponent],
                providers: [
                    EmEmpSchoolsService
                ]
            })
            .overrideTemplate(EmEmpSchoolsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpSchoolsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpSchoolsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmEmpSchools(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emEmpSchools[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
