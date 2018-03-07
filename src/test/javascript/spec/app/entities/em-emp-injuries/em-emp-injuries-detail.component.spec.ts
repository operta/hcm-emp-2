/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpInjuriesDetailComponent } from '../../../../../../main/webapp/app/entities/em-emp-injuries/em-emp-injuries-detail.component';
import { EmEmpInjuriesService } from '../../../../../../main/webapp/app/entities/em-emp-injuries/em-emp-injuries.service';
import { EmEmpInjuries } from '../../../../../../main/webapp/app/entities/em-emp-injuries/em-emp-injuries.model';

describe('Component Tests', () => {

    describe('EmEmpInjuries Management Detail Component', () => {
        let comp: EmEmpInjuriesDetailComponent;
        let fixture: ComponentFixture<EmEmpInjuriesDetailComponent>;
        let service: EmEmpInjuriesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpInjuriesDetailComponent],
                providers: [
                    EmEmpInjuriesService
                ]
            })
            .overrideTemplate(EmEmpInjuriesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpInjuriesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpInjuriesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmEmpInjuries(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emEmpInjuries).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
