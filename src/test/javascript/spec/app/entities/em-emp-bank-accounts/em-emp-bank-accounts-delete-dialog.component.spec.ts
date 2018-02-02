/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpBankAccountsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-bank-accounts/em-emp-bank-accounts-delete-dialog.component';
import { EmEmpBankAccountsService } from '../../../../../../main/webapp/app/entities/em-emp-bank-accounts/em-emp-bank-accounts.service';

describe('Component Tests', () => {

    describe('EmEmpBankAccounts Management Delete Component', () => {
        let comp: EmEmpBankAccountsDeleteDialogComponent;
        let fixture: ComponentFixture<EmEmpBankAccountsDeleteDialogComponent>;
        let service: EmEmpBankAccountsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpBankAccountsDeleteDialogComponent],
                providers: [
                    EmEmpBankAccountsService
                ]
            })
            .overrideTemplate(EmEmpBankAccountsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpBankAccountsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpBankAccountsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
