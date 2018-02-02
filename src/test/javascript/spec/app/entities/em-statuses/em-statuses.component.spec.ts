/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmStatusesComponent } from '../../../../../../main/webapp/app/entities/em-statuses/em-statuses.component';
import { EmStatusesService } from '../../../../../../main/webapp/app/entities/em-statuses/em-statuses.service';
import { EmStatuses } from '../../../../../../main/webapp/app/entities/em-statuses/em-statuses.model';

describe('Component Tests', () => {

    describe('EmStatuses Management Component', () => {
        let comp: EmStatusesComponent;
        let fixture: ComponentFixture<EmStatusesComponent>;
        let service: EmStatusesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmStatusesComponent],
                providers: [
                    EmStatusesService
                ]
            })
            .overrideTemplate(EmStatusesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmStatusesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmStatusesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmStatuses(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emStatuses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
