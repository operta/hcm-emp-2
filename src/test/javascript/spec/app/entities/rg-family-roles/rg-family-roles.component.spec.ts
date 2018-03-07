/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { RgFamilyRolesComponent } from '../../../../../../main/webapp/app/entities/rg-family-roles/rg-family-roles.component';
import { RgFamilyRolesService } from '../../../../../../main/webapp/app/entities/rg-family-roles/rg-family-roles.service';
import { RgFamilyRoles } from '../../../../../../main/webapp/app/entities/rg-family-roles/rg-family-roles.model';

describe('Component Tests', () => {

    describe('RgFamilyRoles Management Component', () => {
        let comp: RgFamilyRolesComponent;
        let fixture: ComponentFixture<RgFamilyRolesComponent>;
        let service: RgFamilyRolesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgFamilyRolesComponent],
                providers: [
                    RgFamilyRolesService
                ]
            })
            .overrideTemplate(RgFamilyRolesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgFamilyRolesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgFamilyRolesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new RgFamilyRoles(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rgFamilyRoles[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
