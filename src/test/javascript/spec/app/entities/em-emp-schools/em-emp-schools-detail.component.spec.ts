/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpSchoolsDetailComponent } from '../../../../../../main/webapp/app/entities/em-emp-schools/em-emp-schools-detail.component';
import { EmEmpSchoolsService } from '../../../../../../main/webapp/app/entities/em-emp-schools/em-emp-schools.service';
import { EmEmpSchools } from '../../../../../../main/webapp/app/entities/em-emp-schools/em-emp-schools.model';

describe('Component Tests', () => {

    describe('EmEmpSchools Management Detail Component', () => {
        let comp: EmEmpSchoolsDetailComponent;
        let fixture: ComponentFixture<EmEmpSchoolsDetailComponent>;
        let service: EmEmpSchoolsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpSchoolsDetailComponent],
                providers: [
                    EmEmpSchoolsService
                ]
            })
            .overrideTemplate(EmEmpSchoolsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpSchoolsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpSchoolsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmEmpSchools(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emEmpSchools).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
