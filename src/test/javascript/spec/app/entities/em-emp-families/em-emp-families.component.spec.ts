/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpFamiliesComponent } from '../../../../../../main/webapp/app/entities/em-emp-families/em-emp-families.component';
import { EmEmpFamiliesService } from '../../../../../../main/webapp/app/entities/em-emp-families/em-emp-families.service';
import { EmEmpFamilies } from '../../../../../../main/webapp/app/entities/em-emp-families/em-emp-families.model';

describe('Component Tests', () => {

    describe('EmEmpFamilies Management Component', () => {
        let comp: EmEmpFamiliesComponent;
        let fixture: ComponentFixture<EmEmpFamiliesComponent>;
        let service: EmEmpFamiliesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpFamiliesComponent],
                providers: [
                    EmEmpFamiliesService
                ]
            })
            .overrideTemplate(EmEmpFamiliesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpFamiliesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpFamiliesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmEmpFamilies(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emEmpFamilies[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
