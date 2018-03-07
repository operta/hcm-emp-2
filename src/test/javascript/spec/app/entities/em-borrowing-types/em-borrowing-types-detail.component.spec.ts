/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmBorrowingTypesDetailComponent } from '../../../../../../main/webapp/app/entities/em-borrowing-types/em-borrowing-types-detail.component';
import { EmBorrowingTypesService } from '../../../../../../main/webapp/app/entities/em-borrowing-types/em-borrowing-types.service';
import { EmBorrowingTypes } from '../../../../../../main/webapp/app/entities/em-borrowing-types/em-borrowing-types.model';

describe('Component Tests', () => {

    describe('EmBorrowingTypes Management Detail Component', () => {
        let comp: EmBorrowingTypesDetailComponent;
        let fixture: ComponentFixture<EmBorrowingTypesDetailComponent>;
        let service: EmBorrowingTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmBorrowingTypesDetailComponent],
                providers: [
                    EmBorrowingTypesService
                ]
            })
            .overrideTemplate(EmBorrowingTypesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmBorrowingTypesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmBorrowingTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmBorrowingTypes(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emBorrowingTypes).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
