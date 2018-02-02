/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpNotesComponent } from '../../../../../../main/webapp/app/entities/em-emp-notes/em-emp-notes.component';
import { EmEmpNotesService } from '../../../../../../main/webapp/app/entities/em-emp-notes/em-emp-notes.service';
import { EmEmpNotes } from '../../../../../../main/webapp/app/entities/em-emp-notes/em-emp-notes.model';

describe('Component Tests', () => {

    describe('EmEmpNotes Management Component', () => {
        let comp: EmEmpNotesComponent;
        let fixture: ComponentFixture<EmEmpNotesComponent>;
        let service: EmEmpNotesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpNotesComponent],
                providers: [
                    EmEmpNotesService
                ]
            })
            .overrideTemplate(EmEmpNotesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpNotesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpNotesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmEmpNotes(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emEmpNotes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
