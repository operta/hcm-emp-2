/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpDocumentsDetailComponent } from '../../../../../../main/webapp/app/entities/em-emp-documents/em-emp-documents-detail.component';
import { EmEmpDocumentsService } from '../../../../../../main/webapp/app/entities/em-emp-documents/em-emp-documents.service';
import { EmEmpDocuments } from '../../../../../../main/webapp/app/entities/em-emp-documents/em-emp-documents.model';

describe('Component Tests', () => {

    describe('EmEmpDocuments Management Detail Component', () => {
        let comp: EmEmpDocumentsDetailComponent;
        let fixture: ComponentFixture<EmEmpDocumentsDetailComponent>;
        let service: EmEmpDocumentsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpDocumentsDetailComponent],
                providers: [
                    EmEmpDocumentsService
                ]
            })
            .overrideTemplate(EmEmpDocumentsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpDocumentsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpDocumentsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EmEmpDocuments(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emEmpDocuments).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
