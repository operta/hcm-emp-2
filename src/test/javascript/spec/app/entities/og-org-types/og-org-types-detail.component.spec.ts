/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { OgOrgTypesDetailComponent } from '../../../../../../main/webapp/app/entities/og-org-types/og-org-types-detail.component';
import { OgOrgTypesService } from '../../../../../../main/webapp/app/entities/og-org-types/og-org-types.service';
import { OgOrgTypes } from '../../../../../../main/webapp/app/entities/og-org-types/og-org-types.model';

describe('Component Tests', () => {

    describe('OgOrgTypes Management Detail Component', () => {
        let comp: OgOrgTypesDetailComponent;
        let fixture: ComponentFixture<OgOrgTypesDetailComponent>;
        let service: OgOrgTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [OgOrgTypesDetailComponent],
                providers: [
                    OgOrgTypesService
                ]
            })
            .overrideTemplate(OgOrgTypesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OgOrgTypesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OgOrgTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new OgOrgTypes(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ogOrgTypes).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
