/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpTypesDetailComponent } from '../../../../../../main/webapp/app/entities/em-emp-types/em-emp-types-detail.component';
import { EmEmpTypesService } from '../../../../../../main/webapp/app/entities/em-emp-types/em-emp-types.service';
import { EmEmpTypes } from '../../../../../../main/webapp/app/entities/em-emp-types/em-emp-types.model';

describe('Component Tests', () => {

    describe('EmEmpTypes Management Detail Component', () => {
        let comp: EmEmpTypesDetailComponent;
        let fixture: ComponentFixture<EmEmpTypesDetailComponent>;
        let service: EmEmpTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpTypesDetailComponent],
                providers: [
                    EmEmpTypesService
                ]
            })
            .overrideTemplate(EmEmpTypesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpTypesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmEmpTypes(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emEmpTypes).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
