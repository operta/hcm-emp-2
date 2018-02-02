/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmContractTypesDetailComponent } from '../../../../../../main/webapp/app/entities/em-contract-types/em-contract-types-detail.component';
import { EmContractTypesService } from '../../../../../../main/webapp/app/entities/em-contract-types/em-contract-types.service';
import { EmContractTypes } from '../../../../../../main/webapp/app/entities/em-contract-types/em-contract-types.model';

describe('Component Tests', () => {

    describe('EmContractTypes Management Detail Component', () => {
        let comp: EmContractTypesDetailComponent;
        let fixture: ComponentFixture<EmContractTypesDetailComponent>;
        let service: EmContractTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmContractTypesDetailComponent],
                providers: [
                    EmContractTypesService
                ]
            })
            .overrideTemplate(EmContractTypesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmContractTypesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmContractTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmContractTypes(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emContractTypes).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
