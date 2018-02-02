/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { AtAccomplishmentTypesComponent } from '../../../../../../main/webapp/app/entities/at-accomplishment-types/at-accomplishment-types.component';
import { AtAccomplishmentTypesService } from '../../../../../../main/webapp/app/entities/at-accomplishment-types/at-accomplishment-types.service';
import { AtAccomplishmentTypes } from '../../../../../../main/webapp/app/entities/at-accomplishment-types/at-accomplishment-types.model';

describe('Component Tests', () => {

    describe('AtAccomplishmentTypes Management Component', () => {
        let comp: AtAccomplishmentTypesComponent;
        let fixture: ComponentFixture<AtAccomplishmentTypesComponent>;
        let service: AtAccomplishmentTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [AtAccomplishmentTypesComponent],
                providers: [
                    AtAccomplishmentTypesService
                ]
            })
            .overrideTemplate(AtAccomplishmentTypesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AtAccomplishmentTypesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AtAccomplishmentTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new AtAccomplishmentTypes(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.atAccomplishmentTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
