/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpOrgWorkPlacesDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-org-work-places/em-emp-org-work-places-dialog.component';
import { EmEmpOrgWorkPlacesService } from '../../../../../../main/webapp/app/entities/em-emp-org-work-places/em-emp-org-work-places.service';
import { EmEmpOrgWorkPlaces } from '../../../../../../main/webapp/app/entities/em-emp-org-work-places/em-emp-org-work-places.model';
import { EmEmployeesService } from '../../../../../../main/webapp/app/entities/em-employees';
import { EmContractTypesService } from '../../../../../../main/webapp/app/entities/em-contract-types';
import { OgOrgWorkPlacesService } from '../../../../../../main/webapp/app/entities/og-org-work-places';

describe('Component Tests', () => {

    describe('EmEmpOrgWorkPlaces Management Dialog Component', () => {
        let comp: EmEmpOrgWorkPlacesDialogComponent;
        let fixture: ComponentFixture<EmEmpOrgWorkPlacesDialogComponent>;
        let service: EmEmpOrgWorkPlacesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpOrgWorkPlacesDialogComponent],
                providers: [
                    EmEmployeesService,
                    EmContractTypesService,
                    OgOrgWorkPlacesService,
                    EmEmpOrgWorkPlacesService
                ]
            })
            .overrideTemplate(EmEmpOrgWorkPlacesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpOrgWorkPlacesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpOrgWorkPlacesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpOrgWorkPlaces(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.emEmpOrgWorkPlaces = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpOrgWorkPlacesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpOrgWorkPlaces();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.emEmpOrgWorkPlaces = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpOrgWorkPlacesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
