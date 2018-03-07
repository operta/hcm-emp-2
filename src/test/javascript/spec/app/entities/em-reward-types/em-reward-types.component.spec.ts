/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmRewardTypesComponent } from '../../../../../../main/webapp/app/entities/em-reward-types/em-reward-types.component';
import { EmRewardTypesService } from '../../../../../../main/webapp/app/entities/em-reward-types/em-reward-types.service';
import { EmRewardTypes } from '../../../../../../main/webapp/app/entities/em-reward-types/em-reward-types.model';

describe('Component Tests', () => {

    describe('EmRewardTypes Management Component', () => {
        let comp: EmRewardTypesComponent;
        let fixture: ComponentFixture<EmRewardTypesComponent>;
        let service: EmRewardTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmRewardTypesComponent],
                providers: [
                    EmRewardTypesService
                ]
            })
            .overrideTemplate(EmRewardTypesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmRewardTypesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmRewardTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmRewardTypes(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emRewardTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
