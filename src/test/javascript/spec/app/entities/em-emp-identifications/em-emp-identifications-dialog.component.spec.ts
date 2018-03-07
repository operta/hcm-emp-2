/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { EmEmpIdentificationsDialogComponent } from '../../../../../../main/webapp/app/entities/em-emp-identifications/em-emp-identifications-dialog.component';
import { EmEmpIdentificationsService } from '../../../../../../main/webapp/app/entities/em-emp-identifications/em-emp-identifications.service';
import { EmEmpIdentifications } from '../../../../../../main/webapp/app/entities/em-emp-identifications/em-emp-identifications.model';
import { EmEmployeesService } from '../../../../../../main/webapp/app/entities/em-employees';
import { RgIdentificationTypesService } from '../../../../../../main/webapp/app/entities/rg-identification-types';
import { RgRegionsService } from '../../../../../../main/webapp/app/entities/rg-regions';

describe('Component Tests', () => {

    describe('EmEmpIdentifications Management Dialog Component', () => {
        let comp: EmEmpIdentificationsDialogComponent;
        let fixture: ComponentFixture<EmEmpIdentificationsDialogComponent>;
        let service: EmEmpIdentificationsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [EmEmpIdentificationsDialogComponent],
                providers: [
                    EmEmployeesService,
                    RgIdentificationTypesService,
                    RgRegionsService,
                    EmEmpIdentificationsService
                ]
            })
            .overrideTemplate(EmEmpIdentificationsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmEmpIdentificationsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmEmpIdentificationsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpIdentifications(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.emEmpIdentifications = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpIdentificationsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EmEmpIdentifications();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.emEmpIdentifications = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'emEmpIdentificationsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
