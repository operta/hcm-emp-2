/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpIdentificationsDetailComponent } from '../../../../../../main/webapp/app/entities/em-emp-identifications/em-emp-identifications-detail.component';
import { EmEmpIdentificationsService } from '../../../../../../main/webapp/app/entities/em-emp-identifications/em-emp-identifications.service';
import { EmEmpIdentifications } from '../../../../../../main/webapp/app/entities/em-emp-identifications/em-emp-identifications.model';

describe('Component Tests', () => {

    describe('EmEmpIdentifications Management Detail Component', () => {
        let comp: EmEmpIdentificationsDetailComponent;
        let fixture: ComponentFixture<EmEmpIdentificationsDetailComponent>;
        let service: EmEmpIdentificationsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpIdentificationsDetailComponent],
                providers: [
                    EmEmpIdentificationsService
                ]
            })
            .overrideTemplate(EmEmpIdentificationsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpIdentificationsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpIdentificationsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmEmpIdentifications(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emEmpIdentifications).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
