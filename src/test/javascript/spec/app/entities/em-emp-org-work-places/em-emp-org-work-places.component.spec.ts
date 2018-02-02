/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpOrgWorkPlacesComponent } from '../../../../../../main/webapp/app/entities/em-emp-org-work-places/em-emp-org-work-places.component';
import { EmEmpOrgWorkPlacesService } from '../../../../../../main/webapp/app/entities/em-emp-org-work-places/em-emp-org-work-places.service';
import { EmEmpOrgWorkPlaces } from '../../../../../../main/webapp/app/entities/em-emp-org-work-places/em-emp-org-work-places.model';

describe('Component Tests', () => {

    describe('EmEmpOrgWorkPlaces Management Component', () => {
        let comp: EmEmpOrgWorkPlacesComponent;
        let fixture: ComponentFixture<EmEmpOrgWorkPlacesComponent>;
        let service: EmEmpOrgWorkPlacesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpOrgWorkPlacesComponent],
                providers: [
                    EmEmpOrgWorkPlacesService
                ]
            })
            .overrideTemplate(EmEmpOrgWorkPlacesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpOrgWorkPlacesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpOrgWorkPlacesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmEmpOrgWorkPlaces(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emEmpOrgWorkPlaces[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
