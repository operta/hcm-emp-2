/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpAccomplishmentsComponent } from '../../../../../../main/webapp/app/entities/em-emp-accomplishments/em-emp-accomplishments.component';
import { EmEmpAccomplishmentsService } from '../../../../../../main/webapp/app/entities/em-emp-accomplishments/em-emp-accomplishments.service';
import { EmEmpAccomplishments } from '../../../../../../main/webapp/app/entities/em-emp-accomplishments/em-emp-accomplishments.model';

describe('Component Tests', () => {

    describe('EmEmpAccomplishments Management Component', () => {
        let comp: EmEmpAccomplishmentsComponent;
        let fixture: ComponentFixture<EmEmpAccomplishmentsComponent>;
        let service: EmEmpAccomplishmentsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpAccomplishmentsComponent],
                providers: [
                    EmEmpAccomplishmentsService
                ]
            })
            .overrideTemplate(EmEmpAccomplishmentsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpAccomplishmentsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpAccomplishmentsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmEmpAccomplishments(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emEmpAccomplishments[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
