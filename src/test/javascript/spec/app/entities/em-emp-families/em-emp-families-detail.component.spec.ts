/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpFamiliesDetailComponent } from '../../../../../../main/webapp/app/entities/em-emp-families/em-emp-families-detail.component';
import { EmEmpFamiliesService } from '../../../../../../main/webapp/app/entities/em-emp-families/em-emp-families.service';
import { EmEmpFamilies } from '../../../../../../main/webapp/app/entities/em-emp-families/em-emp-families.model';

describe('Component Tests', () => {

    describe('EmEmpFamilies Management Detail Component', () => {
        let comp: EmEmpFamiliesDetailComponent;
        let fixture: ComponentFixture<EmEmpFamiliesDetailComponent>;
        let service: EmEmpFamiliesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpFamiliesDetailComponent],
                providers: [
                    EmEmpFamiliesService
                ]
            })
            .overrideTemplate(EmEmpFamiliesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpFamiliesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpFamiliesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmEmpFamilies(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emEmpFamilies).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
