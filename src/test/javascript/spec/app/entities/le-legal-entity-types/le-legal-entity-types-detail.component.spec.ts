/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { LeLegalEntityTypesDetailComponent } from '../../../../../../main/webapp/app/entities/le-legal-entity-types/le-legal-entity-types-detail.component';
import { LeLegalEntityTypesService } from '../../../../../../main/webapp/app/entities/le-legal-entity-types/le-legal-entity-types.service';
import { LeLegalEntityTypes } from '../../../../../../main/webapp/app/entities/le-legal-entity-types/le-legal-entity-types.model';

describe('Component Tests', () => {

    describe('LeLegalEntityTypes Management Detail Component', () => {
        let comp: LeLegalEntityTypesDetailComponent;
        let fixture: ComponentFixture<LeLegalEntityTypesDetailComponent>;
        let service: LeLegalEntityTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [LeLegalEntityTypesDetailComponent],
                providers: [
                    LeLegalEntityTypesService
                ]
            })
            .overrideTemplate(LeLegalEntityTypesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LeLegalEntityTypesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeLegalEntityTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new LeLegalEntityTypes(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.leLegalEntityTypes).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
