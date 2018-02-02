/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmContractTypesComponent } from '../../../../../../main/webapp/app/entities/em-contract-types/em-contract-types.component';
import { EmContractTypesService } from '../../../../../../main/webapp/app/entities/em-contract-types/em-contract-types.service';
import { EmContractTypes } from '../../../../../../main/webapp/app/entities/em-contract-types/em-contract-types.model';

describe('Component Tests', () => {

    describe('EmContractTypes Management Component', () => {
        let comp: EmContractTypesComponent;
        let fixture: ComponentFixture<EmContractTypesComponent>;
        let service: EmContractTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmContractTypesComponent],
                providers: [
                    EmContractTypesService
                ]
            })
            .overrideTemplate(EmContractTypesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmContractTypesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmContractTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmContractTypes(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emContractTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
