/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { DmDocumentLinksComponent } from '../../../../../../main/webapp/app/entities/dm-document-links/dm-document-links.component';
import { DmDocumentLinksService } from '../../../../../../main/webapp/app/entities/dm-document-links/dm-document-links.service';
import { DmDocumentLinks } from '../../../../../../main/webapp/app/entities/dm-document-links/dm-document-links.model';

describe('Component Tests', () => {

    describe('DmDocumentLinks Management Component', () => {
        let comp: DmDocumentLinksComponent;
        let fixture: ComponentFixture<DmDocumentLinksComponent>;
        let service: DmDocumentLinksService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [DmDocumentLinksComponent],
                providers: [
                    DmDocumentLinksService
                ]
            })
            .overrideTemplate(DmDocumentLinksComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DmDocumentLinksComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DmDocumentLinksService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new DmDocumentLinks(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.dmDocumentLinks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
