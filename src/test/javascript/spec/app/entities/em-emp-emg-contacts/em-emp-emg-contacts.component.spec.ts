/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpEmgContactsComponent } from '../../../../../../main/webapp/app/entities/em-emp-emg-contacts/em-emp-emg-contacts.component';
import { EmEmpEmgContactsService } from '../../../../../../main/webapp/app/entities/em-emp-emg-contacts/em-emp-emg-contacts.service';
import { EmEmpEmgContacts } from '../../../../../../main/webapp/app/entities/em-emp-emg-contacts/em-emp-emg-contacts.model';

describe('Component Tests', () => {

    describe('EmEmpEmgContacts Management Component', () => {
        let comp: EmEmpEmgContactsComponent;
        let fixture: ComponentFixture<EmEmpEmgContactsComponent>;
        let service: EmEmpEmgContactsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpEmgContactsComponent],
                providers: [
                    EmEmpEmgContactsService
                ]
            })
            .overrideTemplate(EmEmpEmgContactsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpEmgContactsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpEmgContactsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmEmpEmgContacts(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emEmpEmgContacts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
