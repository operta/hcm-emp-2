/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmBorrowingTypesComponent } from '../../../../../../main/webapp/app/entities/em-borrowing-types/em-borrowing-types.component';
import { EmBorrowingTypesService } from '../../../../../../main/webapp/app/entities/em-borrowing-types/em-borrowing-types.service';
import { EmBorrowingTypes } from '../../../../../../main/webapp/app/entities/em-borrowing-types/em-borrowing-types.model';

describe('Component Tests', () => {

    describe('EmBorrowingTypes Management Component', () => {
        let comp: EmBorrowingTypesComponent;
        let fixture: ComponentFixture<EmBorrowingTypesComponent>;
        let service: EmBorrowingTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmBorrowingTypesComponent],
                providers: [
                    EmBorrowingTypesService
                ]
            })
            .overrideTemplate(EmBorrowingTypesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmBorrowingTypesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmBorrowingTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmBorrowingTypes(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emBorrowingTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
