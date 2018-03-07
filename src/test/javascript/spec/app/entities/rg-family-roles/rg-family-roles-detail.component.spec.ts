/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { RgFamilyRolesDetailComponent } from '../../../../../../main/webapp/app/entities/rg-family-roles/rg-family-roles-detail.component';
import { RgFamilyRolesService } from '../../../../../../main/webapp/app/entities/rg-family-roles/rg-family-roles.service';
import { RgFamilyRoles } from '../../../../../../main/webapp/app/entities/rg-family-roles/rg-family-roles.model';

describe('Component Tests', () => {

    describe('RgFamilyRoles Management Detail Component', () => {
        let comp: RgFamilyRolesDetailComponent;
        let fixture: ComponentFixture<RgFamilyRolesDetailComponent>;
        let service: RgFamilyRolesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgFamilyRolesDetailComponent],
                providers: [
                    RgFamilyRolesService
                ]
            })
            .overrideTemplate(RgFamilyRolesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgFamilyRolesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgFamilyRolesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new RgFamilyRoles(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.rgFamilyRoles).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
