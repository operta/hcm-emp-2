/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmRewardTypesDetailComponent } from '../../../../../../main/webapp/app/entities/em-reward-types/em-reward-types-detail.component';
import { EmRewardTypesService } from '../../../../../../main/webapp/app/entities/em-reward-types/em-reward-types.service';
import { EmRewardTypes } from '../../../../../../main/webapp/app/entities/em-reward-types/em-reward-types.model';

describe('Component Tests', () => {

    describe('EmRewardTypes Management Detail Component', () => {
        let comp: EmRewardTypesDetailComponent;
        let fixture: ComponentFixture<EmRewardTypesDetailComponent>;
        let service: EmRewardTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmRewardTypesDetailComponent],
                providers: [
                    EmRewardTypesService
                ]
            })
            .overrideTemplate(EmRewardTypesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmRewardTypesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmRewardTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmRewardTypes(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emRewardTypes).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
