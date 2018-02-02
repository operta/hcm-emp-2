/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HcmEmpTestModule } from '../../../test.module';
import { DmDocumentTypesComponent } from '../../../../../../main/webapp/app/entities/dm-document-types/dm-document-types.component';
import { DmDocumentTypesService } from '../../../../../../main/webapp/app/entities/dm-document-types/dm-document-types.service';
import { DmDocumentTypes } from '../../../../../../main/webapp/app/entities/dm-document-types/dm-document-types.model';

describe('Component Tests', () => {

    describe('DmDocumentTypes Management Component', () => {
        let comp: DmDocumentTypesComponent;
        let fixture: ComponentFixture<DmDocumentTypesComponent>;
        let service: DmDocumentTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [DmDocumentTypesComponent],
                providers: [
                    DmDocumentTypesService
                ]
            })
            .overrideTemplate(DmDocumentTypesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DmDocumentTypesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DmDocumentTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new DmDocumentTypes(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.dmDocumentTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
