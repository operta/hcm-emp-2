/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpAccomplishmentsDetailComponent } from '../../../../../../main/webapp/app/entities/em-emp-accomplishments/em-emp-accomplishments-detail.component';
import { EmEmpAccomplishmentsService } from '../../../../../../main/webapp/app/entities/em-emp-accomplishments/em-emp-accomplishments.service';
import { EmEmpAccomplishments } from '../../../../../../main/webapp/app/entities/em-emp-accomplishments/em-emp-accomplishments.model';

describe('Component Tests', () => {

    describe('EmEmpAccomplishments Management Detail Component', () => {
        let comp: EmEmpAccomplishmentsDetailComponent;
        let fixture: ComponentFixture<EmEmpAccomplishmentsDetailComponent>;
        let service: EmEmpAccomplishmentsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpAccomplishmentsDetailComponent],
                providers: [
                    EmEmpAccomplishmentsService
                ]
            })
            .overrideTemplate(EmEmpAccomplishmentsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpAccomplishmentsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpAccomplishmentsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmEmpAccomplishments(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emEmpAccomplishments).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
