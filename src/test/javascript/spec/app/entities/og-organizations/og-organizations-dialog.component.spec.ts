/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { OgOrganizationsDialogComponent } from '../../../../../../main/webapp/app/entities/og-organizations/og-organizations-dialog.component';
import { OgOrganizationsService } from '../../../../../../main/webapp/app/entities/og-organizations/og-organizations.service';
import { OgOrganizations } from '../../../../../../main/webapp/app/entities/og-organizations/og-organizations.model';
import { OgOrgTypesService } from '../../../../../../main/webapp/app/entities/og-org-types';
import { LeLegalEntitiesService } from '../../../../../../main/webapp/app/entities/le-legal-entities';

describe('Component Tests', () => {

    describe('OgOrganizations Management Dialog Component', () => {
        let comp: OgOrganizationsDialogComponent;
        let fixture: ComponentFixture<OgOrganizationsDialogComponent>;
        let service: OgOrganizationsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [OgOrganizationsDialogComponent],
                providers: [
                    OgOrgTypesService,
                    LeLegalEntitiesService,
                    OgOrganizationsService
                ]
            })
            .overrideTemplate(OgOrganizationsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OgOrganizationsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OgOrganizationsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OgOrganizations(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.ogOrganizations = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ogOrganizationsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OgOrganizations();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.ogOrganizations = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ogOrganizationsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
