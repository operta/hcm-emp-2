/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HcmEmpTestModule } from '../../../test.module';
import { LeLegalEntitiesDialogComponent } from '../../../../../../main/webapp/app/entities/le-legal-entities/le-legal-entities-dialog.component';
import { LeLegalEntitiesService } from '../../../../../../main/webapp/app/entities/le-legal-entities/le-legal-entities.service';
import { LeLegalEntities } from '../../../../../../main/webapp/app/entities/le-legal-entities/le-legal-entities.model';
import { LeLegalEntityTypesService } from '../../../../../../main/webapp/app/entities/le-legal-entity-types';
import { RgRegionsService } from '../../../../../../main/webapp/app/entities/rg-regions';

describe('Component Tests', () => {

    describe('LeLegalEntities Management Dialog Component', () => {
        let comp: LeLegalEntitiesDialogComponent;
        let fixture: ComponentFixture<LeLegalEntitiesDialogComponent>;
        let service: LeLegalEntitiesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HcmEmpTestModule],
                declarations: [LeLegalEntitiesDialogComponent],
                providers: [
                    LeLegalEntityTypesService,
                    RgRegionsService,
                    LeLegalEntitiesService
                ]
            })
            .overrideTemplate(LeLegalEntitiesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LeLegalEntitiesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeLegalEntitiesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LeLegalEntities(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.leLegalEntities = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'leLegalEntitiesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LeLegalEntities();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.leLegalEntities = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'leLegalEntitiesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
