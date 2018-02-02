/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { RgSchoolsDetailComponent } from '../../../../../../main/webapp/app/entities/rg-schools/rg-schools-detail.component';
import { RgSchoolsService } from '../../../../../../main/webapp/app/entities/rg-schools/rg-schools.service';
import { RgSchools } from '../../../../../../main/webapp/app/entities/rg-schools/rg-schools.model';

describe('Component Tests', () => {

    describe('RgSchools Management Detail Component', () => {
        let comp: RgSchoolsDetailComponent;
        let fixture: ComponentFixture<RgSchoolsDetailComponent>;
        let service: RgSchoolsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgSchoolsDetailComponent],
                providers: [
                    RgSchoolsService
                ]
            })
            .overrideTemplate(RgSchoolsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgSchoolsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgSchoolsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new RgSchools(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.rgSchools).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
