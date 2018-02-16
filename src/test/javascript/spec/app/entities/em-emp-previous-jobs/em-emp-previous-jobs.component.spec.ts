/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpPreviousJobsComponent } from '../../../../../../main/webapp/app/entities/em-emp-previous-jobs/em-emp-previous-jobs.component';
import { EmEmpPreviousJobsService } from '../../../../../../main/webapp/app/entities/em-emp-previous-jobs/em-emp-previous-jobs.service';
import { EmEmpPreviousJobs } from '../../../../../../main/webapp/app/entities/em-emp-previous-jobs/em-emp-previous-jobs.model';

describe('Component Tests', () => {

    describe('EmEmpPreviousJobs Management Component', () => {
        let comp: EmEmpPreviousJobsComponent;
        let fixture: ComponentFixture<EmEmpPreviousJobsComponent>;
        let service: EmEmpPreviousJobsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpPreviousJobsComponent],
                providers: [
                    EmEmpPreviousJobsService
                ]
            })
            .overrideTemplate(EmEmpPreviousJobsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpPreviousJobsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpPreviousJobsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmEmpPreviousJobs(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emEmpPreviousJobs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
