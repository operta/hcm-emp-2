/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { RgFamilyRolesDialogComponent } from '../../../../../../main/webapp/app/entities/rg-family-roles/rg-family-roles-dialog.component';
import { RgFamilyRolesService } from '../../../../../../main/webapp/app/entities/rg-family-roles/rg-family-roles.service';
import { RgFamilyRoles } from '../../../../../../main/webapp/app/entities/rg-family-roles/rg-family-roles.model';

describe('Component Tests', () => {

    describe('RgFamilyRoles Management Dialog Component', () => {
        let comp: RgFamilyRolesDialogComponent;
        let fixture: ComponentFixture<RgFamilyRolesDialogComponent>;
        let service: RgFamilyRolesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [RgFamilyRolesDialogComponent],
                providers: [
                    RgFamilyRolesService
                ]
            })
            .overrideTemplate(RgFamilyRolesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RgFamilyRolesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RgFamilyRolesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RgFamilyRoles(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.rgFamilyRoles = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'rgFamilyRolesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RgFamilyRoles();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.rgFamilyRoles = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'rgFamilyRolesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
