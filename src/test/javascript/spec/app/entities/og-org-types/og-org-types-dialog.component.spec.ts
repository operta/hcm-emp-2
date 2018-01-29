/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { OgOrgTypesDialogComponent } from '../../../../../../main/webapp/app/entities/og-org-types/og-org-types-dialog.component';
import { OgOrgTypesService } from '../../../../../../main/webapp/app/entities/og-org-types/og-org-types.service';
import { OgOrgTypes } from '../../../../../../main/webapp/app/entities/og-org-types/og-org-types.model';

describe('Component Tests', () => {

    describe('OgOrgTypes Management Dialog Component', () => {
        let comp: OgOrgTypesDialogComponent;
        let fixture: ComponentFixture<OgOrgTypesDialogComponent>;
        let service: OgOrgTypesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [OgOrgTypesDialogComponent],
                providers: [
                    OgOrgTypesService
                ]
            })
            .overrideTemplate(OgOrgTypesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OgOrgTypesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OgOrgTypesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OgOrgTypes(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.ogOrgTypes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ogOrgTypesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OgOrgTypes();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.ogOrgTypes = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ogOrgTypesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
