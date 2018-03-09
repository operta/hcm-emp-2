/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { ApConstantsComponent } from '../../../../../../main/webapp/app/entities/ap-constants/ap-constants.component';
import { ApConstantsService } from '../../../../../../main/webapp/app/entities/ap-constants/ap-constants.service';
import { ApConstants } from '../../../../../../main/webapp/app/entities/ap-constants/ap-constants.model';

describe('Component Tests', () => {

    describe('ApConstants Management Component', () => {
        let comp: ApConstantsComponent;
        let fixture: ComponentFixture<ApConstantsComponent>;
        let service: ApConstantsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [ApConstantsComponent],
                providers: [
                    ApConstantsService
                ]
            })
            .overrideTemplate(ApConstantsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ApConstantsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApConstantsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ApConstants(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.apConstants[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
