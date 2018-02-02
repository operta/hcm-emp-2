/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { AtAccomplishmentTypesDetailComponent } from '../../../../../../main/webapp/app/entities/at-accomplishment-types/at-accomplishment-types-detail.component';
import { AtAccomplishmentTypesService } from '../../../../../../main/webapp/app/entities/at-accomplishment-types/at-accomplishment-types.service';
import { AtAccomplishmentTypes } from '../../../../../../main/webapp/app/entities/at-accomplishment-types/at-accomplishment-types.model';

describe('Component Tests', () => {

    describe('AtAccomplishmentTypes Management Detail Component', () => {
        let comp: AtAccomplishmentTypesDetailComponent;
        let fixture: ComponentFixture<AtAccomplishmentTypesDetailComponent>;
        let service: AtAccomplishmentTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [AtAccomplishmentTypesDetailComponent],
                providers: [
                    AtAccomplishmentTypesService
                ]
            })
            .overrideTemplate(AtAccomplishmentTypesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AtAccomplishmentTypesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AtAccomplishmentTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new AtAccomplishmentTypes(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.atAccomplishmentTypes).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
