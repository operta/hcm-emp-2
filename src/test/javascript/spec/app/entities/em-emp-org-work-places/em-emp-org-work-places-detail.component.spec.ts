/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpOrgWorkPlacesDetailComponent } from '../../../../../../main/webapp/app/entities/em-emp-org-work-places/em-emp-org-work-places-detail.component';
import { EmEmpOrgWorkPlacesService } from '../../../../../../main/webapp/app/entities/em-emp-org-work-places/em-emp-org-work-places.service';
import { EmEmpOrgWorkPlaces } from '../../../../../../main/webapp/app/entities/em-emp-org-work-places/em-emp-org-work-places.model';

describe('Component Tests', () => {

    describe('EmEmpOrgWorkPlaces Management Detail Component', () => {
        let comp: EmEmpOrgWorkPlacesDetailComponent;
        let fixture: ComponentFixture<EmEmpOrgWorkPlacesDetailComponent>;
        let service: EmEmpOrgWorkPlacesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpOrgWorkPlacesDetailComponent],
                providers: [
                    EmEmpOrgWorkPlacesService
                ]
            })
            .overrideTemplate(EmEmpOrgWorkPlacesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpOrgWorkPlacesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpOrgWorkPlacesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmEmpOrgWorkPlaces(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emEmpOrgWorkPlaces).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
