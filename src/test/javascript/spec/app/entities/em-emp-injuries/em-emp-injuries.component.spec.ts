/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpInjuriesComponent } from '../../../../../../main/webapp/app/entities/em-emp-injuries/em-emp-injuries.component';
import { EmEmpInjuriesService } from '../../../../../../main/webapp/app/entities/em-emp-injuries/em-emp-injuries.service';
import { EmEmpInjuries } from '../../../../../../main/webapp/app/entities/em-emp-injuries/em-emp-injuries.model';

describe('Component Tests', () => {

    describe('EmEmpInjuries Management Component', () => {
        let comp: EmEmpInjuriesComponent;
        let fixture: ComponentFixture<EmEmpInjuriesComponent>;
        let service: EmEmpInjuriesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpInjuriesComponent],
                providers: [
                    EmEmpInjuriesService
                ]
            })
            .overrideTemplate(EmEmpInjuriesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpInjuriesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpInjuriesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmEmpInjuries(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emEmpInjuries[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
