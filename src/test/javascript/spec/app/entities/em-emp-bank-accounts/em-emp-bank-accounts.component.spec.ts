/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpBankAccountsComponent } from '../../../../../../main/webapp/app/entities/em-emp-bank-accounts/em-emp-bank-accounts.component';
import { EmEmpBankAccountsService } from '../../../../../../main/webapp/app/entities/em-emp-bank-accounts/em-emp-bank-accounts.service';
import { EmEmpBankAccounts } from '../../../../../../main/webapp/app/entities/em-emp-bank-accounts/em-emp-bank-accounts.model';

describe('Component Tests', () => {

    describe('EmEmpBankAccounts Management Component', () => {
        let comp: EmEmpBankAccountsComponent;
        let fixture: ComponentFixture<EmEmpBankAccountsComponent>;
        let service: EmEmpBankAccountsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpBankAccountsComponent],
                providers: [
                    EmEmpBankAccountsService
                ]
            })
            .overrideTemplate(EmEmpBankAccountsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpBankAccountsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpBankAccountsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmEmpBankAccounts(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emEmpBankAccounts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
