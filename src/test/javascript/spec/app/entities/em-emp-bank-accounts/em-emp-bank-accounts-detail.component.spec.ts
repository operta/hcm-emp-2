/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpBankAccountsDetailComponent } from '../../../../../../main/webapp/app/entities/em-emp-bank-accounts/em-emp-bank-accounts-detail.component';
import { EmEmpBankAccountsService } from '../../../../../../main/webapp/app/entities/em-emp-bank-accounts/em-emp-bank-accounts.service';
import { EmEmpBankAccounts } from '../../../../../../main/webapp/app/entities/em-emp-bank-accounts/em-emp-bank-accounts.model';

describe('Component Tests', () => {

    describe('EmEmpBankAccounts Management Detail Component', () => {
        let comp: EmEmpBankAccountsDetailComponent;
        let fixture: ComponentFixture<EmEmpBankAccountsDetailComponent>;
        let service: EmEmpBankAccountsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpBankAccountsDetailComponent],
                providers: [
                    EmEmpBankAccountsService
                ]
            })
            .overrideTemplate(EmEmpBankAccountsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpBankAccountsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpBankAccountsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmEmpBankAccounts(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emEmpBankAccounts).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
