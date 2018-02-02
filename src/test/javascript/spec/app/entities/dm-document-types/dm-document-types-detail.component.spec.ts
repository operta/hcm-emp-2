/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HcmEmpTestModule } from '../../../test.module';
import { DmDocumentTypesDetailComponent } from '../../../../../../main/webapp/app/entities/dm-document-types/dm-document-types-detail.component';
import { DmDocumentTypesService } from '../../../../../../main/webapp/app/entities/dm-document-types/dm-document-types.service';
import { DmDocumentTypes } from '../../../../../../main/webapp/app/entities/dm-document-types/dm-document-types.model';

describe('Component Tests', () => {

    describe('DmDocumentTypes Management Detail Component', () => {
        let comp: DmDocumentTypesDetailComponent;
        let fixture: ComponentFixture<DmDocumentTypesDetailComponent>;
        let service: DmDocumentTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [DmDocumentTypesDetailComponent],
                providers: [
                    DmDocumentTypesService
                ]
            })
            .overrideTemplate(DmDocumentTypesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DmDocumentTypesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DmDocumentTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new DmDocumentTypes(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.dmDocumentTypes).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
