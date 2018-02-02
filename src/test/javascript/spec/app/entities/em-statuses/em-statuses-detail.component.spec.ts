/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmStatusesDetailComponent } from '../../../../../../main/webapp/app/entities/em-statuses/em-statuses-detail.component';
import { EmStatusesService } from '../../../../../../main/webapp/app/entities/em-statuses/em-statuses.service';
import { EmStatuses } from '../../../../../../main/webapp/app/entities/em-statuses/em-statuses.model';

describe('Component Tests', () => {

    describe('EmStatuses Management Detail Component', () => {
        let comp: EmStatusesDetailComponent;
        let fixture: ComponentFixture<EmStatusesDetailComponent>;
        let service: EmStatusesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmStatusesDetailComponent],
                providers: [
                    EmStatusesService
                ]
            })
            .overrideTemplate(EmStatusesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmStatusesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmStatusesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmStatuses(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emStatuses).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
