/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpIdentificationsComponent } from '../../../../../../main/webapp/app/entities/em-emp-identifications/em-emp-identifications.component';
import { EmEmpIdentificationsService } from '../../../../../../main/webapp/app/entities/em-emp-identifications/em-emp-identifications.service';
import { EmEmpIdentifications } from '../../../../../../main/webapp/app/entities/em-emp-identifications/em-emp-identifications.model';

describe('Component Tests', () => {

    describe('EmEmpIdentifications Management Component', () => {
        let comp: EmEmpIdentificationsComponent;
        let fixture: ComponentFixture<EmEmpIdentificationsComponent>;
        let service: EmEmpIdentificationsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpIdentificationsComponent],
                providers: [
                    EmEmpIdentificationsService
                ]
            })
            .overrideTemplate(EmEmpIdentificationsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpIdentificationsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpIdentificationsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmEmpIdentifications(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emEmpIdentifications[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
