/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { LeLegalEntitiesDetailComponent } from '../../../../../../main/webapp/app/entities/le-legal-entities/le-legal-entities-detail.component';
import { LeLegalEntitiesService } from '../../../../../../main/webapp/app/entities/le-legal-entities/le-legal-entities.service';
import { LeLegalEntities } from '../../../../../../main/webapp/app/entities/le-legal-entities/le-legal-entities.model';

describe('Component Tests', () => {

    describe('LeLegalEntities Management Detail Component', () => {
        let comp: LeLegalEntitiesDetailComponent;
        let fixture: ComponentFixture<LeLegalEntitiesDetailComponent>;
        let service: LeLegalEntitiesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [LeLegalEntitiesDetailComponent],
                providers: [
                    LeLegalEntitiesService
                ]
            })
            .overrideTemplate(LeLegalEntitiesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LeLegalEntitiesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeLegalEntitiesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new LeLegalEntities(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.leLegalEntities).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
