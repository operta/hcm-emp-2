/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { LeLegalEntitiesComponent } from '../../../../../../main/webapp/app/entities/le-legal-entities/le-legal-entities.component';
import { LeLegalEntitiesService } from '../../../../../../main/webapp/app/entities/le-legal-entities/le-legal-entities.service';
import { LeLegalEntities } from '../../../../../../main/webapp/app/entities/le-legal-entities/le-legal-entities.model';

describe('Component Tests', () => {

    describe('LeLegalEntities Management Component', () => {
        let comp: LeLegalEntitiesComponent;
        let fixture: ComponentFixture<LeLegalEntitiesComponent>;
        let service: LeLegalEntitiesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [LeLegalEntitiesComponent],
                providers: [
                    LeLegalEntitiesService
                ]
            })
            .overrideTemplate(LeLegalEntitiesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LeLegalEntitiesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeLegalEntitiesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new LeLegalEntities(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.leLegalEntities[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
