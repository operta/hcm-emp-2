/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpRewardsComponent } from '../../../../../../main/webapp/app/entities/em-emp-rewards/em-emp-rewards.component';
import { EmEmpRewardsService } from '../../../../../../main/webapp/app/entities/em-emp-rewards/em-emp-rewards.service';
import { EmEmpRewards } from '../../../../../../main/webapp/app/entities/em-emp-rewards/em-emp-rewards.model';

describe('Component Tests', () => {

    describe('EmEmpRewards Management Component', () => {
        let comp: EmEmpRewardsComponent;
        let fixture: ComponentFixture<EmEmpRewardsComponent>;
        let service: EmEmpRewardsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpRewardsComponent],
                providers: [
                    EmEmpRewardsService
                ]
            })
            .overrideTemplate(EmEmpRewardsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpRewardsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpRewardsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmEmpRewards(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emEmpRewards[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
