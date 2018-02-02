/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpNotesDetailComponent } from '../../../../../../main/webapp/app/entities/em-emp-notes/em-emp-notes-detail.component';
import { EmEmpNotesService } from '../../../../../../main/webapp/app/entities/em-emp-notes/em-emp-notes.service';
import { EmEmpNotes } from '../../../../../../main/webapp/app/entities/em-emp-notes/em-emp-notes.model';

describe('Component Tests', () => {

    describe('EmEmpNotes Management Detail Component', () => {
        let comp: EmEmpNotesDetailComponent;
        let fixture: ComponentFixture<EmEmpNotesDetailComponent>;
        let service: EmEmpNotesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpNotesDetailComponent],
                providers: [
                    EmEmpNotesService
                ]
            })
            .overrideTemplate(EmEmpNotesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpNotesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpNotesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmEmpNotes(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emEmpNotes).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
