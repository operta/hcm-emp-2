/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpRewardsDetailComponent } from '../../../../../../main/webapp/app/entities/em-emp-rewards/em-emp-rewards-detail.component';
import { EmEmpRewardsService } from '../../../../../../main/webapp/app/entities/em-emp-rewards/em-emp-rewards.service';
import { EmEmpRewards } from '../../../../../../main/webapp/app/entities/em-emp-rewards/em-emp-rewards.model';

describe('Component Tests', () => {

    describe('EmEmpRewards Management Detail Component', () => {
        let comp: EmEmpRewardsDetailComponent;
        let fixture: ComponentFixture<EmEmpRewardsDetailComponent>;
        let service: EmEmpRewardsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpRewardsDetailComponent],
                providers: [
                    EmEmpRewardsService
                ]
            })
            .overrideTemplate(EmEmpRewardsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpRewardsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpRewardsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmEmpRewards(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emEmpRewards).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
