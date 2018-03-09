/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpEmgContactsDetailComponent } from '../../../../../../main/webapp/app/entities/em-emp-emg-contacts/em-emp-emg-contacts-detail.component';
import { EmEmpEmgContactsService } from '../../../../../../main/webapp/app/entities/em-emp-emg-contacts/em-emp-emg-contacts.service';
import { EmEmpEmgContacts } from '../../../../../../main/webapp/app/entities/em-emp-emg-contacts/em-emp-emg-contacts.model';

describe('Component Tests', () => {

    describe('EmEmpEmgContacts Management Detail Component', () => {
        let comp: EmEmpEmgContactsDetailComponent;
        let fixture: ComponentFixture<EmEmpEmgContactsDetailComponent>;
        let service: EmEmpEmgContactsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpEmgContactsDetailComponent],
                providers: [
                    EmEmpEmgContactsService
                ]
            })
            .overrideTemplate(EmEmpEmgContactsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpEmgContactsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpEmgContactsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmEmpEmgContacts(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emEmpEmgContacts).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
