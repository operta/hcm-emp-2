/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpPreviousJobsDetailComponent } from '../../../../../../main/webapp/app/entities/em-emp-previous-jobs/em-emp-previous-jobs-detail.component';
import { EmEmpPreviousJobsService } from '../../../../../../main/webapp/app/entities/em-emp-previous-jobs/em-emp-previous-jobs.service';
import { EmEmpPreviousJobs } from '../../../../../../main/webapp/app/entities/em-emp-previous-jobs/em-emp-previous-jobs.model';

describe('Component Tests', () => {

    describe('EmEmpPreviousJobs Management Detail Component', () => {
        let comp: EmEmpPreviousJobsDetailComponent;
        let fixture: ComponentFixture<EmEmpPreviousJobsDetailComponent>;
        let service: EmEmpPreviousJobsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpPreviousJobsDetailComponent],
                providers: [
                    EmEmpPreviousJobsService
                ]
            })
            .overrideTemplate(EmEmpPreviousJobsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpPreviousJobsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpPreviousJobsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmEmpPreviousJobs(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emEmpPreviousJobs).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
