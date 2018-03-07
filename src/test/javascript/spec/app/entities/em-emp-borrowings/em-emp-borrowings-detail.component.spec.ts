/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpBorrowingsDetailComponent } from '../../../../../../main/webapp/app/entities/em-emp-borrowings/em-emp-borrowings-detail.component';
import { EmEmpBorrowingsService } from '../../../../../../main/webapp/app/entities/em-emp-borrowings/em-emp-borrowings.service';
import { EmEmpBorrowings } from '../../../../../../main/webapp/app/entities/em-emp-borrowings/em-emp-borrowings.model';

describe('Component Tests', () => {

    describe('EmEmpBorrowings Management Detail Component', () => {
        let comp: EmEmpBorrowingsDetailComponent;
        let fixture: ComponentFixture<EmEmpBorrowingsDetailComponent>;
        let service: EmEmpBorrowingsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpBorrowingsDetailComponent],
                providers: [
                    EmEmpBorrowingsService
                ]
            })
            .overrideTemplate(EmEmpBorrowingsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpBorrowingsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpBorrowingsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmEmpBorrowings(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emEmpBorrowings).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
