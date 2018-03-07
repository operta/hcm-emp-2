/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmInjuryTypesDetailComponent } from '../../../../../../main/webapp/app/entities/em-injury-types/em-injury-types-detail.component';
import { EmInjuryTypesService } from '../../../../../../main/webapp/app/entities/em-injury-types/em-injury-types.service';
import { EmInjuryTypes } from '../../../../../../main/webapp/app/entities/em-injury-types/em-injury-types.model';

describe('Component Tests', () => {

    describe('EmInjuryTypes Management Detail Component', () => {
        let comp: EmInjuryTypesDetailComponent;
        let fixture: ComponentFixture<EmInjuryTypesDetailComponent>;
        let service: EmInjuryTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmInjuryTypesDetailComponent],
                providers: [
                    EmInjuryTypesService
                ]
            })
            .overrideTemplate(EmInjuryTypesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmInjuryTypesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmInjuryTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmInjuryTypes(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emInjuryTypes).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
