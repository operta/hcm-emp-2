/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { ApConstantsDetailComponent } from '../../../../../../main/webapp/app/entities/ap-constants/ap-constants-detail.component';
import { ApConstantsService } from '../../../../../../main/webapp/app/entities/ap-constants/ap-constants.service';
import { ApConstants } from '../../../../../../main/webapp/app/entities/ap-constants/ap-constants.model';

describe('Component Tests', () => {

    describe('ApConstants Management Detail Component', () => {
        let comp: ApConstantsDetailComponent;
        let fixture: ComponentFixture<ApConstantsDetailComponent>;
        let service: ApConstantsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [ApConstantsDetailComponent],
                providers: [
                    ApConstantsService
                ]
            })
            .overrideTemplate(ApConstantsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ApConstantsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApConstantsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ApConstants(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.apConstants).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
