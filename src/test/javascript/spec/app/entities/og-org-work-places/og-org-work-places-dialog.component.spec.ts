/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { OgOrgWorkPlacesDialogComponent } from '../../../../../../main/webapp/app/entities/og-org-work-places/og-org-work-places-dialog.component';
import { OgOrgWorkPlacesService } from '../../../../../../main/webapp/app/entities/og-org-work-places/og-org-work-places.service';
import { OgOrgWorkPlaces } from '../../../../../../main/webapp/app/entities/og-org-work-places/og-org-work-places.model';
import { OgOrganizationsService } from '../../../../../../main/webapp/app/entities/og-organizations';
import { OgWorkPlacesService } from '../../../../../../main/webapp/app/entities/og-work-places';

describe('Component Tests', () => {

    describe('OgOrgWorkPlaces Management Dialog Component', () => {
        let comp: OgOrgWorkPlacesDialogComponent;
        let fixture: ComponentFixture<OgOrgWorkPlacesDialogComponent>;
        let service: OgOrgWorkPlacesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [OgOrgWorkPlacesDialogComponent],
                providers: [
                    OgOrganizationsService,
                    OgWorkPlacesService,
                    OgOrgWorkPlacesService
                ]
            })
            .overrideTemplate(OgOrgWorkPlacesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OgOrgWorkPlacesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OgOrgWorkPlacesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OgOrgWorkPlaces(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.ogOrgWorkPlaces = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ogOrgWorkPlacesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OgOrgWorkPlaces();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.ogOrgWorkPlaces = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ogOrgWorkPlacesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
