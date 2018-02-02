/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpDocumentsComponent } from '../../../../../../main/webapp/app/entities/em-emp-documents/em-emp-documents.component';
import { EmEmpDocumentsService } from '../../../../../../main/webapp/app/entities/em-emp-documents/em-emp-documents.service';
import { EmEmpDocuments } from '../../../../../../main/webapp/app/entities/em-emp-documents/em-emp-documents.model';

describe('Component Tests', () => {

    describe('EmEmpDocuments Management Component', () => {
        let comp: EmEmpDocumentsComponent;
        let fixture: ComponentFixture<EmEmpDocumentsComponent>;
        let service: EmEmpDocumentsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpDocumentsComponent],
                providers: [
                    EmEmpDocumentsService
                ]
            })
            .overrideTemplate(EmEmpDocumentsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpDocumentsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpDocumentsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EmEmpDocuments(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emEmpDocuments[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
