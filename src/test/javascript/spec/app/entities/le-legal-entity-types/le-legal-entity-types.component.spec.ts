/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { LeLegalEntityTypesComponent } from '../../../../../../main/webapp/app/entities/le-legal-entity-types/le-legal-entity-types.component';
import { LeLegalEntityTypesService } from '../../../../../../main/webapp/app/entities/le-legal-entity-types/le-legal-entity-types.service';
import { LeLegalEntityTypes } from '../../../../../../main/webapp/app/entities/le-legal-entity-types/le-legal-entity-types.model';

describe('Component Tests', () => {

    describe('LeLegalEntityTypes Management Component', () => {
        let comp: LeLegalEntityTypesComponent;
        let fixture: ComponentFixture<LeLegalEntityTypesComponent>;
        let service: LeLegalEntityTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [LeLegalEntityTypesComponent],
                providers: [
                    LeLegalEntityTypesService
                ]
            })
            .overrideTemplate(LeLegalEntityTypesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LeLegalEntityTypesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeLegalEntityTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new LeLegalEntityTypes(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.leLegalEntityTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
