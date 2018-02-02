/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { DmDocumentLinksDetailComponent } from '../../../../../../main/webapp/app/entities/dm-document-links/dm-document-links-detail.component';
import { DmDocumentLinksService } from '../../../../../../main/webapp/app/entities/dm-document-links/dm-document-links.service';
import { DmDocumentLinks } from '../../../../../../main/webapp/app/entities/dm-document-links/dm-document-links.model';

describe('Component Tests', () => {

    describe('DmDocumentLinks Management Detail Component', () => {
        let comp: DmDocumentLinksDetailComponent;
        let fixture: ComponentFixture<DmDocumentLinksDetailComponent>;
        let service: DmDocumentLinksService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [DmDocumentLinksDetailComponent],
                providers: [
                    DmDocumentLinksService
                ]
            })
            .overrideTemplate(DmDocumentLinksDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DmDocumentLinksDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DmDocumentLinksService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new DmDocumentLinks(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.dmDocumentLinks).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
