/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { RgQualificationsDetailComponent } from '../../../../../../main/webapp/app/entities/rg-qualifications/rg-qualifications-detail.component';
import { RgQualificationsService } from '../../../../../../main/webapp/app/entities/rg-qualifications/rg-qualifications.service';
import { RgQualifications } from '../../../../../../main/webapp/app/entities/rg-qualifications/rg-qualifications.model';

describe('Component Tests', () => {

    describe('RgQualifications Management Detail Component', () => {
        let comp: RgQualificationsDetailComponent;
        let fixture: ComponentFixture<RgQualificationsDetailComponent>;
        let service: RgQualificationsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgQualificationsDetailComponent],
                providers: [
                    RgQualificationsService
                ]
            })
            .overrideTemplate(RgQualificationsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgQualificationsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgQualificationsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new RgQualifications(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.rgQualifications).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
