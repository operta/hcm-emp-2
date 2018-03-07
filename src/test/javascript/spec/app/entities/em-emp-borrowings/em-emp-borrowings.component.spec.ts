/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpBorrowingsComponent } from '../../../../../../main/webapp/app/entities/em-emp-borrowings/em-emp-borrowings.component';
import { EmEmpBorrowingsService } from '../../../../../../main/webapp/app/entities/em-emp-borrowings/em-emp-borrowings.service';
import { EmEmpBorrowings } from '../../../../../../main/webapp/app/entities/em-emp-borrowings/em-emp-borrowings.model';

describe('Component Tests', () => {

    describe('EmEmpBorrowings Management Component', () => {
        let comp: EmEmpBorrowingsComponent;
        let fixture: ComponentFixture<EmEmpBorrowingsComponent>;
        let service: EmEmpBorrowingsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpBorrowingsComponent],
                providers: [
                    EmEmpBorrowingsService
                ]
            })
            .overrideTemplate(EmEmpBorrowingsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpBorrowingsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpBorrowingsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmEmpBorrowings(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emEmpBorrowings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
