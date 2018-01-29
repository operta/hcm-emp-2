/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { OgOrgTypesComponent } from '../../../../../../main/webapp/app/entities/og-org-types/og-org-types.component';
import { OgOrgTypesService } from '../../../../../../main/webapp/app/entities/og-org-types/og-org-types.service';
import { OgOrgTypes } from '../../../../../../main/webapp/app/entities/og-org-types/og-org-types.model';

describe('Component Tests', () => {

    describe('OgOrgTypes Management Component', () => {
        let comp: OgOrgTypesComponent;
        let fixture: ComponentFixture<OgOrgTypesComponent>;
        let service: OgOrgTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [OgOrgTypesComponent],
                providers: [
                    OgOrgTypesService
                ]
            })
            .overrideTemplate(OgOrgTypesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OgOrgTypesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OgOrgTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new OgOrgTypes(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ogOrgTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
